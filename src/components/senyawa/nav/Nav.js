import React from "react";
import { Navbar, Form, Button } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom"
import './Nav.css'

const Nav = () => {
  const { url } = useRouteMatch();
  const history = useHistory()
  function hapus(){
    sessionStorage.clear()
    history.push('/login')
  }
  return (
    <div className="mb-2">
      <Navbar className="header px-5" style={{width: "100%"}} animation="false" expand="lg">
        <Navbar.Brand className="brand" href={`${url}`}>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle animation="false" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse animation="false" className="justify-content-end" id="basic-navbar-nav">
        <Navbar.Text  className="mx-3 hide">
      Signed in as: {sessionStorage.getItem('email')}
    </Navbar.Text>
        <Navbar.Text className="mx-3 hide">
      Level: {sessionStorage.getItem('level')}
    </Navbar.Text>
          <Form>
            <Button className="btn-hide" onClick={hapus} type="submit" variant="btn">LogOut</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Nav;
