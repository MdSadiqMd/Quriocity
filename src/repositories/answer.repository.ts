const { Answer } = require('../models/index');
const NotFound = require('../errors/notfound.error');
import logger from "../config/logger.config";

interface AnswerData {
    question_id: string;
    text: string;
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class AnswerRepository {
    async getAllAnswers(id: String) {
        try {
            const answers = await Answer.find({ question_id: id });
            logger.info(`Retrieved all answers`);
            return answers;
        } catch (error) {
            logger.error('Error retrieving all answers:', error);
            throw error;
        }
    }

    async updateAnswer(id: string, updatedData: Partial<AnswerData>) {
        try {
            const updatedAnswer = await Answer.findByIdAndUpdate(id, { $set: updatedData }, {
                new: true,
                runValidators: true
            });
            if (!updatedAnswer) {
                logger.warn(`Answer with ID: ${id} not found for update`);
                throw new NotFound('Answer', id);
            }
            logger.info(`Answer with ID: ${id} updated`);
            return updatedAnswer;
        } catch (error) {
            logger.error(`Error updating answer with ID: ${id}:`, error);
            throw error;
        }
    }

    async deleteAnswer(id: string) {
        try {
            const deleteAnswer = await Answer.findByIdAndDelete(id);
            if (!deleteAnswer) {
                logger.warn(`Answer with ID: ${id} not found for deletion`);
                throw new NotFound('Answer', id);
            }
            logger.info(`Answer with ID: ${id} deleted`);
            return deleteAnswer;
        } catch (error) {
            logger.error(`Error deleting answer with ID: ${id}: `, error);
            throw error;
        }
    }
};

module.exports = AnswerRepository;