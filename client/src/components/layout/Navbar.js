import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button } from '../../themes/basic';
import { logoutUser } from '../../actions/authActions';

const Navbar = () => {

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch(); 

  const logoutHandler = () => {
      dispatch(logoutUser());
  }

  const authLinks = (
      <ul className="nav-list">
        <li>
          <Link className="nav-link" to="/matches_feed">
            Mecze / Zakłady
          </Link>
        </li>
        {/* <li>
          <Link className="nav-link" to="/teams_feed">
            Drużyny
          </Link>
        </li> */}
        <li>
          <Button onClick={logoutHandler}>
            <img
              src={user.avatar && user.avatar}
              alt={user.name && user.name}
            />
            Wyloguj
          </Button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav-list">
        <li>
          <Link className="nav-link" to="/register">
            Rejestracja
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/login">
            Logowanie
          </Link>
        </li>
      </ul>
    );

  return(
      <NavBox className="navbar-box">
        <Container>
          <div className="content">
              <Link className="nav-link" to="/dashboard">
                Football Manager
                {isAuthenticated ? (
                  <span className="badge">{user && user.name}</span>
                ) : (
                  ""
                )}
              </Link>
              <Button
                className="btn-primary"
              >
                <span className="icon" />
              </Button>
              <div className="auth-data">
                {isAuthenticated ? authLinks : guestLinks}
              </div>
          </div>
        </Container>
      </NavBox>
  )

}

export default Navbar;

const NavBox = styled.nav`
    display:flex;
    background-color: grey;
    padding:15px 0px;
    .content{
      display:flex;
      justify-content:space-between;
      align-items:center;
    }
    img{
      max-width:50px;
      margin:5px;
    }
    .badge{
      padding:10px 15px;
      background-color:#000;
      color:#fff;
      border-radius:5px;
      margin:5px 8px;
    }
    .nav-list{
      list-style-type:none;
      display:flex;
      flex-direction:row;
      align-items:center;
    }
    .nav-list li{
      margin:0px 10px;
    }
`;