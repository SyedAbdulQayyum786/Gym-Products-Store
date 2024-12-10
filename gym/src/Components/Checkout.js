import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
export default function Checkout(props) {
  const user = useSelector((state) => state.login.user);
  useEffect(() => {
    axios
      .get(
        `https://test-de8ee-default-rtdb.asia-southeast1.firebasedatabase.app/Cart/${user.firstname}.json`
      )
      .then((res) => {
        const obj = res.data;
        const arr = [];
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            const itemWithId = {
              itemid: key,
              ...obj[key],
            };
            arr.push(itemWithId);
          }
        }
        props.setFunItems(arr);
        const calculatedTotalPrice = arr.reduce(
          (total, item) => total + parseInt(item.price),
          0
        );
        props.setFunPrice(calculatedTotalPrice);
      })
      .catch((err) => {
        alert(`${err.message}`);
      });
  }, [user.firstname, props.items]);
  const back = () => {
    props.setFunCart(false);
  };
  const placeorder = () => {
    axios
      .post(
        `https://test-de8ee-default-rtdb.asia-southeast1.firebasedatabase.app/Orders/${user.firstname}.json`,
        props.items
      )
      .then((res) => {
        alert("Yoour order had been placed successfully");
      })
      .catch((err) => {
        alert(`${err.message}`);
      });
    axios
      .delete(
        `https://test-de8ee-default-rtdb.asia-southeast1.firebasedatabase.app/Cart/${user.firstname}.json`
      )
      .then((res) => {
        props.setFunCart(false);
      })
      .catch((err) => {
        alert(`${err.message}`);
      });
  };
  const removefromcart = (itemid) => {
    axios
      .delete(
        `https://test-de8ee-default-rtdb.asia-southeast1.firebasedatabase.app/Cart/${user.firstname}/${itemid}.json`
      )
      .then((res) => {
        alert("Product removed from cart");
      })
      .catch((err) => {
        alert("error in removing item from cart");
      });
  };

  return (
    <div>
      <div
        className="card check"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="upper" style={{ flex: 1, overflow: "auto" }}>
          <div className="mycart">MY CART</div>
          <ul className="listofobject">
            {props.items.map((item) => (
              <li>
                <div className="item-container">
                  <span className="item-name">{item.name}</span>
                  <span style={{ fontWeight: "bold" }}>
                    Price:RS: {item.price}
                  </span>
                  <span className="item-action">
                    <i
                      className="bi bi-trash bi-size-md"
                      onClick={() => {
                        removefromcart(item.itemid);
                      }}
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="lower"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="d-flex justify-content-start align-items-center">
            <button className="btn btn-dark" onClick={back}>
              Back
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="total">Total price = {props.price}</div>
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <button className="btn btn-dark" onClick={placeorder}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
