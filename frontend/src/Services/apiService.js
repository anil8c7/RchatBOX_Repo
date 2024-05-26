import axios from "axios"; 
const API_URL =  "http://localhost:3001";
 const signup =  async (userData)=>{
    try{
        return await  axios.post(`${API_URL}/signup`,userData)
    }catch(error){
        throw error;
    }
}

const signin = async (userData)=>{
    try {
    return await axios.post(`${API_URL}/signin`,userData)
    } catch (error) {
        throw error;
    }
}
export {signup,signin};