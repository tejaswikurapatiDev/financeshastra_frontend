import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";

const useSmallCapFunds = () => {
  const [smallCapfunds, setSmallCapFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch small cap funds data from backend API
  const getSmallCapFunds = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/mutualFunds/smallCap-Funds`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch smallcap mutual funds data");
      }

      const data = await response.json();
      // console.log(data)
      setSmallCapFunds(data?.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSmallCapFunds();
  }, []);

  return { smallCapfunds, loading, error };
};

export default useSmallCapFunds;
