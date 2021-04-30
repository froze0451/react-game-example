import React, { useState } from 'react'

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
  const [uploadedStats, setUploadedStats] = useState()


  function printFile(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (event) {
      setUploadedStats(JSON.parse(event.target.result))
      console.log(uploadedStats)
    };
    reader.readAsText(file);
  }

  return (
    <div className="greetings-page">
      <h2 className="greetings-title">Добро пожаловать в абстрактную рпг игру!</h2>
      <div className="greetings-buttons-panel">
        <a className="greetings-to-creation" href="/creation">Создать нового персонажа</a>
        <input type="file" className="hidden-input" id="file" onChange={(event) => printFile(event)} />
        <label htmlFor="file" className="custom-file-label">Импортировать персонажа</label>
      </div>

      <div>{"uploaded file is: " + (uploadedStats !== undefined ? (function ha() { for (const [key, value] of Object.entries(uploadedStats)) { return (`${key}: ${value}`) } })() : "not uploaded yet")}</div>
      <button onClick={() => console.log(uploadedStats)}>Чекнуть в консоли загруженные объект</button>
    </div>
  )
}

export default Greetings