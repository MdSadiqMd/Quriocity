const { User, Follow } = require('../models/index');
const NotFound = require('../errors/notfound.error');
import logger from "../config/logger.config";

class FollowRepository {
    async follow(userId: String, targetUserId: String) {
        try {
            console.log(userId, targetUserId);
            const user = await User.findById(userId);
            if (!user) {
                logger.warn(`User with ID: ${userId} not found for following`);
                throw new NotFound('User', userId);
            }
            const targetUser = await User.findById(targetUserId);
            if (!targetUser) {
                logger.warn(`target User with ID: ${targetUserId} not found for following`);
                throw new NotFound('User', targetUserId);
            }
            const follow = await Follow.create({
                userId: userId,
                targetUserId: targetUserId
            });
            logger.info(`User with Id ${targetUserId} is followed by ${userId}`);
            return follow;
        } catch (error) {
            logger.error(`Error following ${targetUserId} by ${userId}:`, error);
            throw error;
        }
    }

    async getFollowers(userId: String) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                logger.warn(`User with ID: ${userId} not found for following`);
                throw new NotFound('User', userId);
            }
            const follow = await Follow.find({ targetUserId: userId });
            logger.info(`Fetched followers for ${userId}`);
            return follow;
        } catch (error) {
            logger.error(`Error getting followers ${userId}:`, error);
            throw error;
        }
    }

    async getFollowing(userId: String) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                logger.warn(`User with ID: ${userId} not found for following`);
                throw new NotFound('User', userId);
            }
            const follow = await Follow.find({ userId: userId });
            logger.info(`Fetched followings for ${userId}`);
            return follow;
        } catch (error) {
            logger.error(`Error getting followings of ${userId}:`, error);
            throw error;
        }
    }

    async unFollow(userId: String, targetUserId: String) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                logger.warn(`User with ID: ${userId} not found for following`);
                throw new NotFound('User', userId);
            }
            const targetUser = await User.findById(targetUserId);
            if (!targetUser) {
                logger.warn(`Target user with ID: ${targetUserId} not found for following`);
                throw new NotFound('User', targetUserId);
            }
            const unfollow = await Follow.findOneAndDelete({ userId, targetUserId });
            logger.info(`User with ID ${userId} unfollowed ${targetUserId}`);
            return unfollow;
        } catch (error) {
            logger.error(`Error unfollowing ${targetUserId} by ${userId}:`, error);
            throw error;
        }
    }
};

module.exports = FollowRepository;