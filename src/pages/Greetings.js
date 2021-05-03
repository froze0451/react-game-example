import React from 'react'

function Greetings() {

  /* for uploaded json file with char stats*/
  /*let uploadedStats
  
  function printFile(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (event) {
      uploadedStats = JSON.parse(event.target.result);
      console.log(uploadedStats)
    };
    reader.readAsText(file);
  }*/
  /*const [uploadedStats, setUploadedStats] = useState()*/

  /*
    function printFile(event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = function (event) {
        setUploadedStats(JSON.parse(event.target.result))
        console.log(uploadedStats)
      };
      reader.readAsText(file);
    }*/

  const styles = {}

  if (localStorage.length === 0) {
    styles.backgroundColor = "DarkGray";
    styles.borderColor = "Grey";
    styles.cursor = "default"
    styles.color = "SlateGrey"
  } else {
    styles.backgroundColor = "Crimson"
  }

  let allowTransition;
  if (localStorage.length !== 0) {
    allowTransition = "/training"
  } else {
    allowTransition = null
  }


  return (
    <div className="greetings-page">
      <h2 className="greetings-title">Добро пожаловать в абстрактную рпг игру!</h2>
      <div className="greetings-buttons-panel">
        <a className="greetings-anchor" onClick={() => localStorage.clear()} href="/creation">Создать нового персонажа</a>
        <a className="greetings-anchor continue" href={allowTransition} style={styles}>Продолжить...</a>
      </div>
    </div>
  )
}

export default Greetings

