import React, { createContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext(null);

// Create a UserProvider component to wrap your application
export const UserProvider = ({ children }) => {
    const [userRecord, setUserRecord] = useState(null);

    // Function to set the user record
    const setUser = (user) => {
        setUserRecord(user);
    };

    return (
        <UserContext.Provider value={{ userRecord, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook to consume the UserContext
export const useUser = () => React.useContext(UserContext);
