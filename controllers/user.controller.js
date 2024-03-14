const User = require('../models/user.model');

exports.findAll = async(req, res) => {
    console.log("Find All Users");
    const result = await User.find();
    res.status(200).json({ data: result});
}

exports.findOne = async(req, res) => {
    console.log("Find a user");

    const username = req.params.username;
    try {
        const result = await User.findOne({ username: username });
        res.status(200).json({ data: result });
    } catch (error) {
        console.log("Problem in reading user");
    }
}

exports.create = async(req, res) => {
    console.log("Insert User");
    console.log(req.body);

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        addres: req.body.addres,
        phone: req.body.phone,
        products: req.body.products
    });

    try {
        const result = await newUser.save();
        res.status(200).json({data: result});
        console.log("User saved");

    } catch (error) {
        res.status(400).json({data: err});
        console.log("Problem in saving User");
    }
}

exports.update = async(req, res) => {
    const username = req.params.username;
    console.log("Update user with username");

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    }

    try {
        const result = await User.findOneAndUpdate(
            {username: username},
            updateUser,
            {new: true}
        )
        console.log("Success")
        res.status(200).json({data: result});
    } catch (error) {
        res.status(400).json({data: error})
        console.log("Problem in updating user", user);
    }
}

exports.delete = async(req, res) => {
    const username = req.params.username;
    console.log("Delete user", username);

    try {
        const result = await User.findOneAndDelete({username: username});
        res.status(200).json({data: result});
        console.log("Success in deleting user", username);
    } catch(error) {
        res.status(400).json({data: error});
        console.log("Error in deleting user", username);
    }
}