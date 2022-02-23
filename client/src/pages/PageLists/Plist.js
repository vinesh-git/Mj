import React from 'react'
import "./list.scss";
 
function Plist({titlee,active,setSelected,id}) {
  return (
     <li className= {active ? "plist active": "plist"} onClick={()=>setSelected(id)}>
       {titlee}
     </li>
  )
}
export default Plist