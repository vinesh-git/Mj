import './brand.css';

import React from 'react'
import img from '../../images/icon.png'

function Brand() {
  return (
    <div className='brand-name-and-logo'>
      <div className='brand-logo'>
          <img src={img} alt="IIITH Logo"></img>
        </div>
        <div className='brand-name'>
        Ihub Data INAI
        </div> 
    </div>
  )
}

export default Brand