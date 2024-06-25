interface CommentData {
    parent_id: string;
    text: string;
    createdAt?: Date;
    user_id: string;
}

interface CommentRepository {
    addCommentToComment(commentId: String, CommentData: CommentData): Promise<any>;
    getAllCommentsToComments(commentId: String): Promise<any[]>;
    updateComment(commentId: string, updatedData: Partial<CommentData>): Promise<any>;
    deleteComment(commentId: string): Promise<any>;
    deleteCommentOfComment(parent_id: String, commentId: string): Promise<any>;
}

class CommentService {
    private CommentRepository: CommentRepository;

    constructor(CommentRepository: CommentRepository) {
        this.CommentRepository = CommentRepository;
    }

    async addCommentToComment(commentId: String, CommentData: CommentData): Promise<any> {
        const question = await this.CommentRepository.addCommentToComment(commentId, CommentData);
        return question;
    }

    async getAllCommentsToComments(commentId: String): Promise<any[]> {
        const question = await this.CommentRepository.getAllCommentsToComments(commentId);
        return question;
    }

    async updateComment(commentId: string, updatedData: Partial<CommentData>): Promise<any[]> {
        const question = await this.CommentRepository.updateComment(commentId, updatedData);
        return question;
    }

    async deleteComment(commentId: string): Promise<any> {
        const question = await this.CommentRepository.deleteComment(commentId);
        return question;
    }

    async deleteCommentOfComment(parent_id: String, commentId: string): Promise<any> {
        const question = await this.CommentRepository.deleteCommentOfComment(parent_id, commentId);
        return question;
    }
}

module.exports = CommentService;