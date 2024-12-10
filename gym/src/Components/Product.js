import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Product = (props) => {
  const user = useSelector((state) => {
    return state.login.user;
  });

  useEffect(() => {
    const filterArray = props.products.filter((item) => {
      return item.category === props.category;
    });
    props.setFunDisplay(filterArray);
  }, [props.category]);

  const addtocart = (item) => {
    axios
      .post(
        `https://test-de8ee-default-rtdb.asia-southeast1.firebasedatabase.app/Cart/${user.firstname}.json`,
        item
      )
      .then((res) => {
        alert("Item successfully added to cart");
      })
      .catch((err) => {
        alert("Error in adding item to cart");
      });
  };

  return (
    <div className="row m-5 justify-content-between">
      {props.display.map((item, index) => (
        <div key={index} className="col-md-3 mb-4">
          <div className="card" style={{ height: "400px" }}>
            <img
              src={item.image}
              className="card-img-top"
              alt="Product"
              style={{ objectFit: "contain", height: "200px" }}
            />
            <div
              className="card-body"
              style={{ maxHeight: "150", overflowY: "auto", height: "150px" }}
            >
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
            </div>
            <div className="card-footer">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Price: RS: {item.price}</li>
              </ul>
              <div className="card-body">
                {props.loginState && (
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      addtocart(item);
                    }}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
