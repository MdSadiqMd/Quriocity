import { NextFunction, Request, Response } from "express";
const { CommentService } = require('../services/index');
const { CommentRepository } = require('../repositories/index');
const StatusCodes = require('http-status-codes');

const commentService = new CommentService(new CommentRepository());

function pingAnswerController(req: Request, res: Response) {
    return res.json({ message: "pong answer controller" });
}

async function addCommentToComment(req: Request, res: Response, next: NextFunction) {
    try {
        const comment = await commentService.addCommentToComment(req.params.id, req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Comment added to Comment Succesfully',
            error: {},
            data: comment
        });
    } catch (error) {
        next(error);
    }
}

async function getAllCommentsToComments(req: Request, res: Response, next: NextFunction) {
    try {
        const comment = await commentService.getAllCommentsToComments(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "All Comments Fetched",
            error: {},
            data: comment
        });
    } catch (error) {
        next(error);
    }
}

async function updateComment(req: Request, res: Response, next: NextFunction) {
    try {
        const updatedComment = await commentService.updateComment(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Comment Updated",
            error: {},
            data: updatedComment
        });
    } catch (error) {
        next(error);
    }
}

async function deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
        const deleteComment = await commentService.deleteComment(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Comment Deleted",
            error: {},
            data: deleteComment
        });
    } catch (error) {
        next(error);
    }
}

async function deleteCommentOfComment(req: Request, res: Response, next: NextFunction) {
    try {
        const deleteComment = await commentService.deleteCommentOfComment(req.params.parent_id, req.params.id);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "Comment of the Comment Deleted",
            error: {},
            data: deleteComment
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    pingAnswerController,
    addCommentToComment,
    getAllCommentsToComments,
    updateComment,
    deleteComment,
    deleteCommentOfComment
};