import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IProduct } from "../components/ProductList";
import { delay } from "../util";
import { OFFLINE_PRODUCTS } from "../mock";

const fetchData = async (
  productType: number,
  page: number,
  productOrder?: number
): Promise<IProduct[]> => {
  console.log("productType: " + productType);
  console.log("page: " + page);
  console.log("productOrder: " + productOrder);

  await delay(1000);
  const data = OFFLINE_PRODUCTS; // Replace with your actual data source
  const start = 4 * (page - 1);
  return data.slice(start, start + 4);
};

const useProductData = (defaultProductType: number | null = null) => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  const [page, setPage] = useState<number>(Number(query.get("page")) || 1);
  const [productType, setProductType] = useState<number>(
    defaultProductType !== null
      ? Number(query.get("type")) || defaultProductType
      : 0
  );
  const [productOrder, setProductOrder] = useState<number>(
    Number(query.get("order")) || 0
  );
  const [data, setData] = useState<IProduct[] | null>(null);

  // Update URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("order", productOrder.toString());
    navigate({ search: params.toString() }, { replace: true });
  }, [page, productType, productOrder, defaultProductType, navigate]);

  // Fetch data when query, type, or page changes
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData(productType, page, productOrder);
      setData(fetchedData);
    };
    loadData();
  }, [page, productOrder, productType]);

  const handlePageChange = useCallback(
    (newPage: number) => setPage(newPage),
    []
  );
  const handleProductTypeChange = useCallback((type: number) => {
    setPage(1); // Reset to first page when type changes
    setProductType(type);
  }, []);
  const handleProductOrderChange = useCallback((order: number) => {
    setPage(1); // Reset to first page when order changes
    setProductOrder(order);
  }, []);

  return {
    data,
    page,
    productType,
    productOrder,
    handlePageChange,
    handleProductTypeChange,
    handleProductOrderChange,
  };
};

export default useProductData;
