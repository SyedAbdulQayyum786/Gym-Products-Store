import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../Store/Slices/LoginSlice";
import ALLCOM from "./Allcom";
import { useLocation } from "react-router-dom";
const Header = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {}, [props.cart]);
  const isFrontPage = location.pathname === "/";
  const logout = () => {
    dispatch(userLogout());
    props.setFunCart(false);
  };
  const handleCart = () => {
    if (props.cart === false) {
      props.setFunCart(true);
    } else if (props.cart === true) {
      props.setFunCart(false);
    }
  };
  return (
    <div>
      <div className="header justify-content-between">
        <div>
          <Link className="logo" to="/">
            FitSynergy
          </Link>
        </div>
        <div className="slogan">NEVERGIVEUP!</div>
        {!props.loginState && (
          <div className="login">
            <Link
              style={{ color: "white", textDecoration: "None" }}
              to="/login"
            >
              LOGIN \
            </Link>
            <Link
              style={{ color: "white", textDecoration: "None" }}
              to="/register"
            >
              REGISTER
            </Link>
          </div>
        )}
        {props.loginState && (
          <div>
            <i
              className="bi bi-cart-plus cart me-5 bi-size-lg"
              onClick={handleCart}
            ></i>
            <Link
              onClick={logout}
              style={{ color: "white", textDecoration: "None" }}
              to="/"
            >
              Logout
            </Link>
          </div>
        )}
      </div>

      {isFrontPage && <ALLCOM setFunCategory={props.setFunCategory} />}
    </div>
  );
};
export default Header;
