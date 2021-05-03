import React from 'react'
import Skill from '../components/Skill'

/*for skills lvl up, contains unicode star character variations*/
const stars = ['\u{2730}', '\u{2729}', '\u{272C}', '\u{272E}', '\u{272F}']


class Training extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      strength: 0,
      agility: 0,
      intelligence: 0,
      charisma: 0,
      skillPoints: 5
    }
    this.saveCharacter = this.saveCharacter.bind(this)

  }

  componentDidMount() {
    if (localStorage.length !== 0) {
      this.setState({
        name: localStorage.getItem('name'),
        strength: Number(localStorage.getItem('strength')),
        agility: Number(localStorage.getItem('agility')),
        intelligence: Number(localStorage.getItem('intelligence')),
        charisma: Number(localStorage.getItem('charisma'))
      })
    } else {
      this.setState({
        name: sessionStorage.getItem('name'),
        strength: Number(sessionStorage.getItem('strength')),
        agility: Number(sessionStorage.getItem('agility')),
        intelligence: Number(sessionStorage.getItem('intelligence')),
        charisma: Number(sessionStorage.getItem('charisma'))
      })
    }
  }


  saveCharacter() {
    const { name, strength, agility, intelligence, charisma, skillPoints } = this.state;
    localStorage.setItem('name', name)
    localStorage.setItem('strength', strength)
    localStorage.setItem('agility', agility)
    localStorage.setItem('intelligence', intelligence)
    localStorage.setItem('charisma', charisma)
    localStorage.setItem('skillPoints', skillPoints)
    alert('Персонаж успешно сохранён! Вы сможете продолжить сохраненную игру с помощью кнопки `Продолжить` на основном экране. Можете закрыть страницу или продолжить игру.')
  }

  checkLocal() {
    console.log('sessionStorage length: ', sessionStorage.length)
    console.log('localStorage length: ', localStorage.length)
  }

  levelUp(e) {
    if (stars.indexOf(e.target.textContent) < 4 && this.state.skillPoints > 0) {
      e.target.textContent = stars[stars.indexOf(e.target.textContent) + 1]
      this.setState((prevState) => {
        return {
          skillPoints: prevState.skillPoints - 1,
        }
      })
    } else {
      console.log('nah')
    }
  }

  render() {
    /*const stars = ["&#10032;", "&#10025;", "&#10028;", "&#10030;", "&#10031;"]*/




    /*function levelUp() {
      console.log(this.state)
    }*/


    /*const hehe = '\u{2729}'*/

    return (
      <div className="training-page">
        <h2 className="training-title">Теперь вы готовы проводить поединки и прокачивать скиллы!</h2>
        <div className="training-content">
          <a className="training-to-creation" href="/creation">Вернуться к созданию</a>
          <div className="training-character">
            <div className="training-avatar"></div>
            <div className="training-atributes">
              <h5>Базовые параметры</h5>
              <div className="training-atribute strength">
                <p>Сила</p>
                <p>{this.state.strength}</p>
              </div>
              <div className="training-atribute agility">
                <p>Ловкость</p>
                <p>{this.state.agility}</p>
              </div>
              <div className="training-atribute intelligence">
                <p>Интеллект</p>
                <p>{this.state.intelligence}</p>
              </div>
              <div className="training-atribute charisma">
                <p>Харизма</p>
                <p>{this.state.charisma}</p>
              </div>
            </div>
            <div className="training-additonal-atributes">
              <h5>Дополнительные параметры</h5>
              <div className="training-atribute training-additional-atribute">
                <p>Жизненная сила</p>
                <p>{3 + this.state.strength}</p>
              </div>
              <div className="training-atribute training-additional-atribute">
                <p>Уклонение</p>
                <p>{10 + this.state.agility}</p>
              </div>
              <div className="training-atribute training-additional-atribute">
                <p>Энергичность</p>
                <p>{this.state.agility + this.state.intelligence}</p>
              </div>
            </div>
          </div>
          <div className="training-second-row">
            <div className="actions">
              <h3 className="character-name">{this.state.name}</h3>
              <div className="fighting">
                <div className="save-progress" onClick={this.saveCharacter}>СОХРАНИТЬ ПРОГРЕСС</div>
                <div className="fight-button" onClick={this.checkLocal}>ДРАКА!</div>
              </div>
              <div className="description"></div>
            </div>
            <div className="skills-section">
              <h3 className="skills-title">Скиллы</h3>
              <div className="skill-points">
                Доступные очки улучшения:{" "}
                <span>{this.state.skillPoints}</span>
              </div>
              <div className="skills-content">
                <div className="skills-first-column skills">
                  <div className="training-atribute strength">
                    <p>Атака</p>
                    <p>&#10032;</p>
                  </div>
                  <div className="training-atribute agility">
                    <p>Стелс</p>
                    <p>&#10025;</p>
                  </div>
                  <div className="training-atribute agility">
                    <p>Стрельба из лука</p>
                    <p>&#10028;</p>
                  </div>
                  <div className="training-atribute intelligence">
                    <p>Обучаемость</p>
                    <p>&#10030;</p>
                  </div>
                  <div className="training-atribute intelligence">
                    <p>Выживание</p>
                    <p>&#10031;</p>
                  </div>
                </div>
                <div className="skills-second-column skills">
                  <div className="training-atribute intelligence">
                    <p>Медицина</p>
                    <p>&#10031;</p>
                  </div>
                  <div className="training-atribute charisma">
                    <p>Запугивание</p>
                    <p>&#10031;</p>
                  </div>
                  <div className="training-atribute charisma">
                    <p>Проницательность</p>
                    <p>&#10031;</p>
                  </div>
                  <div className="training-atribute charisma">
                    <p>Внешний вид</p>
                    <p>&#10031;</p>
                  </div>
                  <div className="training-atribute charisma">
                    <p>Манипулирование</p>
                    <p className="idk" onClick={(e) => this.levelUp(e)}>{stars[0]}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Training