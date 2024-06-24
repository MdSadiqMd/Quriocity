import { NextFunction, Request, Response } from "express";
const { TopicService } = require('../services/index');
const { TopicRepository } = require('../repositories/index');
const StatusCodes = require('http-status-codes');

const topicService = new TopicService(new TopicRepository());

function pingTopicController(req: Request, res: Response) {
    return res.json({ message: "pong Topic controller" });
}

async function createTopic(req: Request, res: Response, next: NextFunction) {
    try {
        const topic = await topicService.createTopic(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: "true",
            message: `Topic created with name ${req.body.name}`,
            error: {},
            data: topic
        });
    } catch (error) {
        next(error);
    }
}

async function getTopics(req: Request, res: Response, next: NextFunction) {
    try {
        const topics = await topicService.getTopics();
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: `All topics retrived`,
            error: {},
            data: topics
        });
    } catch (error) {
        next(error);
    }
}

async function deleteTopic(req: Request, res: Response, next: NextFunction) {
    try {
        const deleteTopic = await topicService.deleteTopic(req.body);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: `Topic with name ${req.body.name} deleted Succesfully`,
            error: {},
            data: deleteTopic
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    pingTopicController,
    createTopic,
    getTopics,
    deleteTopic
};