import { NextFunction, Request, Response } from "express";
const { AnswerService } = require('../services/index');
const { AnswerRepository } = require('../repositories/index');
const StatusCodes = require('http-status-codes');

const answerService = new AnswerService(new AnswerRepository());

function pingAnswerController(req: Request, res: Response) {
    return res.json({ message: "pong answer controller" });
}

async function getAllAnswers(req: Request, res: Response, next: NextFunction) {
    try {
        const answers = await answerService.getAllAnswers(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "All Answers Fetched",
            error: {},
            data: answers
        });
    } catch (error) {
        next(error);
    }
}

async function updateAnswer(req: Request, res: Response, next: NextFunction) {
    try {
        const updatedAnswer = await answerService.updateAnswer(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Answer Updated",
            error: {},
            data: updatedAnswer
        });
    } catch (error) {
        next(error);
    }
}

async function deleteAnswer(req: Request, res: Response, next: NextFunction) {
    try {
        const deleteAnswer = await answerService.deleteAnswer(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Answer Deleted",
            error: {},
            data: deleteAnswer
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    pingAnswerController,
    getAllAnswers,
    updateAnswer,
    deleteAnswer
};