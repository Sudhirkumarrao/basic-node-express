const collection = require("./Constants").COLLECTIONS;

module.exports = async function (mongoObject) {

    let count = await mongoObject.count(collection.USER_COLLECTION);
    return count+1
}