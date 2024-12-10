import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
import axios from "axios";
export default function Admin() {
  const name = useRef();
  const des = useRef();
  const price = useRef();
  const cat = useRef();
  const image = useRef();
  const navigate = useNavigate();
  const login = useSelector((state) => {
    return state.login.login;
  });
  const add = async (e) => {
    e.preventDefault();
    let url;
    const data = new FormData();
    data.append("file", image.current.files[0]);
    data.append("upload_preset", "gymclound");
    data.append("cloud_name", "dpe7udtwu");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpe7udtwu/image/upload",
        { method: "POST", body: data }
      );
      const clouddata = await res.json();
      url = clouddata.url;
    } catch (error) {
      console.log(error.message);
    }
    const obj = {
      image: url,
      name: name.current.value,
      description: des.current.value,
      price: price.current.value,
      category: cat.current.value,
    };
    axios
      .post(
        "https://test-de8ee-default-rtdb.asia-southeast1.firebasedatabase.app/Products.json",
        obj
      )
      .then((res) => {
        alert("successfully added product");
      })
      .catch((err) => {
        alert("error in adding");
      });
  };
  const viewOrders = () => {
    navigate("/allorders");
  };
  return (
    <div>
      <Header loginState={login} />
      <div
        className="container d-flex align-items-center justify-content-center "
        style={{ width: "50%" }}
      >
        <div className="card h-50 w-50 mt-3">
          <div className="card-body">
            <center>
              <h5 className="card-title justify-content-center">
                Add New Product
              </h5>
            </center>
            <form>
              <div className="mb-3">
                <label>Product Name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  ref={name}
                ></input>
              </div>
              <div className="mb-3">
                <label>Product Description*</label>
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  required
                  ref={des}
                ></input>
              </div>
              <div className="mb-3">
                <label>Product Category*</label>
                <select id="dropdown" name="dropdown" ref={cat}>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="accessories">Accessories</option>
                  <option value="proteins">Protein</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Product-Price*</label>
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  required
                  ref={price}
                ></input>
              </div>
              <div className="mb-3">
                <label>Product-Image*</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  required
                  ref={image}
                ></input>
              </div>

              <center>
                <button
                  className="btn btn-dark"
                  onClick={(e) => {
                    add(e);
                  }}
                >
                  ADD
                </button>
              </center>
              <div className="view-orders mt-2" onClick={viewOrders}>
                <p>View all Orders</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
