import userController from "../controllers/user.controller";
import { pubsub } from "../app";

const USER_ADDED = 'USER_ADDED';
const USER_DELETED = 'USER_DELETED';

const userResolver = {
	Subscription: {
		userAdded: {
			subscribe: () => pubsub.asyncIterator([USER_ADDED])
		},
		userDeleted: {
			subscribe: () => pubsub.asyncIterator([USER_DELETED])
		}
	},
	Mutation: {
		addUser(root, args) {
			const userAdded = userController.addUser(root, args)
			pubsub.publish(USER_ADDED, { userAdded });
			return userAdded;
		},
		deleteUser(root, args) {
			userController.deleteUser(root, args)
			pubsub.publish(USER_DELETED, {
				userDeleted: {
					_id: args.id
				} });
			return {
				_id: args.id
			};
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

