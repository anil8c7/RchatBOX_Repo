import axios from "axios"; 
//create the object of axios with baseurl and set the header 
const client =  axios.create({
baseURL:"http://localhost:3001",
header:{
    'Content-Type':'application/json'
   }
})
 const postData =  async (url,userData)=>{
    try{
        return await client.post(url,userData)
    }catch(error){
        throw error;
    }
}
const getData = async (url) => {
    try {
        const response = await client.get(url);
        return response;
    } catch (error) {
        throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
    }
};
export {postData,getData};