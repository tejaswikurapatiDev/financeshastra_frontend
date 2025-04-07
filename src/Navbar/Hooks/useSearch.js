import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { API_BASE_URL } from "../../config";
import { setSearchData } from "../../Store/Slices/searchDataSlice";

const useSearch = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((store) => store.searchData.searchData);
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/search/allInfo`);
      const data = await res.json();
      console.log("from use searchHook", data);
      if (res.ok) {
        dispatch(setSearchData(data.data || []));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (searchData.length === 0) {
      fetchData();
    }
  }, [fetchData, searchData.length]);
};

export default useSearch;
