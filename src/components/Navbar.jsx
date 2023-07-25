import React, { useRef } from "react";

import { Container, } from "reactstrap";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/login",
    display: "Login",
  },
  
];

const checkIsLogin = !!localStorage.getItem("token");


const Navbar = () => {
  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  const userId = localStorage.getItem("user_id");

  return (
    <header className="header">
     

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between px-10">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
                {checkIsLogin && <NavLink
                  to={`/user/car/${userId}`}
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__item" : "nav__item"
                  }
                  key="Your Cars"
                >
                  Your Cars
                </NavLink>}
              </div>
            </div>

         
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
