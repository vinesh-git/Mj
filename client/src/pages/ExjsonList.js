import React from 'react'

export default function ExjsonList({title,active,id,setSelectedT}) {
  return (
    <li className={active ? "ExjsonList active": "ExjsonList"} onClick={() => setSelectedT(id)}>
        {title}
    </li>
  )
}
