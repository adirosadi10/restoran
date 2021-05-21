import {useGet, useDelete} from '../../../hook/index'

const Pelanggan = () => {
  const [isi] = useGet('/pelanggan')
  const {hapus, pesan} = useDelete('/pelanggan/')
  let no = 1
  return (
    <div>
      <div className="row" >
        <h2>Daftar Pelanggan</h2>
      </div>
      <div className="row" >
        <div>
          <p>{pesan}</p>
        </div>
      </div>
      <div className="row">
        <table className="table mt-5">
          <thead>
            <tr>
              <th>No.</th>
              <th>Pelanggan</th>
              <th>Alamat</th>
              <th>Telp</th>
              <th>Action</th>
            </tr>
          </thead>
          {isi.map((val, index) => (
            <tbody key={index}>
              <tr>
                <td>{no++}</td>
                <td>{val.pelanggan}</td>
                <td>{val.alamat}</td>
                <td>{val.telp}</td>
                <td>
                  <button onClick={ ()=> hapus(val.idPelanggan)} className="btn btn-danger" >Hapus</button>
                  <button className="btn btn-warning ml-1" >Edit</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

export default Pelanggan
