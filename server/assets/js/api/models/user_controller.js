const User = require('./models/user');

async function createUser(userData) {
    return await User.create(userData);
}

async function getAllUsers() {
    return await User.find();
}

async function updateUser(userId, newData) {
    return await User.findByIdAndUpdate(userId, newData, { new: true });
}

async function deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
}

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};

