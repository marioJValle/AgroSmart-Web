
import { auth, googleProvider } from '../../../data/database/Firebase';
import { signInWithPopup } from 'firebase/auth';
import { UserRepository } from '../../../data/repositories/userRepository/UserRepository';
import CreateUser from '../userUseCases/CreateUser';

const GoogleAuth = async () => {
  console.log("GoogleAuth: Starting Google authentication...");
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("GoogleAuth: User authenticated with Google:", user);

    const userRepository = new UserRepository();
    console.log(`GoogleAuth: Checking for existing user with email: ${user.email}`);
    const existingUser = await userRepository.getUserByEmail(user.email);
    console.log("GoogleAuth: Existing user found:", existingUser);

    if (!existingUser) {
      console.log("GoogleAuth: No existing user found. Creating new user...");
      await CreateUser({
        id: user.uid,        // ✅ Usa UID, no email
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        phoneNumber: '',
        municipality: '',
        soilTypes: '',
        status: 'activo',
        role: 'Agricultor'
      });
    } else {
      console.log("GoogleAuth: User already exists. Skipping creation.");
    }

    console.log("GoogleAuth: Authentication process finished.");
    return user;
  } catch (error) {
    console.error("GoogleAuth: Error during Google authentication:", error);
    throw error;
  }
};

export default GoogleAuth;
