import React from 'react'

function Skill(props) {
  return (
    <div className={props.dependentParameter}>
      <p onMouseEnter={() => props.showDescription('skill')} onMouseLeave={props.hideDescription}>{props.skillTitle}</p>
      <p onMouseEnter={(e) => props.skillDescription(e)} onMouseLeave={props.hideDescription} onClick={(e) => props.skillUp(props.skillName, e)}>{props.skillState}</p>
    </div>
  )
}

export default Skill

/*onClick={(e) => props.plusPoint(props.atributeName, e)}*/

/*<div className="charisma">
  <p onMouseEnter={() => this.showDescription('skill')} onMouseLeave={this.hideDescription}>Манипулирование</p>
  <p onMouseEnter={(e) => this.skillDescription(e)} onMouseLeave={this.hideDescription} onClick={(e) => this.skillUp('manipulation', e)}>{this.state.skillLvls.manipulation}</p>
</div>*/
