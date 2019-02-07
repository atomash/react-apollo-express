const User = require('../models/user');

const userController = {};

userController.getUsers = async () => {
	const users = await User.find({})
	return users
};

userController.addUser = (root, args) => {
	const user = new User({ name: args.name });
	return user.save();
};

userController.deleteUser = (root, args) => User.deleteOne({ _id: args.id })


userController.updateUser = (root, args) => {
	const tempUser = { ...args };
	delete tempUser.id;
	return User.updateOne({ _id: args.id }, { $set: tempUser });
};

export default userController;