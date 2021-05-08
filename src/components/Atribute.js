import React from 'react'

function Atribute(props) {
  return (
    <div className='atribute' onMouseEnter={() => props.showDescription(props.descriptionKey)} onMouseLeave={props.hideDescription}>
      <p>{props.atributeTitle}</p>
      <div className="atribute-button-section">
        <button onClick={(e) => props.plusPoint(props.atributeName, e)}></button>
        <p>{props.atributeCount}</p>
        <button onClick={(e) => props.minusPoint(props.atributeName, e)}></button>
      </div>
    </div>
  )
}

export default Atribute