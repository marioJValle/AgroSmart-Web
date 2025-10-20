import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../../data/database/Firebase';
import { UserRepository } from '../../data/repositories/userRepository/UserRepository';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("UserContext: Setting up onAuthStateChanged listener.");
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            console.log("UserContext: onAuthStateChanged event fired.");
            if (firebaseUser) {
                console.log("UserContext: Firebase user is present:", firebaseUser);
                const userRepository = new UserRepository();

                console.log(`UserContext: Attempting to fetch user by UID field: ${firebaseUser.uid}`);
                let userDetails = await userRepository.getUserByUid(firebaseUser.uid);

                if (!userDetails) {
                    console.log("UserContext: User not found by UID. Attempting to fetch by email...");
                    userDetails = await userRepository.getUserByEmail(firebaseUser.email);
                }

                setUser(userDetails);
            } else {
                console.log("UserContext: No Firebase user. Setting user state to null.");
                setUser(null);
            }
            console.log("UserContext: Setting loading to false.");
            setLoading(false);
        });

        return () => {
            console.log("UserContext: Cleaning up onAuthStateChanged listener.");
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};