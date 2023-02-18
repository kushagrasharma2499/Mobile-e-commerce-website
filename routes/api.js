const { Router } = require('express');
const express = require('express');

const router = express.Router();
const User = require('../models/model.js');

//User Registration API
app.post('/register', (req, res) => {
    const user = new User({
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
    });
    User.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(user);
        }
    });
});
//User Login API
app.post('/login', (req, res) => {
    User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else if (!user) {
            res.status(404).send('User not found');
        } else if (user.password !== req.body.password) {
            res.status(401).send('Invalid credentials');
        } else {
            res.status(200).send(user);
        }
    });
});
//Product Listing API
app.get('/products', (req, res) => {
    product.find({}, (err, products) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(products);
        }
    });
});
//Add To Cart API
app.post('/cart', (req, res) => {
    const cart = new cart({
        user: req.body.userId,
        products: [{
            product: req.body.productId,
            quantity: req.body.quantity,
        }],
    });
    cart.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(cart);
        }
    });
});
//Update Cart API
app.patch('/cart/:cartId', async (req, res) => {
    try{
        const updatedCart = await Cart.findOneAndUpdate(
            {
                 _id: req.params.cartId, 'products.product': req.body.productId 
                },
            { 
                $set: { 'products.$.quantity': req.body.quantity } 
            });
            if(!Cart) {
                return next();
            }
            res.json(updatedCart);
    } catch(error){
        next(error)
    }
});
  
module.exports = router;

