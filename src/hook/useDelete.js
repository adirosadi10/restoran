import { useState } from 'react'
import { Link } from '../axios/Link'

const useDelete = (url) => {
  const [pesan, setPesan] = useState()

  async function hapus(id){
    if(window.confirm('yakin akan dihapus?')){
      const res = await Link.delete(url+id)
      setPesan(res.data.pesan)
    }
  }
  return {hapus, pesan, setPesan}
}

export default useDelete
