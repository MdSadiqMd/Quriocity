const { Topic } = require('../models/index');
const NotFound = require('../errors/notfound.error');
import logger from "../config/logger.config";

interface TopicData {
    userId: String;
    name: String;
}

class TopicRepository {
    async createTopic(TopicData: TopicData) {
        try {
            const isExisting = await Topic.findOne({ name: TopicData.name });
            if (isExisting) {
                logger.warn(`Topic ${TopicData.name} is already present`);
                throw new Error(`Topic with name ${TopicData.name} already exists`);
            }
            const topic = await Topic.create({
                userId: TopicData.userId,
                name: TopicData.name
            });
            logger.info(`Topic created with name ${TopicData.name}`);
            return topic;
        } catch (error) {
            logger.error(`Topic with name ${TopicData.name} cannot be created:`, error);
            throw error;
        }
    }

    async getTopics() {
        try {
            const topics = await Topic.find({});
            logger.info(`All Topics fetched`);
            return topics;
        } catch (error) {
            logger.error(`Error fetching topics:`, error);
            throw error;
        }
    }

    async deleteTopic(TopicData: TopicData) {
        try {
            const topic = await Topic.findOne({ name: TopicData.name });
            if (!topic) {
                logger.warn(`Topic with name ${TopicData.name} not found`);
                throw new NotFound('Topic', TopicData.name);
            }
            if (topic.userId.toString() !== TopicData.userId) {
                logger.warn(`User with ID ${TopicData.userId} has no rights to delete the topic with name ${name}`);
                throw new Error('You have no rights to delete the topic');
            }
            const deletedTopic = await Topic.findOneAndDelete({ name: TopicData.name });
            logger.info(`Topic with name ${TopicData.name} deleted successfully`);
            return deletedTopic;
        } catch (error) {
            logger.error(`Error deleting topic with name ${TopicData.name}:`, error);
            throw error;
        }
    }
};

module.exports = TopicRepository;