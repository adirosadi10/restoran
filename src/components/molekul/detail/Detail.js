import React, { useState } from 'react'
import {useGet} from "../../../hook/index";
import { useForm } from "react-hook-form";
import { Form, Col, Button, Row } from "react-bootstrap";
import './Detail.css'

const Detail = () => {
  
  let today = new Date().toISOString().slice(0, 10);
  const { register, handleSubmit, errors, setValue } = useForm();
  
  const [awal, setAwal] = useState("2021-04-01");
  const [akhir, setAkhir] = useState(today);
  function cari(data) {
    setAwal(data.tAwal);
    setAkhir(data.tAkhir);
  }
  const [isi] = useGet(`/detail/${awal}/${akhir}`);
  let no = 1
  return (
    <div>
      <div className="row">
        <h2>Order Detail</h2>
      </div>
      <Form className="mt-3" onSubmit={handleSubmit(cari)}>
          <Form.Row>
            <Form.Group as={Col} xs="3" controlId="formGridTawal">
              <Form.Label>Tanggal Awal</Form.Label>
              <Form.Control type="date" name="tAwal" ref={register} />
            </Form.Group>
            <Form.Group as={Col} xs="3" controlId="formGridTakhir">
              <Form.Label>Tanggal Akhir</Form.Label>
              <Form.Control type="date" name="tAkhir" ref={register} />
            </Form.Group>
          <Button className="btn-detail" as={Col} xs="1" width="100" height="10" variant="primary" type="submit">
            Submit
          </Button>
          </Form.Row>
        </Form>
      
      <div className="row">
        <table className="table mt-2">
          <thead>
            <tr>
              <th>No.</th>
              <th>Faktur</th>
              <th>Tgl.Order</th>
              <th>Menu</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Total</th>
            </tr>
          </thead>
          {isi.map((val, index) => (
            <tbody key={index}>
              <tr>
                <td>{no++}</td>
                <td>{val.idOrder}</td>
                <td>{val.tglOrder}</td>
                <td>{val.menu}</td>
                <td>{val.harga}</td>
                <td>{val.jumlah}</td>
                <td>{val.harga * val.jumlah}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

export default Detail
