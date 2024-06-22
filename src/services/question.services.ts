interface UserData {
    title: string;
    body: string;
    topics: string[];
    user_id: string;
    createdAt?: Date;
}

interface UserRepository {
    createUser(UserData: UserData): Promise<any>;
    getUser(userId: string): Promise<any>;
    getAllUsers(): Promise<any[]>;
    updateUser(userId: string, updatedData: Partial<UserData>): Promise<any>;
    deleteUser(userId: string): Promise<any>;
}

class UserService {
    private UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async createUser(UserData: UserData): Promise<any> {
        const user = await this.UserRepository.createUser(UserData);
        return user;
    }

    async getUser(userId: string): Promise<any[]> {
        const user = await this.UserRepository.getUser(userId);
        return user;
    }

    async getAllUsers(): Promise<any[]> {
        const users = await this.UserRepository.getAllUsers();
        return users;
    }

    async updateUser(userId: string, updatedData: Partial<UserData>): Promise<any> {
        const user = await this.UserRepository.updateUser(userId, updatedData);
        return user;
    }

    async deleteUser(userId: string): Promise<any> {
        const user = await this.UserRepository.deleteUser(userId);
        return user;
    }
}

module.exports = UserService;