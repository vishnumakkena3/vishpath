import {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const checkAuthStatus = async() => {
        const token = localStorage.getItem('token');

        if(!token){
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        try{
            const response = await axios.get('https://https://backend-for-vishpath.onrender.com/protected', {
                headers: {Authorization: `Bearer ${token}`}
            });
            setIsAuthenticated(true);
            setUser({ token, ...response.data.user});
        }catch(error){
            localStorage.removeItem('token');
            console.log("Error occurred", error);
            setIsAuthenticated(false);
            setUser(null);
        }finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        checkAuthStatus();
        window.addEventListener('storage', checkAuthStatus);
        return () => window.removeEventListener('storage', checkAuthStatus);
    
    }, []);
    const login = (token)=>{
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUser({ token });
    };
    const logout = (token)=>{
        localStorage.removeItem(token);
        setIsAuthenticated(false);
        setUser(null);
    };
    return(
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, checkAuthStatus, user }}>
        {children}
        </AuthContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);