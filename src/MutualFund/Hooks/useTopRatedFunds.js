import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";

const useTopRatedFunds = () => {
  const [topRatedFunds, setTopRatedFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch topRated funds data from backend API
  const getTopRatedFunds = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/mutualFunds/topRated-Funds`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch smallcap mutual funds data");
      }

      const data = await response.json();

      setTopRatedFunds(data?.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopRatedFunds();
  }, []);
  return { topRatedFunds, loading, error };
};

export default useTopRatedFunds;
