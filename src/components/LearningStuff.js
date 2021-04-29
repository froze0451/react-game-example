import React from 'react'

/*function LearningStuff() {
  const date = new Date()
  const hours = date.getHours()
  let timeOfDay
  const styles = {
    fontSize: 32
  }

  if (hours < 12) {
    timeOfDay = "morning"
    styles.color = "coral"
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "afternoon"
    styles.color = "Cyan"
  } else {
    timeOfDay = "evening"
    styles.color = "DarkCyan"
  }


  return (
    <h5 style={styles}>Good {timeOfDay}!</h5>
  )
}*/

function LearningStuff(props) {

  return (
    <div>
      <p>I am: {props.pros}</p>
      <p>But also: {props.cons}</p>
      <p>My slogan is: <span style={{ color: "purple", fontSize: 18 }}>{props.slogan}</span></p>
    </div >
  )
}

export default LearningStuff