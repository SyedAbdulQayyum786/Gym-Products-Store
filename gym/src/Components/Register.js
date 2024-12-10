import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
const REGISTER = (e) => {
  const fname = useRef();
  const lname = useRef();
  const email = useRef();
  const password = useRef();
  const phone = useRef();
  const register = (e) => {
    const obj = {
      firstname: fname.current.value,
      lastname: lname.current.value,
      email: email.current.value,
      phone: phone.current.value,
      password: password.current.value,
    };
    if (
      fname.current.value !== "" &&
      lname.current.value !== "" &&
      email.current.value !== "" &&
      phone.current.value !== "" &&
      password.current.value !== ""
    ) {
      axios
        .post(
          "https://test-de8ee-default-rtdb.asia-southeast1.firebasedatabase.app/Users.json",
          obj
        )
        .then((res) => {
          alert("user registered successfully");
          fname.current.value = "";
          lname.current.value = "";
          email.current.value = "";
          phone.current.value = "";
          password.current.value = "";
        })
        .catch((err) => {
          alert(`could not register user${err.message}`);
        });
    } else {
      alert("please fill the boxes");
    }
    e.preventDefault();
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
              <h5 className="card-title justify-content-center">Register</h5>
            </center>
            <form>
              <div className="mb-3">
                <label>FirstName*</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  ref={fname}
                ></input>
              </div>
              <div className="mb-3">
                <label>LastName*</label>
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  required
                  ref={lname}
                ></input>
              </div>
              <div className="mb-3">
                <label>Email*</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  ref={email}
                ></input>
              </div>
              <div className="mb-3">
                <label>MobileNumber*</label>
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  required
                  ref={phone}
                ></input>
              </div>
              <div className="mb-3">
                <label>Password*</label>
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
                    register(e);
                  }}
                >
                  Register
                </button>
              </center>
              <div>
                Already had an account!!
                <Link
                  to="/Login"
                  style={{ color: "blue", textDecoration: "None" }}
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default REGISTER;
