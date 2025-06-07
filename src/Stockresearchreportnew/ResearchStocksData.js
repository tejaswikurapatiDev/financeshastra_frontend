// useResearchStocksData.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { setresearchData } from '../Store/Slices/researchData';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

const useResearchStocksData = (apiUrl) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [research_stocks_data, setresearchdetails] = useState({});
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    const token = Cookies.get("jwtToken");

    const stocks_research_data = async () => {
      try {
        const url = `${apiUrl}/researchstocksdetails/${id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setresearchdetails(data);
          dispatch(setresearchData(data));
        }
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      } finally {
        setIsloading(false);
      }
    };

    stocks_research_data();
  }, [dispatch, apiUrl, id]);

  return {
    stock_research_stocks_data: research_stocks_data,
    isLoading,
  };
};

export default useResearchStocksData;
