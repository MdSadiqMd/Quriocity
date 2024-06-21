const { User } = require('../models/index');
const NotFound = require('../errors/notfound.error');
/* import logger from "../config/logger.config"; */

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
            //logger.info(`Problem created with ID: ${problem._id}`);
            return user;
        } catch (error) {
            //logger.error('Error creating problem', error);
            throw error;
        }
    }

    async getUser(id: string) {
        try {
            const user = await User.findById(id);
            if (!user) {
                //logger.warn(`Problem with ID: ${id} not found`);
                throw new NotFound('User', id);
            }
            //logger.info(`Problem with ID: ${id} retrieved`);
            return user;
        } catch (error) {
            //logger.error(`Error retrieving problem with ID: ${id}`, error);
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const users = await User.find({});
            //logger.info(`Retrieved all problems`);
            return users;
        } catch (error) {
            //logger.error('Error retrieving all problems', error);
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
                //logger.warn(`Problem with ID: ${id} not found for update`);
                throw new NotFound('User', id);
            }
            //logger.info(`Problem with ID: ${id} updated`);
            return updatedUser;
        } catch (error) {
            //logger.error(`Error updating problem with ID: ${id}`, error);
            throw error;
        }
    }

    async deleteUser(id: string) {
        try {
            const deleteUser = await User.findByIdAndDelete(id);
            if (!deleteUser) {
                //logger.warn(`Problem with ID: ${id} not found for deletion`);
                throw new NotFound('User', id);
            }
            //logger.info(`Problem with ID: ${id} deleted`);
            return deleteUser;
        } catch (error) {
            //logger.error(`Error deleting problem with ID: ${id}`, error);
            throw error;
        }
    }
};

module.exports = UserRepository;