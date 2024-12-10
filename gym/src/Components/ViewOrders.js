import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "./Header";
import axios from "axios";
export default function ViewOrders() {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        `https://test-de8ee-default-rtdb.asia-southeast1.firebasedatabase.app/Orders.json`
      )
      .then((res) => {
        const ordersArray = Object.entries(res.data).map(
          ([orderPlacer, itemsObj]) => ({
            orderPlacer,
            items: Object.entries(itemsObj).map(([key, value]) => ({
              key,
              value,
            })),
          })
        );
        setOrder(ordersArray);
      })
      .catch((err) => {
        alert(`${err.message}`);
      });
  });
  const back = () => {
    navigate("/admin");
  };
  return (
    <div>
      <Headers />
      <div
        className="card check"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="upper" style={{ flex: 1, overflow: "auto" }}>
          <div className="mycart">All Orders</div>
        </div>
        <ul className="listofobject">
          <ul className="listofobject">
            {order.map(({ orderPlacer, items }) => (
              <div key={orderPlacer} className="order-container">
                <h3 className="order-header">{orderPlacer}</h3>
                <ul className="order-items">
                  {items.map(({ key, value }) => (
                    <li key={key} className="order-item">
                      {value.map((item) => (
                        <span key={item.name} className="item-name1">
                          {item.name}
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </ul>
        <div
          className="lower"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="d-flex justify-content-start align-items-center">
            <button className="btn btn-dark" onClick={back}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
