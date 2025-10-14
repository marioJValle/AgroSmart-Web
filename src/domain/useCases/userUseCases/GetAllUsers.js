
export class GetAllUsers {
    constructor(userManagementRepository) {
        this.userManagementRepository = userManagementRepository;
    }

    async execute() {
        return await this.userManagementRepository.getAll();
    }
}