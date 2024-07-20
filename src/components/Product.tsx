import { useAuth } from "../AuthProvider";
import { ICartItem, ProductProps } from "../definitions/ProductTypes";
import { addToCart } from "../lib/cart-Service";
import { formatMoney } from "../util";

const Product: React.FC<ProductProps> = ({
  product: { id, name, price, img_url },
}) => {
  const { currentUser } = useAuth();

  const handleAddToCart = async () => {
    if (currentUser) {
      const cartItem: ICartItem = { id, name, price, img_url, amount: 1 };
      try {
        await addToCart(currentUser.uid, cartItem);
        alert("장바구니에 담겼습니다.");
      } catch (error) {
        console.error(error);
        alert("장바구니에 담는 데 실패했습니다.");
      }
    }
  };

  return (
    <>
      {/*웹 아이템*/}
      <li id={id + ""} className=" w-full flex flex-col items-start">
        <img src={img_url} alt={name} className="w-full aspect-square" />
        <button
          onClick={handleAddToCart}
          className="w-full text-sm flex justify-center items-center border border-gray-300 mt-2  py-1.5 text-gray-600 "
        >
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
            <span className="flex flex-row font-medium text-gray-800">
              &nbsp;{formatMoney(price)}
              <img
                src="/images/do-money.svg"
                alt="coin"
                className="w-4 aspect-square ml-1"
              />
            </span>
          </div>
        </div>
      </li>
    </>
  );
};

export default Product;
