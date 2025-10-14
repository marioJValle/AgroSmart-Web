import { UserRepository } from '../../../data/repositories/userRepository/UserRepository';
import { User } from '../../model/User';

const CreateUser = async (userData) => {
    console.log("CreateUser: Creating a new user with data:", userData);
    const userRepository = new UserRepository();
    const user = new User(userData);
    console.log("CreateUser: User object created:", user);
    await userRepository.addUser(user);
    console.log("CreateUser: User added to repository.");
};

export default CreateUser;
