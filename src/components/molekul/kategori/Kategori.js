import React, { useState } from "react";
import { Link } from "../../../axios/Link";
import { useForm } from "react-hook-form";
import { Form, Col, Button, Alert } from "react-bootstrap";
import {useGet} from '../../../hook'
import Modal from "react-modal";

const Kategori = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [pesan, setPesan] = useState('');
  const [idKategori, setIdKategori] = useState('');
  const [pilihan, setPilihan] = useState(true);
  const { register, handleSubmit, reset, errors, setValue } = useForm();
  const [mOpen, setMOpen] = useState(false);
  const [isi] = useGet('/kategori')
  function tambah() {
    setMOpen(true);
  }
  
  function simpan(data){
    if(pilihan){
      Link.post('/kategori', data)
      .then(res=>setPesan(res.data.pesan))    
    }else{
      Link.put('/kategori/'+idKategori, data)
      .then(res=>setPesan(res.data.pesan))
      setPilihan(true)
    }
    reset()
    setMOpen(false)
    setShowAlert(true)

  }
  async function hapus(id){
    if(window.confirm('yakin akan dihapus?')){
      const res = await Link.delete('/kategori/'+id)
      setPesan(res.data.pesan)
    }
  }
  async function show(id){
    const res = await Link.get('/kategori/'+id)
    setValue('kategori',res.data[0].kategori)
    setValue('keterangan',res.data[0].keterangan)
    setIdKategori(res.data[0].idKategori)
    setPilihan(false)
  }
  if (showAlert) {
    return (
      <Alert variant="dark" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>{pesan}</Alert.Heading>
      </Alert>
    );
  }
  
  
  let no = 1
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
        <h1>Tambah Kategori</h1>
        <Form className="mt-3" onSubmit={handleSubmit(simpan)} >
          <Form.Row>
            <Form.Group as={Col} xs="6" controlId="formGridEmail">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                name="kategori"
                type="text"
                placeholder="Enter kategori"
                ref={register({ required: true })}
              />
              {errors.kategori && <span>This field is required</span>}
            </Form.Group>

            <Form.Group as={Col} xs="6" controlId="formGridPassword">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                name="keterangan"
                type="text"
                placeholder="Keterangan"
                ref={register}
              />
              {errors.keterangan && <span>This field is required</span>}
            </Form.Group>                    
            <Button className="ml-2" variant="primary" name="submit" type="submit">
              Submit
            </Button>            
          </Form.Row>
        </Form>
      </Modal>
      <div className="row">
        <h2>Data Kategori</h2>
      </div>
        <div className="row" >
        <Button
          onClick={() => tambah()}
          variant="success"
          className="my-2"
        >
          Tambah
        </Button>
      </div>
      <div className="row">
      <p>{showAlert}</p>
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th>Action</th>
            </tr>
          </thead>
          {isi.map((val, index) => (
            <tbody key={index}>
              <tr>
                <td>{no++}</td>
                <td>{val.kategori}</td>
                <td>{val.keterangan}</td>
                <td>
                  <button onClick={ ()=> hapus(val.idKategori)} className="btn btn-danger" >Hapus</button>
                  <button onClick={ ()=> show(val.idKategori)}  className="btn btn-warning ml-1" >Edit</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Kategori;
