function init() {
  // ! Elements
  const grid = document.querySelector('.game-display')
  const lives = document.querySelector('#lives')
  const high = document.querySelector('#high-score')
  const startButton = document.querySelector('#start-button')
  const restartButton = document.querySelector('#restart-button')
  const score = document.querySelector('.score')
  const buttons = document.querySelectorAll('.btns')
  const audio = document.querySelector('audio')
  audio.volume = 0.75
  // const spaceAudio = document.querySelector('#audio_space')

 

  // map out cells of the grid onto an array
  const cells = Array.from(document.querySelectorAll('.grid div'))

  // Disable restart at the beginning.
  restartButton.disabled = true

  const width = 10
  const cellCount = width * width
  let inPlay = false
  let invadersSpeed = 1000
  let currentScore = 0
  let highScore = 0
  let currentLives = 3
  const rightSide = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
  const leftSide = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]

  const startingPosition = 95
  let currentPosition = startingPosition
  let bulletTimeouts = []

  let direction = 0

  // Invaders Class
  const invaderClass = 'demo'
  const startingInvaders = [
    1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25,
    26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38]

  let strangeInvaders = Array.from(startingInvaders) // same array with new ref

  //Events
  document.addEventListener('keydown', heroMovement)
  startButton.addEventListener('click', startGame)
  restartButton.addEventListener('click', resetGame)
  document.addEventListener('keydown', force)
  buttons.forEach(btn => btn.addEventListener('click', playAudio))

  //! Audio
  function playAudio(event){
    audio.src = (`sounds/${event.target.dataset.src}.mp3`)
    audio.play()
    console.log('sound playing')
  }



  //! Levels
  function addnewSetInvaders() {
    alert('Oh, you thought you won...')
    if (invadersSpeed > 700) {
      invadersSpeed -= 100
    }
    strangeInvaders = Array.from(startingInvaders)
    addInvaders(startingInvaders)
    moveInvaders()
  }

  //! Get High Score
  function getHighScore() {
    highScore = parseInt(localStorage.getItem('highScore')) || 0;
    console.log('highScore->', highScore)
    high.innerHTML = `${highScore}`
  }

  //! Grid for display
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
    }
    addHero(startingPosition)
    addInvaders(startingInvaders)
  }

  //! Add hero to position
  function addHero(currentPosition) {
    cells[currentPosition].classList.add('hero')
  }

  function removeHero() {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].classList.contains('hero')) {
        cells[i].classList.remove('hero')
        console.log('remove hero')
      }
    }
  }

  //! Right & Left movement
  function heroMovement(event) {
    const keyCode = event.keyCode
    const left = 37
    const right = 39

    if (inPlay && left === keyCode && currentPosition % width !== 0) {
      removeHero()
      currentPosition -= 1
      addHero(currentPosition)
    } else if (
      inPlay &&
      right === keyCode &&
      currentPosition % width !== width - 1
    ) {
      removeHero()
      currentPosition += 1
      addHero(currentPosition)
    } else if (currentLives === 0) {
      removeHero()
      window.alert(`Game Over\n Final Score ${currentScore}`)
    } else {
      lives.innerHTML = `${currentLives}`
    }
  }

  //! Add invaders to the cell at the beginning
  function addInvaders(x) {
    for (let i = 0; i < x.length; i++) {
      const invaderCell = cells[x[i]]
      if (invaderCell) invaderCell.classList.add('demo')
      console.log('invader', invaderCell)
    }
  }

  //! Removes invaders
  function removeInvaders() {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].classList.contains('demo')) cells[i].classList.remove('demo')
    }
  }

  // ! Shooting === HERO
  function addForce(forcePosition) {
    const thisCell = cells[forcePosition]
    thisCell.classList.add('elevenForce')
  }

  function removeForce(forcePosition) {
    const thisCell = cells[forcePosition]
    thisCell?.classList.remove('elevenForce')
  }

  //! Force from the hero
  function force(event) {
    const keyCode = event.keyCode
    const upMove = 32
    let forcePosition = currentPosition
    if (upMove === keyCode && forcePosition >= width) {
      const timer = setInterval(() => {
        // move missile/force up
        removeForce(forcePosition)
        forcePosition -= width
        if (cells[forcePosition]) {
          const loadedSquare = cells[forcePosition].classList.contains('demo')
          if (loadedSquare) {
            cells[forcePosition].classList = ''
            strangeInvaders.splice(strangeInvaders.indexOf(forcePosition), 1)
            currentScore += 100
            score.innerHTML = currentScore
            clearInterval(timer)
            if (strangeInvaders.length === 0) {
              bulletTimeouts.forEach(intervalTimer => clearInterval(intervalTimer))
              bulletTimeouts = []
              addnewSetInvaders(startingInvaders)
            }
          } else {
            addForce(forcePosition)
          }
        } else {
          clearInterval(timer)
        }
      }, 250)
    }
  }

  //! Shots to fire from random length of the alienInvaders
  function addShots(pos) {
    if (cells[pos]) {
      cells[pos].classList.add('rShooter')
    }
  }

  function removeShots(pos) {
    if (cells[pos]) {
      cells[pos].classList.remove('rShooter')
    }
  }

  function shots() {
    let currentShotPos =
      strangeInvaders[Math.floor(Math.random() * strangeInvaders.length)]
    if (currentLives === 0) {
      removeShots(currentShotPos)
      endGame()
      console.log('game ended')
    }
    const shotsInterval = setInterval(() => {
      removeShots(currentShotPos)
      if (currentShotPos <= cellCount - width) {
        currentShotPos += width

        addShots(currentShotPos)
        const containsHero = cells[currentShotPos]
        if (containsHero && containsHero.classList.contains('hero')) {
          if (currentLives > 0) {
            currentLives -= 1
          }

          lives.innerHTML = `${currentLives}`
          clearInterval(shotsInterval)
        }
      } else {
        clearInterval(shotsInterval)
      }
    }, 3000)
  }

  //! Moving invaders
  function moveInvaders() {
    const invaderInterval = setInterval(() => {
      removeInvaders()
      if (direction) {
        const someTouchingLeft = strangeInvaders.some((invader) => {
          return leftSide.includes(invader)
        })
        if (someTouchingLeft) {
          direction = !direction
          for (let i = 0; i < strangeInvaders.length; i++) {
            strangeInvaders[i] += width
            // shots([Math.floor(Math.random() * 1)])
          }
        } else {
          for (let i = 0; i < strangeInvaders.length; i++) {
            strangeInvaders[i] -= 1
          }
        }
      } else {
        const someTouchingRight = strangeInvaders.some((invader) => {
          return rightSide.includes(invader)
        })
        if (someTouchingRight) {
          direction = !direction
          for (let i = 0; i < strangeInvaders.length; i++) {
            strangeInvaders[i] += width
          }
        } else {
          for (let i = 0; i < strangeInvaders.length; i++) {
            strangeInvaders[i] += 1
          }
        }
        if (strangeInvaders.some((invader) => invader >= 99)) {
          clearInterval(invaderInterval)
          removeInvaders()
          removeShots()
          endGame()
        }
      }
      if (currentLives > 0) addInvaders(strangeInvaders)
    }, invadersSpeed)
  }

  //! Start Game
  function startGame() {
    const shotsInterval = setInterval(() => {
      shots()
      if (currentLives === 0) {
        clearInterval(shotsInterval)
        console.log('current lives')
      }
    }, 200)
    getHighScore()
    addHero(startingPosition)
    addInvaders(startingInvaders)
    moveInvaders()
    startButton.disabled = true
    restartButton.disabled = false
    inPlay = true
    currentScore = 0
    currentLives = 3
    score.innerHTML = currentScore
    lives.innerHTML = `${currentLives}`
  }

  //! Reset Game
  function resetGame() {
    strangeInvaders = startingInvaders
    addInvaders(startingInvaders)
    removeHero()
    startGame()
  }

  //! End Game
  function endGame() {
    if (currentScore > highScore) {
      window.alert(`New High Score! \n${currentScore}`)
      localStorage.setItem('highScore', currentScore)
      getHighScore()
    }
    startButton.disabled = false
    inPlay = false
    removeHero()
    removeShots()
    removeInvaders(strangeInvaders)
  }

  createGrid()
}

window.addEventListener('DOMContentLoaded', init)
