import React from 'react'
import "./list.scss";
 
function Plist({title,active,setSelected,filee}) {
  return (
     <li className= {active ? "plist active": "plist"} onClick={()=>setSelected(filee)}>
       {title}
     </li>
  )
}
export default Plist