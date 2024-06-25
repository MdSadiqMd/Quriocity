interface AnswerData {
    question_id: string;
    text: string;
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CommentData {
    parent_id: string;
    text: string;
    createdAt?: Date;
    user_id: string;
}

interface AnswerRepository {
    getAllAnswers(questionId: string): Promise<any[]>;
    updateAnswer(answerId: string, updatedData: Partial<AnswerData>): Promise<any>;
    deleteAnswer(answerId: string): Promise<any>;
    addComment(answerId: string, commentData: Partial<CommentData>): Promise<any>;
}

class AnswerService {
    private AnswerRepository: AnswerRepository;

    constructor(AnswerRepository: AnswerRepository) {
        this.AnswerRepository = AnswerRepository;
    }

    async getAllAnswers(questionId: string): Promise<any[]> {
        const answers = await this.AnswerRepository.getAllAnswers(questionId);
        return answers;
    }

    async updateAnswer(answerId: string, updatedData: Partial<AnswerData>): Promise<any> {
        const answer = await this.AnswerRepository.updateAnswer(answerId, updatedData);
        return answer;
    }

    async deleteAnswer(answerId: string): Promise<any> {
        const answer = await this.AnswerRepository.deleteAnswer(answerId);
        return answer;
    }

    async addComment(answerId: string, commentData: Partial<CommentData>): Promise<any> {
        const comment = await this.AnswerRepository.addComment(answerId, commentData);
        return comment;
    }
}

module.exports = AnswerService;