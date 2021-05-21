import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import './Side.css'

const Side = () => {
  const { url } = useRouteMatch();

  return (
    <div  className="pl-5">
      <Card clasName="card" style={{ width: "10rem" }}>
        <Card.Header>Menu Aplikasi</Card.Header>
        <ListGroup className="list" >
          <Link to={`${url}/kategori`}>
            {sessionStorage.getItem("level") === "Admin" ? (
              <ListGroup.Item>Kategori</ListGroup.Item>
            ) : (
              ""
            )}
          </Link>
          <Link to={`${url}/menu`}>
            {sessionStorage.getItem("level") === "Admin" ? (
              <ListGroup.Item>Menu</ListGroup.Item>
            ) : (
              ""
            )}
          </Link>
          <Link to={`${url}/pelanggan`}>
            {sessionStorage.getItem("level") === "Admin" ? (
              <ListGroup.Item>Pelanggan</ListGroup.Item>
            ) : (
              ""
            )}
          </Link>
          <Link to={`${url}/order`}>
            {sessionStorage.getItem("level") === "Admin" ||
            sessionStorage.getItem("level") === "Kasir" ? (
              <ListGroup.Item>Order</ListGroup.Item>
            ) : (
              ""
            )}
          </Link>
          <Link to={`${url}/detail`}>
          {sessionStorage.getItem("level") === "Admin" ||
            sessionStorage.getItem("level") === "Kasir" ||
            sessionStorage.getItem("level") === "Koki" ? (
              <ListGroup.Item>Detail</ListGroup.Item>
            ) : (
              ""
            )}
          </Link>
          <Link to={`${url}/user`}>
          {sessionStorage.getItem("level") === "Admin" ? (
              <ListGroup.Item>User Admin</ListGroup.Item>
            ) : (
              ""
            )}
          </Link>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Side;
