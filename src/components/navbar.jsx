import React from "react";

// Stateless Functional Component

const NavBar = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="navbar-brand">
        <i className="fa fa-shopping-cart fa-lg m-2" aria-hidden="true" />
        Items
      </div>
    </nav>
  );
};

export default NavBar;
