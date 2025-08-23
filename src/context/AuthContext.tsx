import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User } from '../types';
import { AuthService } from '../services/auth.service';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    register: (user: Partial<User>) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    update: (user: Partial<User>) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isAuthenticated = !!user && !!token;

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = getCookie('authToken');
            const storedUser = getCookie('authUser');

            if (storedToken && storedUser) {
                try {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                    const user = await AuthService.profile();
                    if (user) {
                        setUser(user);
                    }
                } catch (error) {
                    console.error("Failed to parse stored user:", error);
                    deleteCookie('authToken');
                    deleteCookie('authUser');
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const register = async (data: Partial<User>) => {
        setIsLoading(true);
        try {
            const response = await AuthService.register(data);
            console.log('Register response:', response); // Debug log
            if (response) {
                setUser(response.user);
                setToken(response.token);
                setCookie('authToken', response.token);
                setCookie('authUser', JSON.stringify(response.user));
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await AuthService.login(email, password);
            console.log('Login response:', response); // Debug log
            if (response) {
                setUser(response.user);
                setToken(response.token);
                setCookie('authToken', response.token);
                setCookie('authUser', JSON.stringify(response.user));
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        deleteCookie('authToken');
        deleteCookie('authUser');
    };

    const update = async (data: Partial<User>) => {
        setIsLoading(true);
        try {
            const updatedUser = await AuthService.update(data);
            if (updatedUser) {
                setUser(updatedUser);
                setCookie('authUser', JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Update error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const contextValue: AuthContextType = {
        user,
        token,
        isLoading,
        isAuthenticated,
        register,
        login,
        logout,
        update,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
