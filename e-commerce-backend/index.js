require("dotenv").config();

const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET in environment. Set it in .env before starting the server.");
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error("Missing MONGODB_URI in environment. Set it in .env before starting the server.");
  process.exit(1);
}

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect(process.env.MONGODB_URI).catch((error) => {
  console.error("MongoDB connection error:", error.message);
});

//Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})
app.use('/images', express.static('upload/images'));

// MiddleWare to fetch user from database
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

// MiddleWare to require an authenticated admin user
const fetchadmin = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    const user = await Users.findById(data.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).send({ errors: "Admin access required" });
    }
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};


// Schema for creating user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Schema for creating Product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number
  },
  old_price: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

// Schema for Orders
const Order = mongoose.model("Order", {
  cakeType: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  additionalItems: {
    type: Array,
    default: [],
  },
  comments: {
    type: String,
  },
  userId: {
    type: String,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'pending'
  }
});

app.get("/", (req, res) => {
  res.send("Root");
});

app.post("/upload", fetchadmin, upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
  console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
			success = true;
      console.log(user.id);
			const token = jwt.sign(data, JWT_SECRET);
			res.json({ success, token, isAdmin: user.isAdmin });
        }
        else {
            return res.status(400).json({success: success, errors: "please try with correct email/password"})
        }
    }
    else {
        return res.status(400).json({success: success, errors: "please try with correct email/password"})
    }
})

//Create an endpoint at ip/auth for regestring the user in data base & sending token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
        let success = false;
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: success, errors: "existing user found with this email" });
        }
        let cart = {};
          for (let i = 0; i < 300; i++) {
          cart[i] = 0;
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
        });
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, token })
    })

app.get("/allproducts", async (req, res) => {
	let products = await Product.find({});
  console.log("All Products");
    res.send(products);
});

app.get("/newcollections", async (req, res) => {
	let products = await Product.find({});
  let arr = products.slice(1).slice(-8);
  console.log("New Collections");
  res.send(arr);
});

app.get("/popularinwomen", async (req, res) => {
	let products = await Product.find({});
  let arr = products.splice(0,  4);
  console.log("Popular In Women");
  res.send(arr);
});

//Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
	console.log("Add Cart");
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
  })

  //Create an endpoint for saving the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
	console.log("Remove Cart");
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]!=0)
    {
      userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed");
  })

  //Create an endpoint for saving the product in cart
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);

  })


app.post("/addproduct", fetchadmin, async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length>0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1;
  }
  else
  { id = 1; }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({success:true,name:req.body.name})
});

app.post("/removeproduct", fetchadmin, async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({success:true,name:req.body.name})
});

// Create an endpoint for submitting orders
app.post('/submit-order', fetchuser, async (req, res) => {
  try {
    const order = new Order({
      cakeType: req.body.cakeType,
      deliveryDate: req.body.deliveryDate,
      additionalItems: req.body.additionalItems,
      comments: req.body.comments,
      userId: req.user.id
    });

    await order.save();
    res.json({success: true, orderId: order._id});
  } catch (error) {
    console.error('Order submission error:', error);
    res.status(500).json({success: false, error: 'Failed to submit order'});
  }
});

// Get user's orders
app.get('/my-orders', fetchuser, async (req, res) => {
  try {
    const orders = await Order.find({userId: req.user.id}).sort({orderDate: -1});
    res.json(orders);
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({error: 'Failed to fetch orders'});
  }
});

// AI chatbot: kept server-side so the Gemini API key never reaches the browser.
const CHAT_MODEL_NAME = "gemini-1.5-pro-latest";
const CHAT_SEED_HISTORY = [
  { role: "user", parts: [{ text: "Hi" }] },
  { role: "model", parts: [{ text: "Hello there! Welcome to the Car Parts Shop Help Chat. I'm Car Parts Helper, here to assist you with finding the right parts for your vehicle.\n\nBefore we begin, may I kindly ask for your name and email address? This will help me provide you with a more personalized experience and follow up if needed." }] },
  { role: "user", parts: [{ text: "Name Dastan email dastan@gmail.com" }] },
  { role: "model", parts: [{ text: "Thank you, Dastan. It's a pleasure to assist you today. \n\nHow can I help you with your car parts needs?  Are you looking for something specific or need some guidance?" }] },
  { role: "user", parts: [{ text: "Looking for oil filter" }] },
  { role: "model", parts: [{ text: "Certainly, Dastan! Let's find the perfect oil filter for your vehicle. To ensure we get the right one, could you please provide me with the following information:\n\n* **Year, make, and model of your car:** This will help us narrow down the options to filters that are compatible with your specific vehicle.\n* **Engine size and type (if known):**  Knowing the engine specifics further refines the search to filters with the correct specifications. \n* **Desired brand or price range (optional):** If you have a preferred brand or a specific budget in mind, let me know and I can tailor the recommendations accordingly. \n\nThe more information you can provide, the better I can assist you in finding the ideal oil filter for your car." }] },
  { role: "user", parts: [{ text: "Ok thanks" }] },
  { role: "model", parts: [{ text: "You're most welcome, Dastan! I'm here to help. Just let me know the details of your car and any preferences you have for the oil filter, and we'll find the perfect match." }] },
  { role: "user", parts: [{ text: "Break pads?" }] },
  { role: "model", parts: [{ text: "Absolutely, Dastan! We can definitely help you find the right brake pads for your car. To ensure we get the perfect fit, could you please share the following information:\n\n* **Year, make, and model of your car:**" }] },
  { role: "user", parts: [{ text: "Do you offer any discounts or coupons?" }] },
  { role: "model", parts: [{ text: "Great question, Dastan! We frequently run promotions and offer discounts on various car parts, including oil filters and brake pads." }] },
  { role: "user", parts: [{ text: "What are your return and exchange policies?" }] },
  { role: "model", parts: [{ text: "## Return and Exchange Policies:\n\nWe want you to be completely satisfied with your purchase. Here's a summary of our return and exchange policies:\n\n**Returns:**\n\n* **Timeframe:** Most new, unopened items can be returned within **30 days of purchase** for a full refund. \n* **Condition:** Items must be in their original packaging, unused, and in the same condition as received.\n* **Exceptions:** Certain items, such as electrical parts, may be non-returnable or subject to a restocking fee. \n\n**Exchanges:**\n\n* We gladly facilitate exchanges for items in new, unopened condition within the 30-day return window.\n* If you need a different size, type, or model, we'll help you find the right replacement.\n\n**Process:**\n\n* To initiate a return or exchange, please bring the item and your receipt to our store. \n* Our team will guide you through the process and ensure a smooth experience. \n\n**Additional Notes:**\n\n* It's recommended to check the specific return policy for the item you purchased, as some exceptions may apply. \n* We strive to process returns and exchanges promptly, and refunds are typically issued within a few business days.\n\n**Please note:**  This is a general overview, and specific details may vary. For the most accurate information regarding returns and exchanges, please refer to the policies outlined on your receipt or contact our store directly." }] },
  { role: "user", parts: [{ text: "How long will it take for my order to arrive?" }] },
  { role: "model", parts: [{ text: "The delivery time for your order depends on several factors, including:\n\n* **Shipping method:** We offer various shipping options, including standard, expedited, and overnight. Faster shipping methods will naturally result in quicker delivery times. \n* **Availability of the items:** If all items are in stock, your order will typically ship within 1-2 business days. \n* **Destination:** Delivery times vary depending on the distance between our warehouse and your shipping address. \n\nTo provide you with a more accurate estimate, I'd need some additional information:\n\n* **The specific items you ordered:** Knowing the items helps determine if they're in stock and their shipping size/weight.\n* **Your shipping address (city and state):** This allows me to estimate the distance and transit time.\n* **The chosen shipping method:**  Knowing your preferred shipping speed helps calculate the expected delivery timeframe. \n\nWith this information, I can provide you with a more precise estimate of when your order will arrive." }] },
];

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    return res.status(400).json({ error: "message is required" });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ error: "AI chat is not configured on the server" });
  }
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: CHAT_MODEL_NAME });
    const chat = model.startChat({
      generationConfig: {
        temperature: 1,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ],
      history: CHAT_SEED_HISTORY,
    });
    const result = await chat.sendMessage(userMessage);
    res.json({ text: result.response.text() });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
