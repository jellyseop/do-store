import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../components/mobile/PageHeader";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import { IProduct } from "../definitions/ProductTypes";
import { searchProducts } from "../lib/Search-service";

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  const searchQuery = query.get("query") || "";
  const [page, setPage] = useState<number>(Number(query.get("page")) || 1);
  const [productType, setProductType] = useState<number>(
    Number(query.get("type")) || 1
  );
  const [data, setData] = useState<IProduct[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCounts, setTotalCounts] = useState<number>(0);

  // Update URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("query", searchQuery);
    params.set("type", productType.toString());
    params.set("page", page.toString());
    navigate({ search: params.toString() }, { replace: true });
  }, [page, searchQuery, productType, navigate]);

  // Fetch data when query, type, or page changes
  useEffect(() => {
    const loadData = async () => {
      const result = await searchProducts({
        productType,
        currentPage: page,
        tags: [searchQuery],
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
  }, [page, searchQuery, productType]);

  // Debounced state change handler to avoid excessive fetch calls

  const handlePageChange = useCallback(
    (newPage: number) => setPage(newPage),
    []
  );

  const handleProductTypeChange = useCallback((type: number) => {
    setPage(1); // Reset to first page when type changes
    setProductType(type);
  }, []);

  return (
    <div className="xl:max-w-5xl xl:mx-auto w-full">
      {/*전체 온라인 상품 페이지 헤더 */}

      <PageHeader title={`'${searchQuery}' 에 대한 검색결과`} />

      <div className="flex justify-between items-center px-6 xl:px-0 mt-3 xl:mt-5  mb-8 xl:mb-12">
        <p className="text-gray-400 ">총 {totalCounts}건</p>
        <div className="flex items-center gap-x-2 text-sm">
          <button
            onClick={() => handleProductTypeChange(1)}
            className={`  ${
              productType === 1 ? " text-yellow-300 font-bold" : "text-gray-300"
            }`}
          >
            온라인
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => handleProductTypeChange(2)}
            className={` ${
              productType === 2 ? "text-yellow-300 font-bold" : "text-gray-300"
            }`}
          >
            오프라인
          </button>
        </div>
      </div>
      {data ? (
        <>
          <div className="px-6 xl:px-0 grid grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-8">
            {data.map((product, idx) => (
              <Product key={product.id} idx={idx} product={product} />
            ))}
          </div>
          <div className="w-full px-6 xl:px-0 mt-12 xl:mt-24">
            <Pagination
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center mt-36 xl:mt-44 ">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
