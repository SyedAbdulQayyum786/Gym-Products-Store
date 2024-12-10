import React from "react";
const ALLCOM = (props) => {
  const handleClick = (s) => {
    props.setFunCategory(s);
  };
  return (
    <div className="card">
      <div className="card-body display-flex justify-content-center">
        <center>
          <div className="header2 justify-content-between">
            <div
              className="text1"
              onClick={() => {
                handleClick("men");
              }}
            >
              MEN
            </div>
            <div
              className="text1"
              onClick={() => {
                handleClick("women");
              }}
            >
              WOMEN
            </div>
            <div
              className="text1"
              onClick={() => {
                handleClick("accessories");
              }}
            >
              ACCESSORIES
            </div>
            <div
              className="text1"
              onClick={() => {
                handleClick("proteins");
              }}
            >
              PROTEIN
            </div>
          </div>
        </center>
      </div>
    </div>
  );
};
export default ALLCOM;
