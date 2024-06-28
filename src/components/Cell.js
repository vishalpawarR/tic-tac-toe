import React from 'react'
import './cell.css'

export default function Cell({id, onClick}) {
  return (
    <div className='cell' id={id} onClick={onClick}></div>
  )
}
