interface FollowRepository {
    follow(userId: String, targetUserId: String): Promise<any>;
    getFollowers(userId: String): Promise<any[]>;
    getFollowing(userId: String): Promise<any[]>;
    unFollow(userId: String, targetUserId: String): Promise<any>;
}

class FollowService {
    private FollowRepository: FollowRepository;

    constructor(FollowRepository: FollowRepository) {
        this.FollowRepository = FollowRepository;
    }

    async follow(userId: String, targetUserId: String): Promise<any[]> {
        const follow = await this.FollowRepository.follow(userId, targetUserId);
        return follow;
    }

    async getFollowers(userId: String): Promise<any[]> {
        const followers = await this.FollowRepository.getFollowers(userId);
        return followers;
    }

    async getFollowing(userId: String): Promise<any[]> {
        const following = await this.FollowRepository.getFollowing(userId);
        return following;
    }

    async unFollow(userId: String, targetUserId: String): Promise<any[]> {
        const unfollow = await this.FollowRepository.unFollow(userId, targetUserId);
        return unfollow;
    }
}

module.exports = FollowService;