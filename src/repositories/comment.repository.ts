const { Comment } = require('../models/index');
const NotFound = require('../errors/notfound.error');
import logger from "../config/logger.config";

interface CommentData {
    parent_id: string;
    text: string;
    createdAt?: Date;
    user_id: string;
}

async function deleteNestedComments(commentId: string) {
    const nestedComments = await Comment.find({ parent_id: commentId });
    for (const nestedComment of nestedComments) {
        await deleteNestedComments(nestedComment._id);
        await Comment.findByIdAndDelete(nestedComment._id);
        logger.info(`Nested comment with ID: ${nestedComment._id} deleted`);
    }
}

class CommentRepository {
    async addCommentToComment(commentId: string, commentData: CommentData) {
        try {
            const comment = await Comment.create({
                parent_id: commentId,
                text: commentData.text,
                user_id: commentData.user_id
            });
            logger.info(`Comment created with ID: ${comment._id}`);
            return comment;
        } catch (error) {
            logger.error('Error creating Comment: ', error);
            throw error;
        }
    }

    async getAllCommentsToComments(commentId: string) {
        try {
            const comments = await Comment.find({ parent_id: commentId });
            if (!comments.length) {
                logger.warn(`Comments with parent ID: ${commentId} not found`);
                throw new NotFound('Comment', commentId);
            }
            logger.info(`Retrieved all comments to Comment with parent ID: ${commentId}`);
            return comments;
        } catch (error) {
            logger.error('Error retrieving all comments to Comment: ', error);
            throw error;
        }
    }

    async updateComment(commentId: string, updatedData: Partial<CommentData>) {
        try {
            const updatedComment = await Comment.findByIdAndUpdate(commentId, { $set: updatedData }, {
                new: true,
                runValidators: true
            });
            if (!updatedComment) {
                logger.warn(`Comment with ID: ${commentId} not found for update`);
                throw new NotFound('Comment', commentId);
            }
            logger.info(`Comment with ID: ${commentId} updated`);
            return updatedComment;
        } catch (error) {
            logger.error(`Error updating comment with ID: ${commentId}:`, error);
            throw error;
        }
    }

    async deleteComment(commentId: string) {
        try {
            const commentToDelete = await Comment.findById(commentId);
            if (!commentToDelete) {
                logger.warn(`Comment with ID: ${commentId} not found for deletion`);
                throw new NotFound('Comment', commentId);
            }
            await deleteNestedComments(commentId);
            await Comment.findByIdAndDelete(commentId);
            logger.info(`Comment with ID: ${commentId} deleted`);
            return commentToDelete;
        } catch (error) {
            logger.error(`Error deleting comment with ID: ${commentId}:`, error);
            throw error;
        }
    }

    async deleteCommentOfComment(parentId: string, commentId: string) {
        try {
            const commentToDelete = await Comment.findById(commentId);
            if (!commentToDelete) {
                logger.warn(`Comment with ID: ${commentId} not found or does not belong to parent ID: ${parentId}`);
                throw new NotFound('Comment', commentId);
            }
            await Comment.findByIdAndDelete(commentId);
            logger.info(`Comment with ID: ${commentId} deleted`);
            return commentToDelete;
        } catch (error) {
            logger.error(`Error deleting comment with ID: ${commentId}:`, error);
            throw error;
        }
    }
}

module.exports = CommentRepository;