import React, { useState } from "react";
import {useGet} from "../../../hook";
import { Form, Col, Button, Row, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { Link } from "../../../axios/Link";

const User = () => {
  const [mOpen, setMOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [pesan, setPesan] = useState('');
  const { register, handleSubmit, errors} = useForm();
  const [isi] = useGet(`/user/`);
  function tambah() {
    setMOpen(true);
  }
  async function status(id){
    const data = isi.filter((val)=> val.id === id)
    let stat = 0
    if(data[0].status === 1){
      stat = 0
    }else{
      stat = 1
    }
    let kirim = {
      status : stat
    }
    const res = await Link.put('/user/'+id, kirim)
  }
  async function simpan(data) {
    let user = {
      email : data.email,
      password : data.password,
      level : data.level,
      relasi: 'back'
    }
    const res =  await Link.post('/register', user)
    .then(res=>setPesan(res.data.pesan)) 
    setMOpen(false)
    setShowAlert(true)
  }
  if (showAlert) {
    return (
      <Alert variant="dark" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>{pesan}</Alert.Heading>
      </Alert>
    );
  }
  
  let no = 1;
  return (
    <div>
      <Modal
        isOpen={mOpen}
        onRequestClose={() => setMOpen(false)}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.8)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
          },
        }}
      >
        <h1>Tambah User</h1>
        <Form onSubmit={handleSubmit(simpan)}>
          <Form.Group as={Row} controlId="formemail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="email"
                type="email"
                placeholder="email"
                ref={register({ required: true })}
              />
            </Col>
            {errors.email && <span>This field is required</span>}
          </Form.Group>
          <Form.Group as={Row} controlId="formpassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="password"
                type="password"
                placeholder="password"
                ref={register({ required: true })}
              />
            </Col>
            {errors.password && (
              <span className="red">Pembayaran Kurang !</span>
            )}
          </Form.Group>
          <Form.Group as={Row} controlId="formlevel">
            <Form.Label column sm="2">
              Level
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                name="level"
                ref={register({ required: true })}
              >
                <option>Admin</option>
                <option>Koki</option>
                <option>Kasir</option>
              </Form.Control>
            </Col>
            {errors.level && <span>This field is required</span>}
          </Form.Group>
          <Form.Group className="end" aria-label="Basic example">
            <Button
              variant="secondary"
              className=""
              onClick={() => setMOpen(false)}
            >
              Close
            </Button>
            <Button variant="primary" name="submit" type="submit">
              Bayar
            </Button>
          </Form.Group>
        </Form>
      </Modal>

      <div className="row">
        <h1>User admin</h1>
      </div>
      <div>
        <Button
          onClick={() => tambah()}
          variant="outline-secondary"
          className="my-2"
        >
          Button
        </Button>
      </div>
      <p>{showAlert}</p>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>User</th>
              <th>Level</th>
              <th>Status</th>
            </tr>
          </thead>
          {isi.map((val, index) => (
            <tbody key={index}>
              <tr>
                <td>{no++}</td>
                <td>{val.email}</td>
                <td>{val.level}</td>
                <td>
                  {val.status === 1 ? (
                    <button className="btn btn-success" type="submit" onClick={()=> status(val.id)} >
                      Aktif
                    </button>
                  ) : (
                    <button className="btn btn-danger" type="submit" onClick={()=> status(val.id)} >
                      Banded
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default User;
