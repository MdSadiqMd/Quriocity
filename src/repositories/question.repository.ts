const { Question } = require('../models/index');
const { Answer } = require('../models/index');
const NotFound = require('../errors/notfound.error');
import logger from "../config/logger.config";

interface QuestionData {
    title: string;
    body: string;
    topics: string[];
    user_id: string;
}

interface AnswerData {
    question_id: string;
    text: string;
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
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

    async searchQuestion(searchData: Partial<QuestionData>) {
        try {
            const query: any = {};
            for (const [key, value] of Object.entries(searchData)) {
                query[key] = { $regex: value, $options: 'i' };
            }
            const questions = await Question.find(query);
            if (!questions.length) {
                logger.warn(`Questions matching search data: ${JSON.stringify(searchData)} not found`);
                throw new NotFound('Question', searchData);
            }
            logger.info(`Questions matching search data: ${JSON.stringify(searchData)} retrieved`);
            return questions;
        } catch (error) {
            logger.error(`Error retrieving questions with search data: ${JSON.stringify(searchData)}: `, error);
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

    async addAnswer(id: string, answerData: Partial<AnswerData>) {
        try {
            const question = await Question.findById(id);
            if (!question) {
                logger.warn(`Question with ID: ${id} not found for adding answer`);
                throw new NotFound('Question', id);
            }
            console.log(question);
            console.log(answerData);
            const answer = await Answer.create({
                question_id: id,
                text: answerData.text,
                user_id: answerData.user_id,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            logger.info(`Answer created with ID: ${answer._id}`);
            return answer;
        } catch (error) {
            logger.error(`Error creating answer:`, error);
            throw error;
        }
    }
};

module.exports = QuestionRepository;