import React from 'react'


class Skill extends React.Component {
  constructor() {
    super()
    this.state = {
      skillLevel: `&#10032;`
    }
    /*this.levelUp = this.levelUp.bind(this)*/
  }

  /*levelUp() {
    this.setState({ skillLevel: `&#10025;` })
  }*/

  render() {
    return (
      <div>
        <div className="training-atribute intelligence">
          <p className="generate-code">Медицина</p>
          <p className="idk">1</p>
        </div>
      </div>
    )
  }
}

export default Skill