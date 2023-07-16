const axios = require('axios');
import { AuthLogout } from "./auth_helper"

const WebServiceRequest = async (DATA, URL) => {

    const token = localStorage.getItem("token")
    const data = JSON.stringify(DATA)
    const hostname = window.location.hostname === "localhost" ? process.env.REACT_APP_LOCAL_API_URL : process.env.REACT_APP_PUBLIC_API_URL

    var config = {
        method: 'post',
        url: `${hostname}:5900/api/${URL}`,
        headers: { 
          'token': `${token && token}`,
          'apikey': `${process.env.REACT_APP_APIKEY}`, 
          'Content-Type': 'application/json'
        },
        data : data
    };
      
    const response = await axios(config).then(function (response) {
        return response.data
    })

    .catch(function (error) {
        console.log(error);
        return error
    });

    if ( response.RESULT == "0") { AuthLogout(); } 
    
    return response ? response : error
}

export default WebServiceRequest

