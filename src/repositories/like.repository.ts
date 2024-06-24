const { User, Question, Answer, Comment, Like } = require('../models/index');
const NotFound = require('../errors/notfound.error');
import logger from "../config/logger.config";

class LikeRepository {
    async like(type: String, type_id: String, id: String) {
        try {
            const user = await User.findById(id);
            if (!user) {
                logger.warn(`User with ID: ${id} not found for liking`);
                throw new NotFound('User', id);
            }
            const like = await Like.create({
                user_id: id,
                type: type,
                type_id: type_id
            });
            logger.info(`Liked with ${id} to ${type} of Id ${type_id}`);
            return like;
        } catch (error) {
            logger.error(`Error liking ${type} of Id ${type_id}:`, error);
            throw error;
        }
    }

    async getLikes(type: string, type_id: String, user_id: String) {
        try {
            const user = await User.findById(user_id);
            if (!user) {
                logger.warn(`User with ID: ${user_id} not found for liking`);
                throw new NotFound('User', user_id);
            }
            let entity;
            switch (type) {
                case 'questions':
                    entity = await Question.findById(type_id);
                    break;
                case 'answers':
                    entity = await Answer.findById(type_id);
                    break;
                case 'comments':
                    entity = await Comment.findById(type_id);
                    break;
                default:
                    logger.warn(`Invalid type: ${type} for fetching likes`);
                    throw new Error(`Invalid type: ${type}`);
            }
            if (!entity) {
                logger.warn(`${type} with ID: ${type_id} not found for fetching likes`);
                throw new NotFound(type, type_id);
            }
            const likes = await Like.find({ type: type, type_id: type_id });
            logger.info(`Fetched likes for ${type} with ID: ${type_id}`);
            return likes;
        } catch (error) {
            logger.error(`Error getting liking ${user_id}:`, error);
            throw error;
        }
    }

    async dislike(like_id: string) {
        try {
            const like = await Like.findById(like_id);
            if (!like) {
                logger.warn(`Like with ID: ${like_id} not found for disliking`);
                throw new NotFound('Like', like_id);
            }
            const dislike = await Like.findByIdAndDelete(like_id);
            logger.info(`Disliked with ${like_id}`);
            return dislike;
        } catch (error) {
            logger.error(`Error disliking ${like_id}:`, error);
            throw error;
        }
    }
};

module.exports = LikeRepository;