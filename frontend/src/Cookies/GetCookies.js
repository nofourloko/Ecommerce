import axios from "axios"

export default async function getCookie(){
    try{
        const getCookie = await axios.get("/getCookie")
        return getCookie.data
    }catch(err){
        console.log(err)
    }
}