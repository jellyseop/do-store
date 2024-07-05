import { formatMoney } from "../util";
import { ProductProps } from "./ProductList";

const Product: React.FC<ProductProps> = ({
  product: { id, name, price, imageUrl },
}) => {
  return (
    <>
      {/*웹 아이템*/}
      <li id={id + ""} className=" w-full flex flex-col items-start">
        <img src={imageUrl} alt={name} className="w-full aspect-square" />
        <button className="w-full text-sm flex justify-center items-center border border-gray-300 mt-2  py-1.5 text-gray-600 ">
          <img
            src={"/images/add-to-cart.svg"}
            alt={"add-to-cart"}
            className="w-5 aspect-square mr-1"
          />
          담기
        </button>
        <div className="flex flex-col w-full mt-2">
          <span className="tracking-wide text-sm text-gray-600 font-light">
            {name}
          </span>
          <div className="flex mt-1">
            <img
              src="/images/do-money.svg"
              alt="coin"
              className="w-4 aspect-square mr-0.5"
            />
            <span className="font-medium text-gray-800">
              &nbsp;{formatMoney(price)}
            </span>
          </div>
        </div>
      </li>
    </>
  );
};

export default Product;
