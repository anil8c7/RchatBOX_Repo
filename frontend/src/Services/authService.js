import {postData} from './apiService';

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
export {signin,signup};