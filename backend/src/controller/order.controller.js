import Order from "../../db/models/order.model.js";
import User from "../../db/models/user.model.js";
import "dotenv/config";

// ── helpers ──────────────────────────────────────────────────────
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.startsWith('sk_test_your')) return null;
  const Stripe = ( import('stripe')).default;
  return new Stripe(key);
}

// ── Place order (COD default, Stripe optional) ───────────────────
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod = 'cod' } = req.body;
    const userId = req.userId;

    if (!items?.length) return res.json({ success: false, message: 'Cart is empty' });

    const newOrder = new Order({
      userId, items, amount, address,
      payment: paymentMethod === 'cod',
      status: 'Food Processing',
    });
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    // Try Stripe if requested
    if (paymentMethod === 'stripe') {
      try {
        const { default: Stripe } = await import('stripe');
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

        const line_items = items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        }));
        line_items.push({
          price_data: { currency: 'usd', product_data: { name: 'Delivery Charges' }, unit_amount: 200 },
          quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
          line_items,
          mode: 'payment',
          success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
          cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        });
        return res.json({ success: true, session_url: session.url, orderId: newOrder._id });
      } catch (stripeErr) {
        console.error('Stripe error:', stripeErr.message);
      }
    }

    // COD — redirect to verify directly
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.json({
      success: true,
      orderId: newOrder._id,
      session_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
    });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// ── Verify order ─────────────────────────────────────────────────
export const verifyOder = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Paid" });
    } else {
      await Order.findByIdAndDelete(orderId);
      return res.json({ success: false, message: 'Not Paid' });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ── All orders (admin) ───────────────────────────────────────────
export const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const total = await Order.countDocuments({});
    const orders = await Order.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
    return res.json({ success: true, orders, total, totalPages: Math.ceil(total / limit), currentPage: page });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ── User orders with pagination ──────────────────────────────────
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const total = await Order.countDocuments({ userId });
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    return res.json({
      success: true, orders,
      pagination: { page, totalPages: Math.ceil(total / limit), total },
      currentPage: page, totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ── Order history + stats ────────────────────────────────────────
export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const status = req.query.status || '';
    const skip = (page - 1) * limit;

    const filter = { userId };
    if (status && status !== 'All') filter.status = status;

    const [orders, total, allOrders] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(filter),
      Order.find({ userId }),
    ]);

    const totalSpent = allOrders.filter(o => o.payment).reduce((s, o) => s + o.amount, 0);
    const delivered = allOrders.filter(o => o.status.toLowerCase() === 'delivered').length;
    const pending = allOrders.filter(o => !['delivered', 'cancelled'].includes(o.status.toLowerCase())).length;

    const itemCount = {};
    allOrders.forEach(o => o.items.forEach(i => {
      itemCount[i.name] = (itemCount[i.name] || 0) + (i.quantity || 1);
    }));
    const favoriteItem = Object.entries(itemCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    return res.json({
      success: true, orders,
      pagination: { page, totalPages: Math.ceil(total / limit), total },
      stats: { totalOrders: allOrders.length, totalSpent: +totalSpent.toFixed(2), delivered, pending, favoriteItem },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ── Update order status (admin) ──────────────────────────────────
export const OrderupdateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) return res.json({ success: false, message: 'orderId and status required' });
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return res.json({ success: true, order });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
