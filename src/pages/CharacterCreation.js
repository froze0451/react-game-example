import React from "react"
import Atribute from "../components/Atribute"

const descriptions = {
  avatar: 'Это ваш доблестный рыцарь',
  strength: `Параметр влияет на показатель жизненной силы. Величина базового параметра определяет максимальный уровень прокачки привязанных скиллов(максимум 5). К силе привязан скилл 'Атака'`,
  agility: `Ловкость влияет на параметры уклонения и энергичности. К ловкости относятся скиллы 'Стелс' и 'Стрельба из лука'`,
  intelligence: `Интеллект влияет на параметр энергичности. К интеллекту привязаны скиллы 'Обучаемость', 'Выживание' и 'Медицина'`,
  charisma: `Харизма пока не определилась с объектом влияния. К ней относятся скиллы 'Запугивание', 'Проницательность', 'Внешний вид' и 'Манипулирование'`,
  submit: 'Создать персонажа!'
}

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
      description: 'Приветствую путник! Для начала введите имя и распределите очки между базовыми параметрами.'
    }
    this.plusPoint = this.plusPoint.bind(this)
    this.minusPoint = this.minusPoint.bind(this)
    this.storingCharacter = this.storingCharacter.bind(this)
    this.createCharacter = this.createCharacter.bind(this)
    this.showDescription = this.showDescription.bind(this)
    this.hideDescription = this.hideDescription.bind(this)
  }

  plusPoint(atribute, e) {
    if (
      this.state.pointsToSpend < 12 &&
      this.state.pointsToSpend >= 0 &&
      this.state[atribute] > 0
    ) {
      e.target.nextElementSibling.classList.toggle('booba')
      e.target.nextElementSibling.classList.toggle('goomba')
      this.setState((prevState) => {
        return {
          pointsToSpend: prevState.pointsToSpend + 1,
          [atribute]: prevState[atribute] - 1,
        }
      })
    }
  }

  minusPoint(atribute, e) {
    if (this.state.pointsToSpend > 0) {

      if (!e.target.previousElementSibling.classList.contains('goomba') && !e.target.previousElementSibling.classList.contains('booba')) {
        e.target.previousElementSibling.classList.add('booba')
      } else {
        e.target.previousElementSibling.classList.toggle('booba')
        e.target.previousElementSibling.classList.toggle('goomba')
      }

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

  storingCharacter() {
    const { name, strength, agility, intelligence, charisma } = this.state;
    const health = this.state.strength + 3
    sessionStorage.setItem('name', name)
    sessionStorage.setItem('strength', strength)
    sessionStorage.setItem('agility', agility)
    sessionStorage.setItem('intelligence', intelligence)
    sessionStorage.setItem('charisma', charisma)
    sessionStorage.setItem('health', health)
  }

  createCharacter() {
    if (this.state.pointsToSpend > 0 && this.state.name === "") {
      alert("Для создания персонажа необходимо сначала распределить очки между базовыми параметрами и дать имя персонажу")
    } else if (this.state.pointsToSpend > 0 && this.state.name !== "") {
      alert("Для создания персонажа необходимо сначала распределить очки между базовыми параметрами")
    } else if (this.state.pointsToSpend === 0 && this.state.name === "") {
      alert("Для создания персонажа необходимо сначала дать ему имя")
    } else {
      this.storingCharacter()
      alert("Персонаж успешно создан! Приключения начинаются!")
      window.location.href = '/training'
    }
  }

  showDescription(descriptionKey) {
    this.setState({ description: descriptions[descriptionKey] })
  }

  hideDescription() {
    this.setState({ description: '' })
  }

  render() {
    return (
      <div className="creation-page">
        <h2 className="creation-page-title">
          Добро пожаловать в окно создания персонажа!
        </h2>
        <div className="character-creation">
          <div className="avatar-and-description">
            <div className="avatar" onMouseEnter={() => this.showDescription('avatar')} onMouseLeave={this.hideDescription}>
            </div>
            <div className="description">{this.state.description}</div>
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
              Осталось распределить очков:{" "}
              <span>{this.state.pointsToSpend}</span>
            </div>
            <div className="atributes">
              <Atribute
                atributeTitle="Сила"
                atributeName="strength"
                atributeCount={this.state.strength}
                plusPoint={this.plusPoint}
                minusPoint={this.minusPoint}
                showDescription={this.showDescription}
                hideDescription={this.hideDescription}
                descriptionKey="strength"
              ></Atribute>
              <Atribute
                atributeTitle="Ловкость"
                atributeName="agility"
                atributeCount={this.state.agility}
                plusPoint={this.plusPoint}
                minusPoint={this.minusPoint}
                showDescription={this.showDescription}
                hideDescription={this.hideDescription}
                descriptionKey="agility"
              ></Atribute>
              <Atribute
                atributeTitle="Интеллект"
                atributeName="intelligence"
                atributeCount={this.state.intelligence}
                plusPoint={this.plusPoint}
                minusPoint={this.minusPoint}
                showDescription={this.showDescription}
                hideDescription={this.hideDescription}
                descriptionKey="intelligence"
              ></Atribute>
              <Atribute
                atributeTitle="Харизма"
                atributeName="charisma"
                atributeCount={this.state.charisma}
                plusPoint={this.plusPoint}
                minusPoint={this.minusPoint}
                showDescription={this.showDescription}
                hideDescription={this.hideDescription}
                descriptionKey="charisma"
              ></Atribute>
            </div>
            <h5>Дополнительные параметры</h5>
            <div className="additional-atributes">
              <div className="additional-atribute">
                <p>Жизненная сила</p>
                <div className="additional-atribute-stats">
                  <p>3</p>
                  <p>&gt;</p>
                  <p style={{ color: this.state.strength > 0 ? "blue" : "black" }}>
                    {3 + this.state.strength}
                  </p>
                </div>
              </div>
              <div className="additional-atribute">
                <p>Уклонение</p>
                <div className="additional-atribute-stats">
                  <p>10</p>
                  <p>&gt;</p>
                  <p style={{ color: this.state.agility > 0 ? "blue" : "black" }}>
                    {10 + this.state.agility}
                  </p>
                </div>
              </div>
              <div className="additional-atribute">
                <p>Энергичность</p>
                <div className="additional-atribute-stats">
                  <p>0</p>
                  <p>&gt;</p>
                  <p style={{ color: this.state.agility + this.state.intelligence > 0 ? "blue" : "black" }}>
                    {this.state.agility + this.state.intelligence}
                  </p>
                </div>
              </div>
            </div>
            <button className="submit-button" onMouseEnter={() => this.showDescription('submit')} onMouseLeave={this.hideDescription} onClick={this.createCharacter}>Создать</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterCreation
