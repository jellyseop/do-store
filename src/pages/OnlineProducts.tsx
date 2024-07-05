import { useLocation, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import PageHeader from "../components/mobile/PageHeader";
import { OFFLINE_PRODUCTS } from "../mock";
import { useCallback, useEffect, useState } from "react";
import { delay } from "../util";
import { IProduct } from "../components/ProductList";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

const fetchData = async (
  page: number,
  productType: number
): Promise<IProduct[]> => {
  await delay(1000);
  const data = OFFLINE_PRODUCTS;
  const start = 4 * (page - 1);
  return data.slice(start, start + 4);
};

const OnlineProducts = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  const [page, setPage] = useState<number>(Number(query.get("page")) || 1);
  const [productType, setProductType] = useState<number>(
    Number(query.get("type")) || 0
  );
  const [data, setData] = useState<IProduct[] | null>(null);

  // Update URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("type", productType.toString());
    params.set("page", page.toString());
    navigate({ search: params.toString() }, { replace: true });
  }, [page, productType, navigate]);

  // Fetch data when order or page changes
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData(page, productType);
      setData(fetchedData);
    };
    loadData();
  }, [page, productType]);

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

      <PageHeader title="전체 온라인 상품" />

      <div className="flex justify-between items-center px-6 xl:px-0 mt-3 xl:mt-5  mb-8 xl:mb-12">
        <p className="text-gray-400 ">총 7건</p>
        <div className="flex items-center gap-x-2 text-sm">
          <button
            onClick={() => handleProductTypeChange(0)}
            className={`  ${
              productType === 0 ? " text-yellow-300 font-bold" : "text-gray-300"
            }`}
          >
            인기순
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => handleProductTypeChange(1)}
            className={` ${
              productType === 1 ? "text-yellow-300 font-bold" : "text-gray-300"
            }`}
          >
            높은 가격
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => handleProductTypeChange(2)}
            className={` ${
              productType === 2 ? "text-yellow-300 font-bold" : "text-gray-300"
            }`}
          >
            낮은 가격
          </button>
        </div>
      </div>
      {data ? (
        <>
          <div className="px-6 xl:px-0 grid grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-8">
            {OFFLINE_PRODUCTS.map((product, idx) => (
              <Product idx={idx} product={product} />
            ))}
          </div>
          <div className="w-full px-6 xl:px-0 mt-12 xl:mt-24">
            <Pagination
              handlePageChange={handlePageChange}
              totalPages={Math.ceil(OFFLINE_PRODUCTS.length / 4)}
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

export default OnlineProducts;
