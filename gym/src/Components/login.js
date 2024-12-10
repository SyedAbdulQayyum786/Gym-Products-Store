import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin, logedinUser } from "../Store/Slices/LoginSlice";
import Header from "./Header";
import axios from "axios";
const LOGIN = () => {
  const email = useRef();
  const password = useRef();
  const nagivate = useNavigate();
  const dispatch = useDispatch();
  const login = (e) => {
    e.preventDefault();
    let obj;
    let arr = [];
    if (email.current.value != "" && password.current.value != "") {
      axios
        .get(
          "https://test-de8ee-default-rtdb.asia-southeast1.firebasedatabase.app/Users.json"
        )
        .then((res) => {
          obj = res.data;
          if (
            email.current.value === "admin@gmail.com" &&
            password.current.value === "admin"
          ) {
            dispatch(userLogin());
            nagivate("/admin");
          } else {
            for (let key in obj) {
              if (obj.hasOwnProperty(key)) {
                arr.push(obj[key]);
              }
            }
            let found = false;
            let user;
            for (let i = 0; i < arr.length; i++) {
              if (
                arr[i].email === email.current.value &&
                arr[i].password === password.current.value
              ) {
                user = arr[i];
                found = true;
                break;
              }
            }
            if (found) {
              alert("found");
              dispatch(userLogin());
              dispatch(logedinUser(user));
              nagivate("/");
            } else {
              alert("not found");
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert("please fill the boxes");
    }
  };

  return (
    <div>
      <Header />
      <div
        className="container d-flex align-items-center justify-content-center vh-50"
        style={{ width: "50%" }}
      >
        <div className="card">
          <div className="card-body">
            <center>
              <h5 className="card-title justify-content-center">LOGIN</h5>
            </center>
            <form>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  ref={email}
                ></input>
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  ref={password}
                ></input>
              </div>
              <center>
                <button
                  type="submit"
                  className="btn btn-dark"
                  onClick={(e) => {
                    login(e);
                  }}
                >
                  LOGIN
                </button>
              </center>
              <div>
                Don't have any account!!
                <Link
                  to="/Register"
                  style={{ color: "blue", textDecoration: "None" }}
                >
                  REGISTER
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LOGIN;
