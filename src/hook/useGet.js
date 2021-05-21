import { useEffect, useState } from "react";
import { Link } from "../axios/Link";

const useGet = (url) => {
  const [isi, setIsi] = useState([]);
  
  useEffect(() => {
    let ambil = true
    async function fetchData() {
      const request = await Link.get(url);
      if(ambil){

        setIsi(request.data);
      }
    }
    fetchData();
    return()=>{
      ambil=false
    }
  }, [isi]);

  return [isi]
}

export default useGet
