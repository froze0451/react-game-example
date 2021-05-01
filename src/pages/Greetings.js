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

  function clearStorage() {
    localStorage.clear()
  }

  return (
    <div className="greetings-page">
      <h2 className="greetings-title">Добро пожаловать в абстрактную рпг игру!</h2>
      <div className="greetings-buttons-panel">
        <a className="greetings-to-creation" href="/creation">Создать нового персонажа</a>
        <input type="file" className="hidden-input" id="file" /*onChange={(event) => printFile(event)}*/ />
        <label htmlFor="file" className="custom-file-label" onClick={clearStorage}>Импортировать персонажа</label>
      </div>


    </div>
  )
}

export default Greetings