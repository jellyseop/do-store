import { SetterOrUpdater } from "recoil";
import { ICartItem, ProductProps } from "../definitions/ProductTypes";
import { addToCart } from "../lib/cart-Service";
import { convertProductToCartItem, formatMoney } from "../util";
import { saveCartToLocalStorage } from "../localStorage";

const Product: React.FC<
  ProductProps & { user_id: string; setter: SetterOrUpdater<ICartItem[]> }
> = ({ user_id, setter, product }) => {
  const handleAddToCart = () => {
    setter((prevCart) => {
      if (prevCart.length >= 5) {
        alert("장바구니 최대개수는 5개 입니다.");
        return prevCart;
      }

      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      let updatedCart;
      if (existingItemIndex >= 0) {
        updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          amount: updatedCart[existingItemIndex].amount + 1,
        };
      } else {
        const newItem = { ...product, amount: 1 };
        updatedCart = [...prevCart, newItem];
      }

      saveCartToLocalStorage(updatedCart);

      try {
        addToCart(user_id, convertProductToCartItem(product, 1));
        alert("장바구니에 담겼습니다.");
      } catch (error) {
        console.error(error);
        alert("장바구니에 담는 데 실패했습니다.");
      }

      return updatedCart;
    });
  };

  return (
    <>
      {/*웹 아이템*/}
      <li id={product.id + ""} className=" w-full flex flex-col items-start">
        <img
          src={product.img_url}
          alt={product.name}
          className="w-full aspect-square"
        />
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
            {product.name}
          </span>
          <div className="flex mt-1">
            <span className="flex flex-row font-medium text-gray-800">
              &nbsp;{formatMoney(product.price)}
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
