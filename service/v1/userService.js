const mongo = require('../../config/mongo');
const collections = require("../../utility/Constants").COLLECTIONS;
const { v4: uuidv4 } = require('uuid');
const userIdGenerator = require("../../utility/userIdGenerator");

let userService = {};

userService.getAllUsers = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            let allUsers = await mongo.findAll(collections.USER_COLLECTION);
            resolve(allUsers)
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

userService.getUserById = async (user_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await mongo.findOne(collections.USER_COLLECTION, {user_id: user_id});
            resolve(user)
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

userService.saveUser = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            userData.user_id = await userIdGenerator(mongo);
            let isUserExists = await mongo.isExist(collections.USER_COLLECTION, {user_name: userData.user_name});
            if (isUserExists) {
                reject({error: `User with name ${userData.user_name} already exists`})
            } else {
                let user = await mongo.insertOne(collections.USER_COLLECTION, userData);
                resolve(user)
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

userService.updateUser = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user_id = userData.user_id;
            delete userData.user_id;
            let user = await mongo.updateOne(collections.USER_COLLECTION, {user_id: user_id} , userData);
            resolve(user)
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

userService.deleteUser = async (user_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await mongo.deleteMany(collections.USER_COLLECTION, {user_id: user_id});
            resolve(user)
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

module.exports = userService;
