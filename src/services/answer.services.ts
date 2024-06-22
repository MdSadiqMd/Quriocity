interface AnswerData {
    question_id: string;
    text: string;
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface QuestionRepository {
    getAllAnswers(questionId: string): Promise<any[]>;
    updateAnswer(answerId: string, updatedData: Partial<AnswerData>): Promise<any>;
    deleteAnswer(answerId: string): Promise<any>;
}

class AnswerService {
    private AnswerRepository: QuestionRepository;

    constructor(AnswerRepository: QuestionRepository) {
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
}

module.exports = AnswerService;