import { useState, useEffect } from 'react'
import {useGet, useDelete } from "../../../hook/index";
import { useForm } from "react-hook-form";
import { Form, Col, Button, Alert, Row } from "react-bootstrap";
import { Link } from "../../../axios/Link";
import Modal from "react-modal";

const Menu = () => {
  const [isi] = useGet("/menu");
  const [showAlert, setShowAlert] = useState(false);
  const [kategori, setKategori] = useState([]);
  const [idKategori, setIdKategori] = useState([]);
  const [idMenu, setIdMenu] = useState([]);
  const [gambar, setGambar] = useState([]);
  const [pilihan, setPilihan] = useState(true);
  const { hapus, pesan, setPesan } = useDelete("/menu/");
  const [mOpen, setMOpen] = useState(false);
  const { register, handleSubmit, reset, errors, setValue } = useForm();
  useEffect(() => {
    let ambil = true
    async function fetchData() {
      const request = await Link.get('/kategori');
      if(ambil){

        setKategori(request.data);
      }
    }
    fetchData();
    return()=>{
      ambil=false
    }
  }, [kategori]);
  function tambah() {
    setMOpen(true);
  }

  function simpan(data) {
    const formData = new FormData();
    formData.append('idKategori', data.idKategori)
    formData.append('menu', data.menu)
    formData.append('gambar', data.gambar[0])
    formData.append('harga', data.harga)
    if(pilihan){   
      Link.post('/menu', formData)
        .then(res=>setPesan(res.data.pesan))
    }else{
      Link.post('/menu/'+idMenu, formData)
      .then(res=>setPesan(res.data.pesan))
      setPilihan(true)
    }
    reset()
    setMOpen(false)
    setShowAlert(true)
  }
  async function show(id){
    setMOpen(true);
    const res = await Link.get('/menu/'+id)
    setValue('menu',res.data[0].menu)
    setValue('harga',res.data[0].harga)
    setGambar(<img src={res.data[0].gambar} alt="" />)
    setIdKategori(res.data[0].idKategori)
    setIdMenu(res.data[0].idMenu)
    setPilihan(false)
    console.log(res.data)
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
            width: "44%",
          },
        }}
      >
        <h1>Tambah Kategori</h1>
        <Form className="mt-3 mx-2" onSubmit={handleSubmit(simpan)}>
          <>
            <Form.Group as={Row} controlId="formGridEmail">
              <Form.Label as={Col} xs="2" >Menu</Form.Label>
              <Col  xs="10" >

              <Form.Control
                name="menu"
                type="text"
                placeholder="Enter kategori"
                ref={register({ required: true })}
                />
              {errors.menu && <span>This field is required</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridState">
              <Form.Label as={Col} xs="2" >Kategori</Form.Label>
              <Col xs="10">
              <Form.Control
                as="select"
                name="idKategori"
                ref={register({ required: true })}
              >
                {kategori.map((val,index) => 
                  val.idKategori === idKategori ? (
                    <option selected key={index} value={val.idKategori} >
                      {val.kategori}
                    </option>
                  ) : (
                    <option key={index} value={val.idKategori} >
                      {val.kategori}
                    </option>
                  )
                )}
              </Form.Control>
              {errors.kategori && <span>This field is required</span>}
              </Col>
            </Form.Group>
            

            <Form.Group as={Row} controlId="formGridPassword">
              <Form.Label as={Col} xs="2" >harga</Form.Label>
              <Col xs="10">
              <Form.Control
              name="harga"
              type="text"
              placeholder="Keterangan"
              ref={register}
              />
              {errors.harga && <span>This field is required</span>}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridGambar">
            <Form.Label as={Col} xs="2" >Gambar</Form.Label>
              <Form.File
              as={Col} xs="10"
                className="position-relative"
                name="gambar"
                ref={register}
              />
              {errors.gambar && <span>This field is required</span>}
            </Form.Group>
            <div className="row">

        <div className="col-12" >{gambar}</div>
            </div>
            <Button className="mt-2" variant="primary" type="submit">
              Submit
            </Button>
          </>
        </Form>
      </Modal>
      <div className="row">
        <h2>Daftar Menu</h2>
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
        <div>
          <p>{pesan}</p>
        </div>
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Kategori</th>
              <th>Menu</th>
              <th>Gambar</th>
              <th>Harga</th>
              <th>Action</th>
            </tr>
          </thead>
          {isi.map((val, index) => (
            <tbody key={index}>
              <tr>
                <td>{no++}</td>
                <td>{val.kategori}</td>
                <td>{val.menu}</td>
                <td>
                  <img src={val.gambar} height="100" width="120" alt="gambar" />
                </td>
                <td>{val.harga}</td>
                <td>
                  <button
                    onClick={() => hapus(val.idMenu)}
                    className="btn btn-danger"
                  >
                    Hapus
                  </button>
                  <button
                   onClick={ ()=> show(val.idMenu)} 
                   className="btn btn-warning ml-1"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Menu;
