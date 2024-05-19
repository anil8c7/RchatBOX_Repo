import axios from "axios"; 
const API_URL =  "http://localhost:3001";
export const signup =  async (userData)=>{
    try{
        return await  axios.post(`${API_URL}/signup`,userData)
    }catch(error){
        throw error;
    }
}