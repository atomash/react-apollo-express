import userController from "../controllers/user.controller";

const userResolver = {
	Mutation: {
		addUser(root, args) {
			return userController.addUser(root, args);
		},
		deleteUser(root, args) {
			return userController.deleteUser(root, args);
		},
		updateUser(root, args) {
			return userController.updateUser(root, args);
		}
	},
	Query: {
		allUsers(root, args) {
			return userController.getUsers(root, args);
		}
	}
};



export default userResolver;

