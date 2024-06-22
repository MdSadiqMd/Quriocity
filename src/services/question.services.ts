interface QuestionData {
    title: string;
    body: string;
    topics: string[];
    user_id: string;
}

interface QuestionRepository {
    createQuestion(QuestionData: QuestionData): Promise<any>;
    searchQuestion(searchData: Partial<QuestionData>): Promise<any>;
    getAllQuestions(): Promise<any[]>;
    updateQuestion(questionId: string, updatedData: Partial<QuestionData>): Promise<any>;
    deleteQuestion(questionId: string): Promise<any>;
}

class QuestionService {
    private QuestionRepository: QuestionRepository;

    constructor(QuestionRepository: QuestionRepository) {
        this.QuestionRepository = QuestionRepository;
    }

    async createQuestion(QuestionData: QuestionData): Promise<any> {
        const question = await this.QuestionRepository.createQuestion(QuestionData);
        return question;
    }

    async searchQuestion(searchData: Partial<QuestionData>): Promise<any[]> {
        const question = await this.QuestionRepository.searchQuestion(searchData);
        return question;
    }

    async getAllQuestions(): Promise<any[]> {
        const questions = await this.QuestionRepository.getAllQuestions();
        return questions;
    }

    async updateQuestion(questionId: string, updatedData: Partial<QuestionData>): Promise<any> {
        const question = await this.QuestionRepository.updateQuestion(questionId, updatedData);
        return question;
    }

    async deleteQuestion(questionId: string): Promise<any> {
        const question = await this.QuestionRepository.deleteQuestion(questionId);
        return question;
    }
}

module.exports = QuestionService;