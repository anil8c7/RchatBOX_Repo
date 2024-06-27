import {postData} from './apiService';

const signin = async (data)=>{
try {
    const response =await postData('/admin/signin',data);
    if(response.headers['x-uid']){
    
    }
    return response.data;
} catch (error) {
    throw error;
}}
const signup = async (data)=>{
    try {
        const response = await postData('/admin/signup',data);
        return response.data;
    } catch (error) {
        throw error;
    }}
export {signin,signup};