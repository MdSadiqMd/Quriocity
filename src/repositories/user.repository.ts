const { User } = require('../models/index');
const NotFound = require('../errors/notfound.error');
import logger from "../config/logger.config";

interface UserData {
    username: string;
    email: string;
    bio?: string;
}

class UserRepository {
    async createUser(UserData: UserData) {
        try {
            const user = await User.create({
                username: UserData.username,
                email: UserData.email,
                bio: UserData.bio ?? ""
            });
            logger.info(`User created with ID: ${user._id}`);
            return user;
        } catch (error) {
            logger.error('Error creating User: ', error);
            throw error;
        }
    }

    async getUser(id: string) {
        try {
            const user = await User.findById(id);
            if (!user) {
                logger.warn(`User with ID: ${id} not found`);
                throw new NotFound('User', id);
            }
            logger.info(`User with ID: ${id} retrieved`);
            return user;
        } catch (error) {
            logger.error(`Error retrieving user with ID: ${id}: `, error);
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const users = await User.find({});
            logger.info(`Retrieved all users`);
            return users;
        } catch (error) {
            logger.error('Error retrieving all users: ', error);
            throw error;
        }
    }

    async updateUser(id: string, updatedData: Partial<UserData>) {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, { $set: updatedData }, {
                new: true,
                runValidators: true
            });
            if (!updatedUser) {
                logger.warn(`User with ID: ${id} not found for update`);
                throw new NotFound('User', id);
            }
            logger.info(`User with ID: ${id} updated`);
            return updatedUser;
        } catch (error) {
            logger.error(`Error updating user with ID: ${id}: `, error);
            throw error;
        }
    }

    async deleteUser(id: string) {
        try {
            const deleteUser = await User.findByIdAndDelete(id);
            if (!deleteUser) {
                logger.warn(`User with ID: ${id} not found for deletion`);
                throw new NotFound('User', id);
            }
            logger.info(`User with ID: ${id} deleted`);
            return deleteUser;
        } catch (error) {
            logger.error(`Error deleting user with ID: ${id}: `, error);
            throw error;
        }
    }
};

module.exports = UserRepository;