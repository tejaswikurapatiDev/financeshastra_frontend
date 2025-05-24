import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import Cookies from 'js-cookie';


const useSubscriptionDetails = () => {
    const [loading, setisLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeplan, setactiveplan]= useState("")

    // Fetch small cap funds data from backend API
    const getSubscriptionDetails = async () => {
        const CookieToken = Cookies.get("jwtToken");
        if (CookieToken) {
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${CookieToken}`,
                },
            };
            const url = `${API_BASE_URL}/userPayment/usertoken`;

            try {
                const response = await fetch(url, options);
                const data = await response.json(); // Convert response to JSON

                if (data.length !== 0) {
                    const formatedData = data.map((e) => ({
                        planId: e.plan_id,
                        endingDate: e.ending_date,
                        paymentDate: e.payment_date_time,
                        billingCycle: e.billing_cycle

                    }))
                    const lastpayed = formatedData.length - 1
                    console.log("SUBSCRIPTIONDETAILS: ", formatedData[lastpayed].planId)
                    setactiveplan(formatedData[lastpayed].planId)

                    /*if (formatedData[lastpayed].planId === 1 & formatedData[lastpayed].billingCycle === "half yearly") {
                        setpricePayed("1,999")
                    } else if (formatedData[lastpayed].planId === 1 & formatedData[lastpayed].billingCycle === 'yearly') {
                        setpricePayed("3,999")
                    } else if (formatedData[lastpayed].planId === 2 & formatedData[lastpayed].billingCycle === 'yearly') {
                        setpricePayed("7,999")
                    } else if (formatedData[lastpayed].planId === 1 & formatedData[lastpayed].billingCycle === "half yearly") {
                        setpricePayed("5,999")
                    }*/
                }
                setisLoading(false);
            } catch (error) {
                console.error("Error fetching user payment details:", error);
            }

        }
    };

    useEffect(() => {
        getSubscriptionDetails();
    }, []);

    return {activeplan, loading, error };
};

export default useSubscriptionDetails;
