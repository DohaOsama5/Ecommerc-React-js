
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import TopBar from './TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal, logoutUser } from '../redux/CartSlice';

function Header() {
  const dispatch = useDispatch();
  const { totalItems, isAuthenticated } = useSelector((state) => state.cart);

  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const localName = localStorage.getItem('name');

  useEffect(() => {
    dispatch(getCartTotal());
  }, []);

  const handleLinkClick = () => {
    setIsLinkClicked(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('signUp');
    dispatch(logoutUser());
    setRedirect(true); 
  };

  return (
    <>
      {redirect && <Link to="/login" />}

      <div className="container-fluid fixed-top">
        <TopBar />
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="/" className="navbar-brand">
              <h1 className="text-primary display-6">Fruitables</h1>
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary"></span>
            </button>
            <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <Link to="/" className="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/shop-details" className="nav-item nav-link active">
                  Shop Details
                </Link>
                  <Link to="/WhisList" className="nav-item nav-link active">
                  WhisList
                </Link>
                <Link to="/contact" className="nav-item nav-link">
                  Contact
                </Link>
              </div>
              <div className="d-flex m-3 me-0">
                <Link to="/cart" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x"></i>
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: '-5px', left: '15px', height: '20px', minWidth: '20px' }}
                  >
                    {totalItems}
                  </span>
                </Link>
                {localName && isLinkClicked ? (
                  <>
                    <span className="my-auto">Welcome, {localName}</span>
                    <button className="btn btn-link" onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <Link to="/RegistrationForm" className="my-auto" onClick={handleLinkClick}>
                    <i className="fas fa-user fa-2x"></i>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
