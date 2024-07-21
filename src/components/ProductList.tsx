import React, { useEffect } from "react";
import SectionHeader from "./SectionHeader";
import { convertProductToCartItem, formatMoney } from "../util";
import { ICartItem, IProduct, ProductProps } from "../definitions/ProductTypes";
import { useAuth } from "../AuthProvider";
import { addToCart } from "../lib/cart-Service";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { cartState } from "../atmos";
import { saveCartToLocalStorage } from "../localStorage";

const ListItem: React.FC<
  ProductProps & { user_id: string; setter: SetterOrUpdater<ICartItem[]> }
> = ({ user_id, setter, idx, product }) => {
  const handleAddToCart = () => {
    setter((prevCart) => [
      ...prevCart,
      {
        ...product,
        amount: 1,
      },
    ]);
    try {
      addToCart(user_id, convertProductToCartItem(product, 1));
      alert("장바구니에 담겼습니다.");
    } catch (error) {
      console.error(error);
      alert("장바구니에 담는 데 실패했습니다.");
    }
  };

  return (
    <>
      {/*모바일 아이템*/}
      <li
        id={product.id + ""}
        className="xl:hidden flex items-start py-4 border-b last:border-none last:pb-0 border-gray-200"
      >
        <span className="font-light ml-3">{idx + 1}</span>
        <img
          src={product.img_url}
          alt={product.name}
          className=" w-20 aspect-square ml-7 mr-3"
        />
        <div className="flex flex-1 flex-col justify-between items-start">
          <span className="tracking-wide text-gray-800">{product.name}</span>
          <div className="flex">
            <img
              src="/images/coin-icon.svg"
              alt="coin"
              className="w-4 aspect-square mr-0.5"
            />
            <span className="text-xs text-gray-400">
              {formatMoney(product.price)}
            </span>
          </div>

          <div className="w-full flex justify-end mt-4">
            <button
              onClick={handleAddToCart}
              className="border border-gray-300 px-2 py-1 text-xs text-gray-700"
            >
              + 장바구니 담기
            </button>
          </div>
        </div>
      </li>
      {/*웹 아이템*/}
      <li
        id={product.id + ""}
        className="hidden w-full xl:flex xl:flex-col items-start hover:border border-gray-200 px-2 py-3"
      >
        <img
          src={product.img_url}
          alt={product.name}
          className="w-full aspect-square"
        />
        <button
          onClick={handleAddToCart}
          className="w-full flex justify-center items-center border border-gray-300 mt-2  py-1 text-gray-600 hover:bg-yellow-300"
        >
          <img
            src={"/images/add-to-cart.svg"}
            alt={"add-to-cart"}
            className="w-7 aspect-square mr-2"
          />
          담기
        </button>
        <div className="flex flex-col w-full mt-2">
          <span className="tracking-wide text-gray-600 font-light">
            {product.name}
          </span>
          <div className="flex mt-2">
            <img
              src="/images/do-money.svg"
              alt="coin"
              className="w-4 aspect-square mr-0.5"
            />
            <span className="text-xl font-medium text-gray-800">
              &nbsp;{formatMoney(product.price)}
            </span>
          </div>
        </div>
      </li>
    </>
  );
};

interface ProductListProps {
  title: string;
  desc: string;
  products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ title, desc, products }) => {
  const { currentUser } = useAuth();
  const [cartData, setCartData] = useRecoilState(cartState);

  if (!currentUser) {
    return <div>UnAuthorized</div>;
  }

  useEffect(() => {
    if (cartData.length <= 0) {
      return;
    }
    const syncCartData = (cartData: ICartItem[]) => {
      saveCartToLocalStorage(cartData);
    };

    syncCartData(cartData);
  }, [cartData]);
  return (
    <section className="p-6 mb-4 xl:mb-0 bg-white">
      <SectionHeader
        title={title}
        desc={desc}
        linkTo={
          title == "온라인 상품" ? "/products/online" : "/products/offline"
        }
      />
      {/*모바일 리스트*/}
      <ul className="xl:hidden mt-2">
        {products.map((product, idx) => (
          <ListItem
            key={idx}
            user_id={currentUser.uid}
            setter={setCartData}
            idx={idx}
            product={product}
          />
        ))}
      </ul>
      {/*웹 리스트*/}
      <ul className="hidden xl:grid grid-cols-4 gap-x-4 w-full max-w-5xl mx-auto mt-2 pb-6">
        {products.map((product, idx) => (
          <ListItem
            key={idx}
            user_id={currentUser.uid}
            setter={setCartData}
            idx={idx}
            product={product}
          />
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
