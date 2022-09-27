import React from "react";
import headeer from "./header.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth, logout } from "../../store/auth";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
  Row,
} from "react-bootstrap";
export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid className="mx-2">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", width: `${100}%` }}
            navbarScroll
          >
            {isAuth ? (
              <nav className="nav-header">
                <div className="navigationg-wrapper">
                  <Link to="/">Головна</Link>
                  <Link to="myPosts">Мої статті</Link>
                  <Link to="/PopularPosts">Популярне</Link>
                  <Link to="/CooperationPolicy">Контакти</Link>
                  <Link to={`/adminPanel/${userData._id}`}>Про мене</Link>
                </div>
              </nav>
            ) : (
              <nav className="nav-header">
                <div className="navigationg-wrapper">
                  <Link to="/">Головна</Link>
                  <Link to="/PopularPosts">Популярне</Link>
                  <Link to="/CooperationPolicy">Контакти</Link>
                </div>
              </nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="header-button">
        {isAuth ? (
          <>
            <Link to="/add-post">
              <Button variant="primary">Додати статтю</Button>
            </Link>
            <Link to="/auth/register">
              <Button onClick={onClickLogout} variant="danger">
                Вийти
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/auth/login">
              <Button variant="primary">Увійти</Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="danger">Зареєструватися</Button>
            </Link>
          </>
        )}
      </div>
    </Navbar>
  );
};
