import { NextFunction, Request, Response } from "express";
const { FollowService } = require('../services/index');
const { FollowRepository } = require('../repositories/index');
const StatusCodes = require('http-status-codes');

const followService = new FollowService(new FollowRepository());

function pingFollowController(req: Request, res: Response) {
    return res.json({ message: "pong follow controller" });
}

async function follow(req: Request, res: Response, next: NextFunction) {
    try {
        const follow = await followService.follow(req.params.userId, req.params.targetUserId);
        return res.status(StatusCodes.CREATED).json({
            success: "true",
            message: `Followed the ${req.params.targetUserId}`,
            error: {},
            data: follow
        });
    } catch (error) {
        next(error);
    }
}

async function getFollowers(req: Request, res: Response, next: NextFunction) {
    try {
        const followers = await followService.getFollowers(req.params.userId);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: `Retrived followers of user id ${req.params.userId}`,
            error: {},
            data: followers
        });
    } catch (error) {
        next(error);
    }
}

async function getFollowing(req: Request, res: Response, next: NextFunction) {
    try {
        const following = await followService.getFollowing(req.params.userId);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: `Retrived followings of user id ${req.params.userId}`,
            error: {},
            data: following
        });
    } catch (error) {
        next(error);
    }
}

async function unFollow(req: Request, res: Response, next: NextFunction) {
    try {
        const unFollow = await followService.unFollow(req.params.userId, req.params.targetUserId);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: `unfollowed the ${req.params.targetUserId}`,
            error: {},
            data: unFollow
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    pingFollowController,
    follow,
    getFollowers,
    getFollowing,
    unFollow
};