import './brand.css';

import React from 'react'

function Brand() {
  return (
    <div className='brand-name-and-logo'>
      <div className='brand-logo'>
          <img src="https://www.iiit.ac.in/img/iiit-new.png" alt="IIITH Logo"></img>
        </div>
        <div className='brand-name'>
        International Institute of Information Technology, Hyderabad.
        </div>
    </div>
  )
}

export default Brand