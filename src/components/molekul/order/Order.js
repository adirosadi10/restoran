import React, { useState } from "react";
import {useGet} from "../../../hook/index";
import { useForm } from "react-hook-form";
import { Form, Col, Button, Row } from "react-bootstrap";
import Modal from "react-modal";
import { Link } from "../../../axios/Link";

Modal.setAppElement("#root");
const Order = () => {
  const [total, setTotal] = useState(0);
  const [pelanggan, setPelanggan] = useState("");
  const [mOpen, setMOpen] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  
  let today = new Date().toISOString().slice(0, 10);

  const [awal, setAwal] = useState("2021-04-01");
  const [akhir, setAkhir] = useState(today);
  const { register, handleSubmit, errors, setValue } = useForm();
  function cari(data) {
    setAwal(data.tAwal);
    setAkhir(data.tAkhir);
  }
  const [isi] = useGet(`/order/${awal}/${akhir}`);
  function filterData(id) {
    console.log(id);
    const data = isi.filter((val) => val.idOrder === id);
    setTotal(data[0].total);
    setPelanggan(data[0].pelanggan);
    setIdOrder(data[0].idOrder);
    setMOpen(true);
  }
  function isiForm() {
    setValue("total", {total});
  }
  async function simpan(data) {
    let hasil = {
      bayar : data.bayar,
      kembali: data.bayar - data.total,
      status: 1
    }
    const res = await Link.put('/order/'+idOrder, hasil)
    console.log(hasil);
    setMOpen(false);
  }

  let no = 1;
  return (
    <div>
      <Modal
        isOpen={mOpen}
        onRequestClose={() => setMOpen(false)}
        onAfterOpen={isiForm}
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
        <h1>Pembayaran Order "{pelanggan}"</h1>
        <Form onSubmit={handleSubmit(simpan)} >
          <Form.Group as={Row} controlId="formtotal">
            <Form.Label column sm="2">
              Total
            </Form.Label>
            <Col sm="10">
              <Form.Control readOnly value={total} name="total" type="number" ref={register({ required : true })} />
            </Col>
            {errors.total && <span>This field is required</span>}
          </Form.Group>
          <Form.Group as={Row} controlId="formbayar">
            <Form.Label column sm="2">
              Bayar
            </Form.Label>
            <Col sm="10">
              <Form.Control name="bayar" type="number" ref={register({ required : true, min: total })} />
            </Col>
            {errors.bayar && <span className="red" >Pembayaran Kurang !</span>}
          </Form.Group>
          <Form.Group className="end" aria-label="Basic example">
            <Button
              variant="secondary"
              className=""
              onClick={() => setMOpen(false)}
            >
              Close
            </Button>
            <Button variant="primary" name="submit" type="submit" >Bayar</Button>
          </Form.Group>
        </Form>
      </Modal>
      <div className="row">
        <h1>ORDER</h1>
      </div>
      <>
        <Form className="mt-3" onSubmit={handleSubmit(cari)}>
          <Form.Row>
            <Form.Group as={Col} xs="4" controlId="formGridTawal">
              <Form.Label>Tanggal Awal</Form.Label>
              <Form.Control type="date" name="tAwal" ref={register} />
            </Form.Group>
            <Form.Group as={Col} xs="4" controlId="formGridTakhir">
              <Form.Label>Tanggal Akhir</Form.Label>
              <Form.Control type="date" name="tAkhir" ref={register} />
            </Form.Group>
          </Form.Row>
          <Button width="100" height="10" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
      <div className="row">
        <table className="table mt-5">
          <thead>
            <tr>
              <th>No.</th>
              <th>Pelanggan</th>
              <th>Tgl.Order</th>
              <th>Total</th>
              <th>Bayar</th>
              <th>Kembali</th>
              <th>Status</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          {isi.map((val, index) => (
            <tbody key={index}>
              <tr>
                <td>{no++}</td>
                <td>{val.pelanggan}</td>
                <td>{val.tglOrder}</td>
                <td>{val.total}</td>
                <td>{val.bayar}</td>
                <td>{val.kembali}</td>
                <td>
                  {val.status === 0 ? (
                    <button
                      onClick={() => filterData(val.idOrder)}
                      className="btn btn-danger"
                    >
                      Belum bayar
                    </button>
                  ) : (
                    <p>Lunas</p>
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

export default Order;
