import {useEffect, useState} from 'react';
import { API_BASE_URL } from '../config';
import { useParams } from 'react-router-dom';
import { setresearchData } from '../Store/Slices/researchData';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'

const ResearchStocksData= ()=>{
    const dispatch = useDispatch()
    const {id}= useParams()
    const [research_stocks_data, setresearchdetails]= useState({})
    const [isLoading, setIsloading]= useState(true)

    useEffect(()=>{
        dispatch(setresearchData(research_stocks_data));

        const token= Cookies.get("jwtToken")

        const stocks_research_data= async ()=>{
            const url= `${API_BASE_URL}/researchstocksdetails/${id}`
            const response= await fetch(url, {
                method: "get",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok === true){
                const data= await response.json()
                setresearchdetails(data)
            }
        }
        setIsloading(false);
        stocks_research_data()

    }, [dispatch])
    return {
        stock_research_stocks_data: research_stocks_data,
        isLoading
    }
};

export default ResearchStocksData;