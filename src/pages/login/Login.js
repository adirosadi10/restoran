import React from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import { Link } from "../../axios/Link";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import  "./Login.css"

const Login = () => {
  const { register, handleSubmit, reset, errors, setValue } = useForm();
  const history = useHistory()
  async function login(data){
    const res = await Link.post('/login', data) 
    let token = await res.data.token
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('email', res.data.data.email)
    sessionStorage.setItem('level', res.data.data.level)
    console.log(res.data.data.email)
    console.log(res.data.data.level)

    reset()
    if(gettoken() !== 'undefined' ){
    history.push('/admin')
    window.location.reload()
    }
  }
  const gettoken = () => (sessionStorage.getItem('token'))
  return (
    <div id="#login">
      <div className="row  mt-5">
        <div className="mx-auto col-5">
          <Form className="form" onSubmit={handleSubmit(login)} >
            <div>
              <h2 className="center" >LOGIN</h2>
            </div>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control name="email" type="email" placeholder="Email" ref={register({ required: true })} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control name="password" type="password" placeholder="Password" ref={register({ required: true })} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalCheck">
              <Col sm={{ span: 10, offset: 2 }}>
                <Form.Check label="Remember me" />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Sign in</Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
