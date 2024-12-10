import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../Components/Header";
import Product from "../Components/Product";
import Checkout from "../Components/Checkout";
export default function Layout() {
  const [category, setCategory] = useState("men");
  const [display, setDisplay] = useState([]);
  const [cart, setCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState(0);
  const login = useSelector((state) => {
    return state.login.login;
  });
  useEffect(() => {
    axios
      .get(
        "https://test-de8ee-default-rtdb.asia-southeast1.firebasedatabase.app/Products.json"
      )
      .then((res) => {
        const obj = res.data;
        let arr = [];
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            arr.push(obj[key]);
          }
        }

        setProducts(arr);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <div>
        <Header
          loginState={login}
          setFunCategory={setCategory}
          setFunCart={setCart}
          cart={cart}
        />
      </div>
      {!cart && (
        <div>
          {products.length > 0 ? (
            <Product
              loginState={login}
              products={products}
              category={category}
              display={display}
              setFunDisplay={setDisplay}
            />
          ) : (
            <div className="loading-container">
              <p className="loading-message">Loading products...</p>
            </div>
          )}
        </div>
      )}
      {cart && (
        <div>
          <Checkout
            loginState={login}
           items={items}
           setFunItems={setItems}
           price={price}
           setFunPrice={setPrice}
            setFunDisplay={setDisplay}
            setFunCart={setCart}
            cart={cart}
          />
        </div>
      )}
    </>
  );
}
