import React from 'react'
import Atribute from '../components/Atribute'

/*import AtributeButton from '../components/AtributeButton'*/

/*learning stuff
import LearningStuff from '../components/LearningStuff'
import learningData from "../data/learningData"
stuff ends*/

class CharacterCreation extends React.Component {
  constructor() {
    super()
    this.state = {
      pointsToSpend: 12,
      strength: 0,
      agility: 0,
      intelligence: 0,
      charisma: 0,
      name: '',
    }
    this.plusPoint = this.plusPoint.bind(this)
    this.minusPoint = this.minusPoint.bind(this)
  }

  plusPoint(atribute) {
    if (
      this.state.pointsToSpend < 12 &&
      this.state.pointsToSpend >= 0 &&
      this.state[atribute] > 0
    ) {
      this.setState((prevState) => {
        return {
          pointsToSpend: prevState.pointsToSpend + 1,
          [atribute]: prevState[atribute] - 1,
        }
      })
    }
  }

  minusPoint(atribute) {
    if (this.state.pointsToSpend > 0) {
      this.setState((prevState) => {
        return {
          pointsToSpend: prevState.pointsToSpend - 1,
          [atribute]: prevState[atribute] + 1,
        }
      })
    }
  }

  changeName(e) {
    this.setState({ name: e.target.value })
  }

  createCharacter() {
    if (this.state.pointsToSpend > 0 && this.state.name === '') {
      alert(
        'Для создания персонажа необходимо сначала распределить очки между базовыми параметрами и дать имя персонажу'
      )
    } else if (this.state.pointsToSpend > 0 && this.state.name !== '') {
      alert(
        'Для создания персонажа необходимо сначала распределить очки между базовыми параметрами'
      )
    } else if (this.state.pointsToSpend === 0 && this.state.name === '') {
      alert('Для создания персонажа необходимо сначала дать ему имя')
    } else {
      alert('Персонаж успешно создан!')
    }
    /*if (this.state.pointsToSpend > 0) {
      alert('Для создания персонажа необходимо сначала распределить очки между базовыми параметрами')
    } else {
      alert('Персонаж успешно создан!')
    }*/
    /*if (this.state.name === "") {
      console.log('haha')
    } else {
      console.log('ok')
    }*/
  }

  render() {
    return (
      <div className="creation-page">
        <h2 className="creation-page-title">
          Добро пожаловать в окно создания персонажа!
        </h2>
        <div className="character-creation">
          <div className="avatar-and-description">
            <div className="avatar" title="Это ваш герой"></div>
            <div className="description"></div>
            <div className="change-page-anchors">
              <a href="/">Hа главную</a>
              <a href="/training">В тренинг</a>
            </div>
          </div>
          <div className="creation">
            <h5>Имя</h5>
            <input
              onChange={(e) => this.changeName(e)}
              className="name-creation-field"
              type="text-field"
              placeholder="Введите имя персонажа"
            ></input>
            <h5>Базовые параметры</h5>
            <div className="points">
              Осталось распределить очков:{' '}
              <span>{this.state.pointsToSpend}</span>
            </div>
            <div className="atributes">
              <Atribute
                atributeTitle="Сила"
                atributeName="strength"
                atributeCount={this.state.strength}
                plusPoint={this.plusPoint}
                minusPoint={this.minusPoint}
              ></Atribute>
              <Atribute
                atributeTitle="Ловкость"
                atributeName="agility"
                atributeCount={this.state.agility}
                plusPoint={this.plusPoint}
                minusPoint={this.minusPoint}
              ></Atribute>
              <Atribute
                atributeTitle="Интеллект"
                atributeName="intelligence"
                atributeCount={this.state.intelligence}
                plusPoint={this.plusPoint}
                minusPoint={this.minusPoint}
              ></Atribute>
              <Atribute
                atributeTitle="Харизма"
                atributeName="charisma"
                atributeCount={this.state.charisma}
                plusPoint={this.plusPoint}
                minusPoint={this.minusPoint}
              ></Atribute>
            </div>
            <h5>Дополнительные параметры</h5>
            <div className="additional-atributes">
              <div className="additional-atribute">
                <p>Жизненная сила</p>
                <div className="additional-atribute-stats">
                  <p>3</p>
                  <p>&gt;</p>
                  <p
                    style={{
                      color: this.state.strength > 0 ? 'blue' : 'black',
                    }}
                  >
                    {this.state.strength + 3}
                  </p>
                </div>
              </div>
              <div className="additional-atribute">
                <p>Уклонение</p>
                <div className="additional-atribute-stats">
                  <p>10</p>
                  <p>&gt;</p>
                  <p
                    style={{ color: this.state.agility > 0 ? 'blue' : 'black' }}
                  >
                    {10 + this.state.agility}
                  </p>
                </div>
              </div>
              <div className="additional-atribute">
                <p>Энергичность</p>
                <div className="additional-atribute-stats">
                  <p>0</p>
                  <p>&gt;</p>
                  <p
                    style={{
                      color:
                        this.state.agility + this.state.intelligence > 0
                          ? 'blue'
                          : 'black',
                    }}
                  >
                    {this.state.agility + this.state.intelligence}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="submit-button"
              /*onClick={() => console.log(this.state)}*/ onClick={() =>
                this.createCharacter()
              }
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    )
  }
}

/*  атрибуты jsx
  <div className="atribute" title="Показатель силы вашего персонажа. Влияет на параметр жизненной силы">
    <p>Сила</p>
    <div className="atribute-button-section">
      <button onClick={() => this.plusPoint("strength")}></button>
      <p>{this.state.strength}</p>
      <button onClick={() => this.minusPoint("strength")}></button>
    </div>
  </div>
  <div className="atribute" title="Показатель ловкости вашего персонажа. Влияет на параметы уклонения и энергичности">
    <p>Ловкость</p>
    <div className="atribute-button-section">
      <button onClick={() => this.plusPoint("agility")}></button>
      <p>{this.state.agility}</p>
      <button onClick={() => this.minusPoint("agility")}></button>
    </div>
  </div>
  <div className="atribute">
    <p>Интеллект</p>
    <div className="atribute-button-section">
      <button onClick={() => this.plusPoint("intelligence")}></button>
      <p>{this.state.intelligence}</p>
      <button onClick={() => this.minusPoint("intelligence")}></button>
    </div>
  </div>
  <div className="atribute">
    <p>Харизма</p>
    <div className="atribute-button-section">
      <button onClick={() => this.plusPoint("charisma")}></button>
      <p>{this.state.charisma}</p>
      <button onClick={() => this.minusPoint("charisma")}></button>
    </div>
  </div>*/

export default CharacterCreation
