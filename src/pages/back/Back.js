import React from 'react'
import {Nav, Side, Main, Footer } from '../../components'
import { Redirect } from "react-router-dom"
import "./Back.css"

const Back = () => {
  if((sessionStorage.getItem('token') === 'undefined' ) || (sessionStorage.getItem('token') === null ) ){
    return <Redirect to="/login" />
  }
  return (
    <div>
      <div className="row">
        <div className="col-12">

        <Nav />
        </div>
      </div>
      <div className="row konten">
        <div className="col-2" >
          <Side />
        </div>
        <div className="col-10">
          <Main />
        </div>
      </div>
      <div className="row">
        <Footer/>
      </div>
    </div>
  )
}

export default Back
