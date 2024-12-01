
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';


//For adding to cart
export const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      let cart = await Cart.findOne({ userId });
      if (cart) {
        const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (existingProductIndex > -1) {
          cart.products[existingProductIndex].quantity += quantity;
        } else {
          cart.products.push({ productId, quantity });
        }
        await cart.save();
      } else {
        const newCart = new Cart({
          userId,
          products: [{ productId, quantity }],
        });
        await newCart.save();
      }
  
      res.status(201).json({ message: 'Product added to cart' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product to cart' });
    }
  };

//For updating the cart
export const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const userId = req.user.userId;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === id);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//For to remove from cart
export const removeFromCart = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== id);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
