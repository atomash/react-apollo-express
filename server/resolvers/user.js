import userController from "../controllers/user.controller";
import { pubsub } from "../app";

const USER_ADDED = 'USER_ADDED';

const userResolver = {
	Subscription: {
		userAdded: {
			subscribe: () => pubsub.asyncIterator([USER_ADDED])
		}
	},
	Mutation: {
		addUser(root, args) {
			const userAdded = userController.addUser(root, args)
			pubsub.publish(USER_ADDED, { userAdded });
			return userAdded;
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

