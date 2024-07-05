import { useLocation, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import PageHeader from "../components/mobile/PageHeader";
import { OFFLINE_PRODUCTS } from "../mock";
import { useCallback, useEffect, useState } from "react";
import { delay } from "../util";
import { IProduct } from "../components/ProductList";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

const fetchData = async (page: number): Promise<IProduct[]> => {
  await delay(1000);
  const data = OFFLINE_PRODUCTS;
  const start = 4 * (page - 1);
  return data.slice(start, start + 4);
};

const OfflineProducts = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IProduct[] | null>(null);

  // Initialize state from URL query parameters
  useEffect(() => {
    const initialPage = Number(query.get("page")) || 1;
    setPage(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    navigate({ search: params.toString() }, { replace: true });
  }, [page, navigate]);

  // Fetch data when order or page changes
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData(page);
      setData(fetchedData);
    };
    loadData();
  }, [page]);

  // Debounced state change handler to avoid excessive fetch calls

  const handlePageChange = useCallback(
    (newPage: number) => setPage(newPage),
    []
  );

  return (
    <div className="xl:max-w-5xl xl:mx-auto w-full">
      {/*전체 오프라인 상품 페이지 헤더 */}

      <PageHeader title="전체 오프라인 상품" />

      <p className="px-6 xl:px-0 text-gray-400 -mt-3 mb-8 xl:mt-5 xl:mb-12">
        총 7건
      </p>
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

export default OfflineProducts;
