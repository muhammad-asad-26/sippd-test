import React from "react";

const Total = ({ total, totalItems }) => {
  return (
    <nav className="row">
      <div className="col-3">Total Item: {totalItems}</div>
      <div className="col-3">Total: ${total}</div>
    </nav>
  );
};

export default Total;
