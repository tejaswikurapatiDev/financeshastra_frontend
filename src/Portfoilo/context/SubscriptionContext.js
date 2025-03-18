import React, { createContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import Cookies from 'js-cookie'

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = ({ children }) => {
  const [issubscribed, setisSubed]= useState(false)
  

 useEffect(() => {
     const CookieToken= Cookies.get('jwtToken')
     const fetchdata= async ()=>{
       const options= {
         method: "GET",
         headers:{
           "Authorization": `Bearer ${CookieToken}`
         }
       }
       const url= `http://localhost:3000/userPayment/usertoken`
      
       try {
        const response = await fetch(url, options);
        const data = await response.json(); // Convert response to JSON
        console.log(data); // Log the actual response data
        console.log("data length:", data.length)
        if (data.length===0){
          setisSubed(false)
          console.log(false)
        }else{
          setisSubed(true)
          console.log(true)
        }
        
      } catch (error) {
        console.error("Error fetching user payment details:", error);
      }
     }
     fetchdata()
        
      }, []);

  

  return (
    <SubscriptionContext.Provider value={{ issubscribed }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
