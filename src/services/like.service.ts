interface LikeRepository {
    like(type: String, type_id: String, id: String): Promise<any>;
    getLikes(type: String, type_id: String, id: String): Promise<any[]>;
    dislike(like_id: String): Promise<any>;
}

class LikeService {
    private LikeRepository: LikeRepository;

    constructor(LikeRepository: LikeRepository) {
        this.LikeRepository = LikeRepository;
    }

    async like(type: String, type_id: String, id: String): Promise<any[]> {
        const like = await this.LikeRepository.like(type, type_id, id);
        return like;
    }

    async getLikes(type: String, type_id: String, id: String): Promise<any[]> {
        const likes = await this.LikeRepository.getLikes(type, type_id, id);
        return likes;
    }

    async dislike(like_id: String): Promise<any[]> {
        const dislike = await this.LikeRepository.dislike(like_id);
        return dislike;
    }
}

module.exports = LikeService;