import React from 'react'
import Skill from '../components/Skill'

/*звезды уровней скиллов*/
const stars = ['\u{2730}', '\u{2729}', '\u{272B}', '\u{272C}', '\u{272E}', '\u{272F}']
/*уровни скиллов*/
const lvls = ['Нетренированный', 'Новичок', 'Ученик', 'Адепт', 'Эксперт', 'Мастер']
/*2 массива для определения привязки скилла к базовому параметру и имя параметра с одинаковыми индексами*/
const attributeDependencies = ['strength', 'agility', 'intelligence', 'charisma']
const atributeTranslated = ['Сила', 'Ловкость', 'Интеллект', 'Харизма']
/*описание при наведении*/
const descriptions = {
  avatar: 'Ваш пушистый герой собственной персоной',
  fight: `Драка! Победа принесёт очко для прокачки скиллов, поражение уменьшит показатель жизненной силы. Удачи!`,
  save: `Нажмите для того чтобы сохранить персонажа и прогресс прокачки. Вы сможете продолжить игру в удобное для вас время.`,
  atributes: `Значение задает порог прокачки скиллов(макс. 5). Вы можете определить привязку скиллов к параметрам по соотвествующим цветам.`,
  name: 'Имя вашего персонажа',
  skill: 'Каждый скилл привязан к базовому параметру и не может быть прокачан сверх значения этого параметра. Привязку можно определить по цвету'
}

class Training extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      strength: 0,
      agility: 0,
      intelligence: 0,
      charisma: 0,
      skillPoints: 2,
      health: 0,
      skillLvls: {/*здесь записывается уровень скиллов*/
        attack: '\u{2730}', stealth: '\u{2730}', archery: '\u{2730}', learnability: '\u{2730}',
        survival: '\u{2730}', medicine: '\u{2730}', intimidation: '\u{2730}', insight: '\u{2730}', appearance: '\u{2730}', manipulation: '\u{2730}'
      },
      description: `Пришло время поединков и тренировки. Для тренировки скиллов нужно добыть очки улучшения в поединках. Попробуйте нажать кнопку 'Драка!'`
    }
    this.saveCharacter = this.saveCharacter.bind(this)
    this.fight = this.fight.bind(this)
    this.showDescription = this.showDescription.bind(this)
    this.hideDescription = this.hideDescription.bind(this)
    this.skillDescription = this.skillDescription.bind(this)
    this.skillUp = this.skillUp.bind(this)
  }

  componentDidMount() { /*значения параметров и скиллов берутся из localstorage*/
    if (localStorage.length !== 0) {
      this.setState({
        name: localStorage.getItem('name'),
        strength: Number(localStorage.getItem('strength')),
        agility: Number(localStorage.getItem('agility')),
        intelligence: Number(localStorage.getItem('intelligence')),
        charisma: Number(localStorage.getItem('charisma')),
        skillPoints: Number(localStorage.getItem('skillPoints')),
        health: Number(localStorage.getItem('health')),
        skillLvls: JSON.parse(localStorage.getItem("skillLvls"))
      })
    } else {
      this.setState({
        name: sessionStorage.getItem('name'),
        strength: Number(sessionStorage.getItem('strength')),
        agility: Number(sessionStorage.getItem('agility')),
        intelligence: Number(sessionStorage.getItem('intelligence')),
        charisma: Number(sessionStorage.getItem('charisma')),
        health: Number(sessionStorage.getItem('health'))
      })
    }
  }

  showDescription(descriptionKey) { /*описание в окне при наведении на элементы*/
    this.setState({ description: descriptions[descriptionKey] })
  }

  skillDescription(e) { /*описание для уровней скилла при наведении на звезду*/
    const index = stars.indexOf(e.target.textContent)
    this.setState({
      description: `Уровень скилла ${e.target.previousElementSibling.textContent} ${index}: ${lvls[index]}`
    })
  }

  hideDescription() {
    this.setState({ description: '' })
  }

  saveCharacter() { /*записываем данные персонажа в localstorage*/
    const { name, strength, agility, intelligence, charisma, skillPoints, health } = this.state;
    localStorage.setItem('name', name)
    localStorage.setItem('strength', strength)
    localStorage.setItem('agility', agility)
    localStorage.setItem('intelligence', intelligence)
    localStorage.setItem('charisma', charisma)
    localStorage.setItem('skillPoints', skillPoints)
    localStorage.setItem('health', health)
    localStorage.setItem("skillLvls", JSON.stringify(this.state.skillLvls))
    alert('Персонаж и прогресс успешно сохранены! Вы сможете продолжить сохраненную игру с помощью кнопки `Продолжить` на основном экране либо перезайдя на данную страницу.')
  }

  skillUp(skill, e) {
    /*ищем класс компонента skill в массиве с атрибутами и передаем значение и имя для алерта*/
    let dependentAtributeValue;
    let dependentAtributeName;
    for (let i = 0; i < attributeDependencies.length; i++) {
      if (e.target.parentElement.classList.contains(attributeDependencies[i])) {
        dependentAtributeName = atributeTranslated[i]
        dependentAtributeValue = this.state[attributeDependencies[i]]
      }
    }

    /*проверяем наличие скилл поинтов, уровень скиллов по сравнению нужным параметром*/
    if (stars.indexOf(this.state.skillPoints > 0 && this.state.skillLvls[skill]) >= dependentAtributeValue) {
      alert(`Уровень прокачки скилла '${e.target.previousElementSibling.textContent}' не может превышать показатель параметра ${dependentAtributeName}: ${dependentAtributeValue}`)
    } else if (stars.indexOf(this.state.skillLvls[skill]) < 5 && this.state.skillPoints > 0 && stars.indexOf(this.state.skillLvls[skill]) < dependentAtributeValue) {
      if (!e.target.classList.contains('timon') && !e.target.classList.contains('pumbaa')) {
        e.target.classList.add('timon') /*тоггл для анимаций прокачки*/
      } else {
        e.target.classList.toggle('timon')
        e.target.classList.toggle('pumbaa')
      }
      this.setState(prevState => ({ /*тратим скиллпоинт и записываем в стейт уровень скилла*/
        skillPoints: prevState.skillPoints - 1,
        skillLvls: {
          ...prevState.skillLvls,
          [skill]: stars[stars.indexOf(prevState.skillLvls[skill]) + 1]
        },
        description: `Уровень скилла ${e.target.previousElementSibling.textContent} ${stars.indexOf(prevState.skillLvls[skill]) + 1}: ${lvls[stars.indexOf(prevState.skillLvls[skill]) + 1]}`
      }))

    }
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
        alert(`${this.state.name} доблестно пал в бою =( Game Over!\n\nСовет: Высокое значение параметра силы положительно влияет на живучесть персонажа`)
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
          <div className="training-actions">
            <div className="training-avatar" onMouseEnter={() => this.showDescription('avatar')} onMouseLeave={this.hideDescription}></div>
            <div className="actions">
              <h3 onMouseEnter={() => this.showDescription('name')} onMouseLeave={this.hideDescription} className="character-name">{this.state.name}</h3>
              <div className="fighting">
                <div className="save-progress" onMouseEnter={() => this.showDescription('save')} onMouseLeave={this.hideDescription} onClick={this.saveCharacter}>СОХРАНИТЬ</div>
                <div className="fight-button" onMouseEnter={() => this.showDescription('fight')} onMouseLeave={this.hideDescription} onClick={this.fight}>ДРАКА!</div>
              </div>
              <div className="description"><p>{this.state.description}</p></div>
            </div>
            {/*  */}

          </div>
          <div className="training-parameters">
            <div className="training-atributes-stuff">
              <div className="training-atributes" onMouseEnter={() => this.showDescription('atributes')} onMouseLeave={this.hideDescription}>
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
                <div className="skills">
                  <Skill
                    dependentParameter='strength '
                    skillName='attack'
                    skillTitle='Атака'
                    skillState={this.state.skillLvls.attack}
                    showDescription={this.showDescription}
                    hideDescription={this.hideDescription}
                    skillDescription={this.skillDescription}
                    skillUp={this.skillUp}
                  ></Skill>
                  <Skill strength attack
                    dependentParameter='agility'
                    skillName='stealth'
                    skillTitle='Стелс'
                    skillState={this.state.skillLvls.stealth}
                    showDescription={this.showDescription}
                    hideDescription={this.hideDescription}
                    skillDescription={this.skillDescription}
                    skillUp={this.skillUp}
                  ></Skill>
                  <Skill stealth
                    dependentParameter='agility'
                    skillName='archery'
                    skillTitle='Стрельба из лука'
                    skillState={this.state.skillLvls.archery}
                    showDescription={this.showDescription}
                    hideDescription={this.hideDescription}
                    skillDescription={this.skillDescription}
                    skillUp={this.skillUp}
                  ></Skill>
                  <Skill agility archery
                    dependentParameter='intelligence'
                    skillName='learnability'
                    skillTitle='Обучаемость'
                    skillState={this.state.skillLvls.learnability}
                    showDescription={this.showDescription}
                    hideDescription={this.hideDescription}
                    skillDescription={this.skillDescription}
                    skillUp={this.skillUp}
                  ></Skill>
                  <Skill
                    dependentParameter='intelligence'
                    skillName='survival'
                    skillTitle='Выживание'
                    skillState={this.state.skillLvls.survival}
                    showDescription={this.showDescription}
                    hideDescription={this.hideDescription}
                    skillDescription={this.skillDescription}
                    skillUp={this.skillUp}
                  ></Skill>
                </div>
                <div className="skills">
                  <Skill
                    dependentParameter='intelligence'
                    skillName='medicine'
                    skillTitle='Медицина'
                    skillState={this.state.skillLvls.medicine}
                    showDescription={this.showDescription}
                    hideDescription={this.hideDescription}
                    skillDescription={this.skillDescription}
                    skillUp={this.skillUp}
                  ></Skill>
                  <Skill
                    dependentParameter='charisma'
                    skillName='intimidation'
                    skillTitle='Запугивание'
                    skillState={this.state.skillLvls.intimidation}
                    showDescription={this.showDescription}
                    hideDescription={this.hideDescription}
                    skillDescription={this.skillDescription}
                    skillUp={this.skillUp}
                  ></Skill>
                  <Skill
                    dependentParameter='charisma'
                    skillName='insight'
                    skillTitle='Проницательность'
                    skillState={this.state.skillLvls.insight}
                    showDescription={this.showDescription}
                    hideDescription={this.hideDescription}
                    skillDescription={this.skillDescription}
                    skillUp={this.skillUp}
                  ></Skill>
                  <Skill
                    dependentParameter="charisma"
                    skillName='appearance'
                    skillTitle='Внешний вид'
                    skillState={this.state.skillLvls.appearance}
                    showDescription={this.showDescription}
                    hideDescription={this.hideDescription}
                    skillDescription={this.skillDescription}
                    skillUp={this.skillUp}
                  ></Skill>
                  <Skill
                    dependentParameter='charisma'
                    skillName='manipulation'
                    skillTitle='Манипулирование'
                    skillState={this.state.skillLvls.manipulation}
                    showDescription={this.showDescription}
                    hideDescription={this.hideDescription}
                    skillDescription={this.skillDescription}
                    skillUp={this.skillUp}
                  ></Skill>
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
