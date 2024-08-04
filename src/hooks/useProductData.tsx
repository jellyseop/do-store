import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IProduct } from "../definitions/ProductTypes";
import getFirestoreProducts from "../lib/getFirestoreProducts";

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
    Number(query.get("order")) || 1
  );
  const [data, setData] = useState<IProduct[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCounts, setTotalCounts] = useState<number>(0);

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
      const result = await getFirestoreProducts({
        productType,
        productOrder,
        currentPage: page,
      });
      if (!result.ok) {
        console.error(result.error);
        return;
      }
      setData(result.data);
      setTotalPages(result.totalPages);
      setTotalCounts(result.totalCounts);
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
    totalCounts,
    totalPages,
    page,
    productType,
    productOrder,
    handlePageChange,
    handleProductTypeChange,
    handleProductOrderChange,
  };
};

export default useProductData;
