interface TopicRepository {
    createTopic(userId: String, topic: String): Promise<any>;
    getTopics(): Promise<any[]>;
    deleteTopic(userId: String, topic: String): Promise<any>;
}

class TopicService {
    private TopicRepository: TopicRepository;

    constructor(TopicRepository: TopicRepository) {
        this.TopicRepository = TopicRepository;
    }

    async createTopic(userId: String, topic: String): Promise<any[]> {
        const newTopic = await this.TopicRepository.createTopic(userId, topic);
        return newTopic;
    }

    async getTopics(): Promise<any[]> {
        const topics = await this.TopicRepository.getTopics();
        return topics;
    }

    async deleteTopic(userId: String, topic: String): Promise<any[]> {
        const deleteTopic = await this.TopicRepository.deleteTopic(userId, topic);
        return deleteTopic;
    }
}

module.exports = TopicService;