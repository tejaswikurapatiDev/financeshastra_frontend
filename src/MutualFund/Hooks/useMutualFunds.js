import { useEffect, useState } from "react";

const useMutualFunds = () => {
  const [allFunds, setAllFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all funds data from backend API
  const getAllFunds = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/mutualFunds/allFunds"
      );
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
