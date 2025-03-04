import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";

const useMutualFunds = () => {
  const [allFunds, setAllFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all funds data from backend API
  const getAllFunds = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/mutualFunds/allFunds`);
      if (!response.ok) {
        throw new Error("Failed to fetch mutual funds data");
      }
      const data = await response.json();
      setAllFunds(data?.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFunds();
  }, []);

  return { allFunds, loading, error };
};

export default useMutualFunds;
