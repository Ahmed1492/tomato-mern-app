# 🍴 Food Delivery Frontend (React + Vite)

A modern, responsive frontend for the food delivery application built with React, Vite, and Tailwind CSS. This application provides a seamless user experience for browsing food items, managing cart, placing orders, and tracking deliveries.

## 🚀 Features

### 🏠 **Home Page**
- **Hero Section** with animated elements and statistics
- **Food Categories** with interactive menu navigation
- **Top Dishes** display with pagination
- **Mobile App Promotion** with phone mockup and feature carousel
- **Testimonials** and customer reviews
- **Modern Footer** with gradient background and social links

### 🔐 **Authentication**
- **Login/Register Modal** with form validation
- **JWT Token Management** with localStorage persistence
- **Protected Routes** for authenticated users
- **User Profile** management with avatar upload

### 🛒 **Shopping Experience**
- **Food Display** with category filtering and pagination
- **Food Cards** with modern design, favorites, and quick view
- **Add to Cart** functionality with quantity management
- **Favorites System** to save preferred items
- **Search Functionality** across all food items

### 🛍️ **Cart & Checkout**
- **Modern Cart Page** with item management
- **Promo Code System** for discounts
- **Order Summary** with detailed pricing
- **Secure Checkout** with Stripe integration
- **Delivery Information** form with validation

### 📦 **Order Management**
- **My Orders Page** with sophisticated design matching Next.js version
- **Statistics Cards** showing Total Spent, Processing, Delivered, Cancelled orders
- **Order Timeline** with visual progress indicators
- **Filter System** (All, Food Processing, Out for Delivery, Delivered, Cancelled)
- **Expandable Order Details** with:
  - Complete delivery address
  - Order items with real food images
  - Order timeline visualization
  - Reorder and tracking functionality
- **Smart Pagination** with previous/next navigation
- **Real-time Order Status** updates

### 🎨 **UI/UX Features**
- **Responsive Design** for all screen sizes
- **Skeleton Loading** for better user experience
- **Smooth Animations** and hover effects
- **Toast Notifications** for user feedback
- **Scroll to Top** on route navigation
- **Modern Gradients** and shadow effects
- **Interactive Elements** with proper feedback

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **React Loading Skeleton** - Loading states
- **Context API** - State management

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── food_*.png         # Food item images (32 items)
│   ├── menu_*.png         # Category menu images
│   ├── logo.png           # App logo
│   ├── header_img.png     # Hero background
│   └── *.png              # Various icons and images
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx     # Navigation with dropdown
│   │   ├── Footer.jsx     # Modern footer with gradients
│   │   ├── Header.jsx     # Hero section with animations
│   │   ├── FoodDisplay.jsx # Food grid with pagination
│   │   ├── Food_Item.jsx  # Individual food card
│   │   ├── LoginPop.jsx   # Authentication modal
│   │   ├── MobileApp.jsx  # App promotion section
│   │   ├── Features.jsx   # Features showcase
│   │   ├── Testimonials.jsx # Customer reviews
│   │   ├── ProductPopup.jsx # Quick view modal
│   │   ├── OrderHistoryPanel.jsx # Order management
│   │   ├── SearchBar.jsx  # Search functionality
│   │   ├── Avatar.jsx     # User avatar component
│   │   ├── SkeletonCard.jsx # Loading skeleton
│   │   ├── OrderSkeleton.jsx # Order loading states
│   │   └── ScrollToTop.jsx # Auto scroll component
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Search.jsx     # Search results
│   │   ├── Cart.jsx       # Shopping cart
│   │   ├── PlaceOrder.jsx # Checkout process
│   │   ├── MyOrders.jsx   # Order history (matches Next.js design)
│   │   ├── Verify.jsx     # Payment verification
│   │   ├── Profile.jsx    # User profile
│   │   ├── About.jsx      # About page
│   │   └── Contact.jsx    # Contact page
│   ├── context/           # State management
│   │   └── StoreContext.jsx # Global app state
│   ├── assets/            # Local assets
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles with animations
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 4000

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling & Design

### **Design System**
- **Primary Color**: #ff6b6b (Tomato red)
- **Secondary Colors**: Purple, Green, Orange gradients
- **Typography**: Poppins font family
- **Shadows**: Layered shadow system
- **Animations**: Smooth transitions and hover effects

### **Responsive Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Key Design Features**
- **Gradient Backgrounds** for visual appeal
- **Rounded Corners** (12px, 16px, 24px)
- **Shadow Layers** for depth
- **Hover Animations** for interactivity
- **Loading States** with skeleton screens

## 🔗 API Integration

The frontend communicates with the backend through RESTful APIs:

### **Authentication Endpoints**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user-data` - Get user profile

### **Food Endpoints**
- `GET /api/food/get` - Get all food items
- `POST /api/food/add` - Add new food item (admin)
- `DELETE /api/food/remove` - Remove food item (admin)

### **Cart Endpoints**
- `GET /api/cart/get` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/remove` - Remove item from cart

### **Order Endpoints**
- `POST /api/order/place` - Place new order
- `GET /api/order/user-orders` - Get user orders
- `POST /api/order/verify` - Verify payment

### **Favorites Endpoints**
- `GET /api/favorites/get` - Get user favorites
- `POST /api/favorites/add` - Add to favorites
- `DELETE /api/favorites/remove` - Remove from favorites

## 🔒 Authentication Flow

1. **User Registration/Login** through modal
2. **JWT Token** stored in localStorage
3. **Token Validation** on protected routes
4. **Automatic Logout** on token expiration
5. **User Data Fetching** on app initialization

## 📱 Mobile Responsiveness

- **Mobile-First Design** approach
- **Touch-Friendly** buttons and interactions
- **Optimized Images** for different screen sizes
- **Collapsible Navigation** for mobile devices
- **Swipe Gestures** for carousels

## 🚀 Performance Optimizations

- **Lazy Loading** for images
- **Code Splitting** with React Router
- **Skeleton Loading** for better perceived performance
- **Optimized Bundle Size** with Vite
- **Image Optimization** with proper formats
- **Caching Strategy** for API responses

## 🎯 Key Features Matching Next.js Design

The React frontend has been carefully crafted to match the Next.js version exactly:

### **MyOrders Page**
- ✅ **Statistics Cards** with gradient backgrounds
- ✅ **Order Timeline** with visual progress indicators
- ✅ **Filter Tabs** (All, Food Processing, Out for Delivery, etc.)
- ✅ **Real Food Images** in order summaries and details
- ✅ **Expandable Order Cards** with complete information
- ✅ **Smart Pagination** with previous/next navigation
- ✅ **Skeleton Loading** for all components

### **Cart Page**
- ✅ **Modern Design** with promo codes and order summary
- ✅ **Item Management** with quantity controls
- ✅ **Price Calculations** with taxes and delivery fees

### **Checkout Process**
- ✅ **Multi-Step Form** with progress indicators
- ✅ **Address Validation** and form handling
- ✅ **Payment Integration** with Stripe
- ✅ **Order Confirmation** with success/failure states

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Food Images** from various sources for demonstration