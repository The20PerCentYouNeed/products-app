const User = require('../models/user.model');

exports.findAll = async(req, res) => {
    console.log("Find all user's products");

    try {
        const result = await User.find({}, {_id: 0, username: 1, products: 1})
        res.status(200).json({data: result});
        console.log("Reading all users products");
    } catch (error) {
        res.status(400).json({data: error});
        console.log("Problem in reading users products");
    }
}

exports.findOne = async(req, res) => {
    const username = req.params.username;
    console.log("Find products for user:", username);

    try {
        const result = User.findOne({username: username}, {_id: 0, username: 1, products: 1});
        res.status(200).json({data: result});
        console.log("Success in finding products for user:", username);
    } catch (error) {
        res.status(400).json({data: error});
        console.log("Error in finding products for user:", username);
    }
}

exports.create = async(req, res) => {
    const username = req.body.username;
    const products = req.body.products;

    console.log("Insert products for user", username);

    try {
        const result = await User.updateOne(
            {
                $push: {
                    products: products
                }
            }
        )
        res.status(200).json({data: result});
        console.log("Success");
    } catch (error) {
        res.status(400).json({data: error});
        console.log("Failed inserting new products to user:", username);
    }
}