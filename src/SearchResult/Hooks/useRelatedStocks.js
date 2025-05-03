import { useSelector } from "react-redux";

const useRelatedStocks = (currentStock) => {
  const allStocks = useSelector((store) => store.searchData.searchData);

  //handle empty result
  if (!currentStock || !currentStock.sector) return [];

  const relatedStocks = allStocks.filter((stock) => {
    return (
      stock.sector === currentStock.sector &&
      stock.symbol !== currentStock.symbol
    );
  });
  return relatedStocks;
};

export default useRelatedStocks;
