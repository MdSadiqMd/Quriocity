const { Question } = require('../models/index');
const NotFound = require('../errors/notfound.error');
import logger from "../config/logger.config";

interface QuestionData {
    title: string;
    body: string;
    topics: string[];
    user_id: string;
}

class QuestionRepository {
    async createQuestion(QuestionData: QuestionData) {
        try {
            const question = await Question.create({
                title: QuestionData.title,
                body: QuestionData.body,
                topics: QuestionData.topics,
                user_id: QuestionData.user_id,
            });
            logger.info(`Question created with ID: ${question._id}`);
            return question;
        } catch (error) {
            logger.error('Error creating Question: ', error);
            throw error;
        }
    }

    async searchQuestion(searchData: string, projection?: Partial<Record<keyof QuestionData, number>>) {
        try {
            const questions = await Question.find({ $text: { $search: searchData } }).select(projection);
            if (!questions.length) {
                logger.warn(`Questions matching search data: ${searchData} not found`);
                throw new NotFound('Question', searchData);
            }
            logger.info(`Questions matching search data: ${searchData} retrieved`);
            return questions;
        } catch (error) {
            logger.error(`Error retrieving question with ID: ${searchData}: `, error);
            throw error;
        }
    }

    async getAllQuestions() {
        try {
            const questions = await Question.find({});
            logger.info(`Retrieved all questions`);
            return questions;
        } catch (error) {
            logger.error('Error retrieving all questions: ', error);
            throw error;
        }
    }

    async updateQuestion(id: string, updatedData: Partial<QuestionData>) {
        try {
            const updatedQuestion = await Question.findByIdAndUpdate(id, { $set: updatedData }, {
                new: true,
                runValidators: true
            });
            if (!updatedQuestion) {
                logger.warn(`Question with ID: ${id} not found for update`);
                throw new NotFound('Question', id);
            }
            logger.info(`Question with ID: ${id} updated`);
            return updatedQuestion;
        } catch (error) {
            logger.error(`Error updating question with ID: ${id}: `, error);
            throw error;
        }
    }

    async deleteQuestion(id: string) {
        try {
            const deleteQuestion = await Question.findByIdAndDelete(id);
            if (!deleteQuestion) {
                logger.warn(`Question with ID: ${id} not found for deletion`);
                throw new NotFound('Question', id);
            }
            logger.info(`Question with ID: ${id} deleted`);
            return deleteQuestion;
        } catch (error) {
            logger.error(`Error deleting question with ID: ${id}: `, error);
            throw error;
        }
    }
};

module.exports = QuestionRepository;