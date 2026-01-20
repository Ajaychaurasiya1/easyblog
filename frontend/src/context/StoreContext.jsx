import { createContext } from "react";
import { blogData } from "../assets/assets";
import { useEffect } from "react";
import { useState } from "react";
import axios, { all } from "axios";
import API_BASE_URL from "../config/api";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        const allblogs = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/blog/all`);
                // console.log(res.data);
                // if(res.data.success) {
                //     setBlogData(res.data.blogs);
                // }
                setBlogData(res.data.blogs);
            } catch (error) {
                console.log('Error fetching blogs:', error);
            }
        };
        allblogs();
    }, []);

    const loginUser = (user, token) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const contextValue = { blogData, user, loginUser, logoutUser };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;