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
    const [research_balancesheet, setresearch_balancesheet]= useState([])
    const [R_D_investment, setR_D_investment]= useState([])
    const [cash_flow, setcash_flow]= useState([])
    const [details, setdetails]= useState([])
    const [financeial_ratios, setfinanceial_ratios]= useState([])
    const [income_statement, setincome_statement]= useState([])
    const [key_metrics, setkey_metrics]= useState([])
    const [performance_metrics, setperformance_metrics]= useState([])
    const [revenue_mix, setrevenue_mix]= useState([])

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
                /*setresearch_balancesheet(data.balancesheet)
                setR_D_investment(data.R_D_investment)
                setcash_flow(data.cash_flow)
                setdetails(data.details)
                setfinanceial_ratios(data.financeial_ratios)
                setincome_statement(data.income_statement)
                setkey_metrics(data.key_metrics)
                setperformance_metrics(data.performance_metrics)
                setrevenue_mix(data.revenue_mix)*/
            }
        }
        stocks_research_data()

    }, [dispatch])
    return {
        stock_research_stocks_data: research_stocks_data,
        /*stock_balancesheet: research_balancesheet, 
        stock_R_D_investment: R_D_investment,
        stock_cash_flow: cash_flow,
        stock_details: details,
        stock_financeial_ratios: financeial_ratios,
        stock_income_statement: income_statement,
        stock_key_metrics: key_metrics,
        stock_performance_metrics: performance_metrics,
        stock_revenue_mix: revenue_mix*/
    }
};

export default ResearchStocksData;