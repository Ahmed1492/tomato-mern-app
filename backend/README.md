# 🍴 Food Delivery Backend (Node.js + Express)

A robust backend API for the food delivery application built with Node.js, Express, and MongoDB. This server provides secure authentication, food management, cart functionality, order processing, and payment integration with Stripe.

## 🚀 Features

### 🔐 **Authentication & Authorization**
- **JWT-based Authentication** with secure token generation
- **Password Hashing** using bcrypt
- **Protected Routes** with middleware validation
- **Role-based Access Control** (User/Admin)
- **Token Refresh** mechanism
- **User Profile Management** with image uploads

### 🥘 **Food Management**
- **CRUD Operations** for food items
- **Image Upload** integration with Cloudinary
- **Category Management** for food organization
- **Search and Filter** functionality
- **Inventory Tracking** and availability status
- **Admin-only Operations** for food management

### 🛒 **Cart System**
- **Persistent Cart** storage per user
- **Add/Remove Items** with quantity management
- **Cart Synchronization** across devices
- **Cart Validation** before checkout
- **Automatic Cart Cleanup** for inactive users

### 💖 **Favorites System**
- **User Favorites** management
- **Add/Remove Favorites** functionality
- **Persistent Storage** across sessions
- **Quick Access** to preferred items

### 📦 **Order Management**
- **Order Creation** with detailed information
- **Order Status Tracking** (Processing, Out for Delivery, Delivered, Cancelled)
- **Order History** for users and admins
- **Order Verification** after payment
- **Admin Order Management** with status updates
- **Order Analytics** and reporting

### 💳 **Payment Integration**
- **Stripe Payment Processing** for secure transactions
- **Webhook Handling** for payment verification
- **Multiple Payment Methods** support
- **Payment Status Tracking** and updates
- **Refund Processing** capabilities
- **Transaction History** and receipts

### 📁 **File Management**
- **Cloudinary Integration** for image storage
- **Image Upload** with validation and optimization
- **Multiple File Formats** support
- **Image Transformation** and resizing
- **Secure File Access** with proper permissions

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Cloudinary** - Image storage and management
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
backend/
├── db/                    # Database configuration
│   ├── connection.js      # MongoDB connection setup
│   └── models/            # Mongoose models
│       ├── user.model.js  # User schema and model
│       ├── food.model.js  # Food item schema
│       ├── cart.model.js  # Shopping cart schema
│       └── order.model.js # Order schema
├── src/                   # Source code
│   ├── config/            # Configuration files
│   │   └── cloudinary.js  # Cloudinary setup
│   ├── controller/        # Route controllers
│   │   ├── user.controller.js      # User authentication
│   │   ├── food.controller.js      # Food management
│   │   ├── cart.controller.js      # Cart operations
│   │   ├── order.controller.js     # Order processing
│   │   └── favorites.controller.js # Favorites management
│   ├── middleware/        # Custom middleware
│   │   ├── auth.js        # Authentication middleware
│   │   └── uploadMiddleware.js     # File upload middleware
│   └── router/            # Route definitions
│       ├── user.router.js          # User routes
│       ├── food.router.js          # Food routes
│       ├── cart.router.js          # Cart routes
│       ├── order.router.js         # Order routes
│       └── favorites.router.js     # Favorites routes
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── server.js             # Main server file
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Stripe account for payments
- Cloudinary account for image storage

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/food-delivery
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food-delivery

   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key

   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Server Configuration
   PORT=4000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (if configured)

## 📡 API Endpoints

### **Authentication Routes** (`/api/auth`)

#### **POST** `/register`
Register a new user account
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### **POST** `/login`
Authenticate user and get JWT token
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### **GET** `/user-data`
Get authenticated user's profile data
- **Headers**: `Authorization: Bearer <token>`

### **Food Routes** (`/api/food`)

#### **GET** `/get`
Get all food items with optional filtering
- **Query Parameters**: `category`, `search`, `page`, `limit`

#### **POST** `/add` (Admin Only)
Add a new food item
- **Headers**: `Authorization: Bearer <admin-token>`
- **Body**: Multipart form data with image file

#### **DELETE** `/remove` (Admin Only)
Remove a food item
- **Headers**: `Authorization: Bearer <admin-token>`
- **Body**: `{ "id": "food-item-id" }`

### **Cart Routes** (`/api/cart`)

#### **GET** `/get`
Get user's cart items
- **Headers**: `Authorization: Bearer <token>`

#### **POST** `/add`
Add item to cart
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "itemId": "food-item-id" }`

#### **PUT** `/remove`
Remove item from cart
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "itemId": "food-item-id" }`

### **Order Routes** (`/api/order`)

#### **POST** `/place`
Place a new order
- **Headers**: `Authorization: Bearer <token>`
```json
{
  "address": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  },
  "items": [
    {
      "_id": "food-item-id",
      "name": "Pizza",
      "price": 12.99,
      "quantity": 2
    }
  ],
  "amount": 27.98,
  "paymentMethod": "stripe"
}
```

#### **GET** `/user-orders`
Get user's order history
- **Headers**: `Authorization: Bearer <token>`

#### **GET** `/list` (Admin Only)
Get all orders for admin management
- **Headers**: `Authorization: Bearer <admin-token>`

#### **POST** `/status` (Admin Only)
Update order status
- **Headers**: `Authorization: Bearer <admin-token>`
- **Body**: `{ "orderId": "order-id", "status": "Out for Delivery" }`

#### **POST** `/verify`
Verify payment and update order status
```json
{
  "orderId": "order-id",
  "success": "true"
}
```

### **Favorites Routes** (`/api/favorites`)

#### **GET** `/get`
Get user's favorite items
- **Headers**: `Authorization: Bearer <token>`

#### **POST** `/add`
Add item to favorites
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "itemId": "food-item-id" }`

#### **DELETE** `/remove`
Remove item from favorites
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "itemId": "food-item-id" }`

## 🗄️ Database Models

### **User Model**
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  cartData: Object (default: {}),
  role: String (default: 'user'),
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### **Food Model**
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  image: String (required),
  category: String (required),
  available: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### **Order Model**
```javascript
{
  userId: ObjectId (ref: 'User'),
  items: [{
    foodId: ObjectId (ref: 'Food'),
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  amount: Number (required),
  address: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  status: String (default: 'Food Processing'),
  date: Date (default: Date.now),
  payment: Boolean (default: false),
  paymentMethod: String
}
```

### **Cart Model**
```javascript
{
  userId: ObjectId (ref: 'User'),
  items: [{
    foodId: ObjectId (ref: 'Food'),
    quantity: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

### **Authentication Security**
- **JWT Tokens** with expiration
- **Password Hashing** with bcrypt (10 rounds)
- **Protected Routes** with middleware validation
- **Token Blacklisting** for logout functionality

### **Data Validation**
- **Input Sanitization** for all endpoints
- **Schema Validation** with Mongoose
- **File Upload Validation** (type, size limits)
- **Email Format Validation**

### **API Security**
- **CORS Configuration** for cross-origin requests
- **Rate Limiting** to prevent abuse
- **Request Size Limits** for file uploads
- **Error Handling** without sensitive data exposure

## 💳 Payment Processing

### **Stripe Integration**
- **Secure Payment Processing** with Stripe API
- **Webhook Handling** for payment verification
- **Test Mode** for development
- **Production Ready** configuration

### **Payment Flow**
1. **Order Creation** with pending payment status
2. **Stripe Session** creation for secure checkout
3. **Payment Processing** on Stripe's secure servers
4. **Webhook Verification** for payment confirmation
5. **Order Status Update** upon successful payment

## 📁 File Upload System

### **Cloudinary Integration**
- **Secure Image Storage** in the cloud
- **Automatic Optimization** for web delivery
- **Multiple Format Support** (JPEG, PNG, WebP)
- **Image Transformation** capabilities
- **CDN Delivery** for fast loading

### **Upload Process**
1. **File Validation** (type, size, format)
2. **Multer Processing** for multipart data
3. **Cloudinary Upload** with optimization
4. **URL Storage** in database
5. **Error Handling** for failed uploads

## 🚀 Deployment

### **Environment Configuration**
- **Production Environment Variables**
- **Database Connection** (MongoDB Atlas recommended)
- **Stripe Live Keys** for production payments
- **Cloudinary Production** configuration

### **Vercel Deployment**
The project includes `vercel.json` for easy deployment:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### **Deployment Steps**
1. **Environment Setup** in deployment platform
2. **Database Migration** to production
3. **Stripe Webhook** configuration
4. **Domain Configuration** for CORS
5. **SSL Certificate** setup

## 📊 Monitoring & Analytics

### **Logging**
- **Request Logging** for API calls
- **Error Logging** with stack traces
- **Performance Monitoring** for slow queries
- **Security Event Logging**

### **Health Checks**
- **Database Connection** monitoring
- **External Service** availability checks
- **Memory Usage** tracking
- **Response Time** monitoring

## 🧪 Testing

### **Test Categories**
- **Unit Tests** for individual functions
- **Integration Tests** for API endpoints
- **Authentication Tests** for security
- **Database Tests** for data integrity

### **Test Setup**
```bash
# Install test dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Express.js Team** for the excellent web framework
- **MongoDB Team** for the flexible database
- **Stripe Team** for secure payment processing
- **Cloudinary Team** for image management services