import { useLocation } from "react-router-dom";
import { generatePagination } from "../util";
import clsx from "clsx";

interface IPagination {
  totalPages: number;
  handlePageChange: (newPage: number) => void;
}
export default function Pagination({
  totalPages,
  handlePageChange,
}: IPagination) {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="inline-flex">
        <div className="flex">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                handlePageChange={handlePageChange}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  handlePageChange,
  isActive,
  position,
}: {
  page: number | string;
  handlePageChange: (newPage: number) => void;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-14 w-14 items-center justify-center font-light",
    {
      "z-10 bg-yellow-300 bg-opacity-70  text-gray-700": isActive,
      "": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <button
      onClick={() => handlePageChange(Number(page))}
      className={className}
    >
      {page}
    </button>
  );
}
