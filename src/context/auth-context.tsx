import React, { createContext, useCallback, useContext, useState } from "react";

import api from "../services/api";

interface Account {
    id: string;
    username: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface AuthContextData {
    account: Account;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    signUp(credentials: SignUpCredentials): void;
}

interface AuthState {
    token: string;
    account: Account;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@linkin:token');
        const account = localStorage.getItem('@linkin:username');

        if (token && account) {
            return { token, account: JSON.parse(account) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
        const response = await api.post('sessions', {
            email,
            password
        });

        const { token, account } = response.data;

        localStorage.setItem('@linkin:token', token);
        localStorage.setItem('@linkin:username', JSON.stringify(account.username));

        setData({ token, account })
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@linkin:token');
        localStorage.removeItem('@linkin:username');

        setData({} as AuthState)
    }, [])

    const signUp = useCallback(async ({
        username,
        email,
        password
    }: SignUpCredentials) => {
        await api.post('accounts', {
            username,
            email,
            password
        });

    }, []);

    return (
        <AuthContext.Provider value={{
            account: data.account,
            signIn,
            signOut,
            signUp,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };