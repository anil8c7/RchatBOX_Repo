import {postData,getData} from './apiService';

const signin = async (data)=>{
try {
    const response =await postData('/signin',data);
    if(response.headers['x-uid']){
        localStorage.setItem("uid",response.headers['x-uid']);
    }
    return response.data;
} catch (error) {
    throw error;
}}
const signup = async (data)=>{
    try {
        const response = await postData('/signup',data);
        return response.data;
    } catch (error) {
        throw error;
    }}
    const getUserchats =  async(userId)=>{
        try {
            const response =  await getData(`/chat/getUserchats/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    const createChats =  async (data) =>{
        try {
            const response  = await postData(`/chat/createChat`,data);
            return response.data;
        } catch (error) {
            throw error
        }
    }
    const getUsersOnSearch =  async (query) =>{
        try {
            const response =  await getData(`/chat/getUsersOnSearch/${query}`);
            return response.data;
        } catch (error) {
            throw error
        }
    }
export {signin,signup,getUserchats,createChats,getUsersOnSearch};

