import React from 'react'
import Nav from './Nav'
import Side from "./Side";
import Main from "./Main";
import Footer from "./Footer";
const Front = () => {
  return (
    <>
      <div className="row">
        <Nav />
      </div>
      <div className="row">
        <div className="col-4" >
          <Side />
        </div>
        <div className="col-8">
          <Main />
        </div>
      </div>
      <div className="row">
        <Footer/>
      </div>
    </>
  )
}

export default Front
