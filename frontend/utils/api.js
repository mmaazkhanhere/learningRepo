import { API_URL, STRAPI_API_TOKEN } from "./urls";

export const fetchDataFromAPi= async (endpoint) =>{
    //endpoint is path to the endpoint of the API

    const options = {
        method: 'GET', //indicates that the request will be GET request
        headers: {
            Authorization: 'Bearer ' + STRAPI_API_TOKEN //an authorisation header containing Strapi token which is the token for the api
        },
    };
    
    const res= await fetch(`${API_URL}${endpoint}`,options); /*used to construct the URL to the API endpoint by combining the URL varibale and uses the fetch method to send a GET request
    to the constructed URL passing the options object as a second argument */
    const data=await res.json(); //uses the json method to extract the JSON data returned by the server
    return data;  //returns the parsed JSON data to the caller of the function
}