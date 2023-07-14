import React from "react";

export interface UserLoginData{
    email: string;
    password: string;
}

export interface UserLoginDataResponse{
    access_token: string;
}

interface AuthContextType {
    user: UserLoginDataResponse | null;
    signin: (user: UserLoginDataResponse, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children } : { children: React.ReactNode }) {
    let [user, setUser] = React.useState<UserLoginDataResponse | null>(null!);
    
    let signin = (newUser : UserLoginDataResponse, callback: VoidFunction) => {
        setUser(newUser);
        return callback();
    };

    let signout = (callback: VoidFunction) => {
        setUser(null);
        return callback();
    };

    let value = {user, signin, signout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;