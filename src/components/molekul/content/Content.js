import React from 'react'
import { useParams } from 'react-router'
import { Kategori, Menu, Pelanggan, Order, Detail, User } from '../index'

const Content = () => {
  const {isi} = useParams()

  let tampil

  if(isi === 'kategori'){
    tampil=<Kategori/>
  }
  if(isi === 'menu'){
    tampil=<Menu/>
  }
  if(isi === 'pelanggan'){
    tampil=<Pelanggan/>
  }
  if(isi === 'order'){
    tampil=<Order/>
  }
  if(isi === 'detail'){
    tampil=<Detail/>
  }
  if(isi === 'user'){
    tampil=<User/>
  }
  return (
    <div>{tampil}</div>
  )
}

export default Content;