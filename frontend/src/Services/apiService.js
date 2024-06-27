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

export {postData};