import React from 'react'

function Atribute(props) {
  return (
    <div className="atribute">
      <p>{props.atributeTitle}</p>
      <div className="atribute-button-section">
        <button onClick={() => props.plusPoint(props.atributeName)}></button>
        <p>{props.atributeCount}</p>
        <button onClick={() => props.minusPoint(props.atributeName)}></button>
      </div>
    </div>
  )
}

export default Atribute