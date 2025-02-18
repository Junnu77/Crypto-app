import axios from "axios"

export const register = async (userData) => {
    const response = await axios.post('/api/user/register',userData);
    localStorage.setItem("user",JSON.stringify(response.data));
    return response.data;
};
export const login = async (userData) => {
    const response = await axios.post('/api/user/login',userData);
    localStorage.setItem("user",JSON.stringify(response.data));
    return response.data;
};