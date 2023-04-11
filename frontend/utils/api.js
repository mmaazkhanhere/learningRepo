import { API_URL, STRAPI_API_TOKEN } from "./urls";

export const fetchDataFromApi = async (endpoint) => {
    //endpoint is path to the endpoint of the API

    const options = {
        method: 'GET', //indicates that the request will be GET request
        headers: {
            Authorization: 'Bearer ' + STRAPI_API_TOKEN //an authorisation header containing Strapi token which is the token for the api
        },
    };
    
    const res = await fetch(`${API_URL}${endpoint}`, options); /*used to construct the URL to the API endpoint by combining the URL varibale and uses the fetch method to send a GET request
    to the constructed URL passing the options object as a second argument */
    const data = await res.json(); //uses the json method to extract the JSON data returned by the server
    
    return data;  //returns the parsed JSON data to the caller of the function
}

export const makePaymentRequest = async (endpoint, payload) => {//takes two arguments, an endpoint and a payload
    const res = await fetch(`${API_URL}${endpoint}`, { /*uses the fetch method to make a POST request to an API endpoint constructed from the API_URL
    constan and the endpoint argument */
        method: "POST",
        headers: {
            Authorization: "Bearer " + STRAPI_API_TOKEN,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), //payload argument is converted to a JSON string and included as the body of the request
    });
    const data = await res.json();
    return data;
};