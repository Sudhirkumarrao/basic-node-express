const userService = require("../../service/v1/userService");
const userModel = require("../../models/userModel");

let userController = {};


userController.getAllUser = async (req, res) => {
    try {
        let allUsers = await userService.getAllUsers();
        return res.status(200).send(allUsers);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

userController.getUserById = async (req, res) => {
    try {
        let userId = req.params.userId
        let user = await userService.getUserById(parseInt(userId));
        if (!user) {
            return res.status(400).send({'error': `User with id ${userId} not found`});
        }
        return res.status(200).send(user);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

userController.saveUser = async (req, res) => {
    try {
        let userData = new userModel.User(req.body);
        const { error } = userModel.validateUser(userData);
        if (error) {
            if (error.details)
                return res.status(400).send({error: error.details[0].message})
            else
                return res.status(400).send({error: error.message})
        }
        let user = await userService.saveUser(userData);
        return res.status(200).send(user);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

userController.updateUser = async (req, res) => {
    try {
        let userData = new userModel.UpdateUser(req.body);
        const { error } = userModel.validateUpdateUser(userData);
        if (error) {
            if (error.details)
                return res.status(400).send({error: error.details[0].message})
            else
                return res.status(400).send({error: error.message})
        }
        let user = await userService.updateUser(userData);
        return res.status(200).send(user);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

userController.deleteUser = async (req, res) => {
    try {
        let user_id = req.body.user_id;
        if (!user_id) {
            return res.status(400).send({'error': 'User Id is required'})
        }

        let user = await userService.getUserById(user_id);

        if (!user) {
            return res.status(400).send({'error': 'User Id is invalid'})
        }
        let deleteUser = await userService.deleteUser(user_id);
        return res.status(200).send(deleteUser);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

module.exports = userController;