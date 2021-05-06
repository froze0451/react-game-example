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
      skillPoints: 0,
      health: 0,
      skillLvls: { manipulation: '\u{2730}', appearance: '\u{2729}' }
      /*skillLvls: ['\u{2730}', '\u{2729}', '\u{272C}']*/
    }
    this.saveCharacter = this.saveCharacter.bind(this)
    this.fight = this.fight.bind(this)
  }

  componentDidMount() {
    const number = document.querySelectorAll('.skills-content .training-atribute')
    console.log(number)
    if (localStorage.length !== 0) {
      this.setState({
        name: localStorage.getItem('name'),
        strength: Number(localStorage.getItem('strength')),
        agility: Number(localStorage.getItem('agility')),
        intelligence: Number(localStorage.getItem('intelligence')),
        charisma: Number(localStorage.getItem('charisma')),
        skillPoints: Number(localStorage.getItem('skillPoints')),
        health: Number(localStorage.getItem('health'))
      })
    } else {
      this.setState({
        name: sessionStorage.getItem('name'),
        strength: Number(sessionStorage.getItem('strength')),
        agility: Number(sessionStorage.getItem('agility')),
        intelligence: Number(sessionStorage.getItem('intelligence')),
        charisma: Number(sessionStorage.getItem('charisma')),
        skillPoints: Number(sessionStorage.getItem('skillPoints')),
        health: Number(sessionStorage.getItem('health'))
      })
    }
  }


  saveCharacter() {
    const { name, strength, agility, intelligence, charisma, skillPoints, health } = this.state;
    localStorage.setItem('name', name)
    localStorage.setItem('strength', strength)
    localStorage.setItem('agility', agility)
    localStorage.setItem('intelligence', intelligence)
    localStorage.setItem('charisma', charisma)
    localStorage.setItem('skillPoints', skillPoints)
    localStorage.setItem('health', health)
    alert('Персонаж и прогресс успешно сохранены! Вы сможете продолжить сохраненную игру с помощью кнопки `Продолжить` на основном экране.')
  }

  /*checkLocal() {
    console.log('sessionStorage length: ', sessionStorage.length)
    console.log('localStorage length: ', localStorage.length)
  }*/

  levelUp(e) {
    console.log(this.state)

    if (stars.indexOf(e.target.textContent) < 4 && this.state.skillPoints > 0) {
      /*e.target.classList.remove('idk')
      e.target.classList.add('idk')*/
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

  skillUp(skill) {
    const stars = ['\u{2730}', '\u{2729}', '\u{272C}', '\u{272E}', '\u{272F}']
    this.setState((prevState) => {
      return {
        skillLvls[skill]: stars[stars.indexOf(prevState.skillLvls[skill]) + 1]
      }
    })
  }

  fight() {
    let fightResult = Math.random()
    if (fightResult >= 0.5) {
      alert('Победа! Вы получили допольнительное очко для прокачки скиллов!')
      this.setState((prevState) => {
        return {
          skillPoints: prevState.skillPoints + 1
        }
      })
    } else {
      this.setState((prevState) => {
        return {
          health: prevState.health - 1
        }
      })
      if (this.state.health === 1) {
        alert(`${this.state.name} доблестно пал в бою =( Game Over!`)
        localStorage.clear()
        window.location.href = '/'
      } else {
        alert('Вы проиграли битву! Показатель вашей жизненной силы уменьшился.')
      }
    }
  }

  render() {
    return (
      <div className="training-page">
        <h2 className="training-title">Теперь вы готовы проводить поединки и прокачивать скиллы!</h2>
        <div className="training-content">
          <a className="training-to-creation" href="/creation">Вернуться к созданию</a>
          <div className="training-character">
            <div className="training-avatar"></div>
            <div className="actions">
              <h3 className="character-name">{this.state.name}</h3>
              <div className="fighting">
                <div className="save-progress" onClick={this.saveCharacter}>СОХРАНИТЬ ПРОГРЕСС</div>
                <div className="fight-button" onClick={this.fight}>ДРАКА!</div>
              </div>
              <div className="description"></div>
            </div>
            {/*  */}

          </div>
          <div className="training-second-row">
            <div className="training-atributes-stuff">
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
                  <p>{this.state.health}</p>
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
            {/* */}
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
                    <p onClick={(e) => this.levelUp(e)}>{stars[0]}</p>
                  </div>
                  <div className="training-atribute agility">
                    <p>Стелс</p>
                    <p onClick={(e) => this.levelUp(e)}>{stars[0]}</p>
                  </div>
                  <div className="training-atribute agility">
                    <p>Стрельба из лука</p>
                    <p onClick={(e) => this.levelUp(e)}>{stars[0]}</p>
                  </div>
                  <div className="training-atribute intelligence">
                    <p>Обучаемость</p>
                    <p onClick={(e) => this.levelUp(e)}>{stars[0]}</p>
                  </div>
                  <div className="training-atribute intelligence">
                    <p>Выживание</p>
                    <p onClick={(e) => this.levelUp(e)}>{stars[0]}</p>
                  </div>
                </div>
                <div className="skills-second-column skills">
                  <div className="training-atribute intelligence">
                    <p>Медицина</p>
                    <p onClick={(e) => this.levelUp(e)}>{stars[0]}</p>
                  </div>
                  <div className="training-atribute charisma">
                    <p>Запугивание</p>
                    <p onClick={(e) => this.levelUp(e)}>{stars[0]}</p>
                  </div>
                  <div className="training-atribute charisma">
                    <p>Проницательность</p>
                    <p onClick={(e) => this.levelUp(e)}>{this.state.skillLvls[2]}</p>
                  </div>
                  <div className="training-atribute charisma">
                    <p>Внешний вид</p>
                    <p onClick={(e) => this.levelUp(e)}>{this.state.skillLvls.appearance}</p>
                  </div>
                  <div className="training-atribute charisma">
                    <p>Манипулирование</p>
                    <p className="idk" onClick={(e) => this.levelUp(e)}>{this.state.skillLvls.manipulation}</p>
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