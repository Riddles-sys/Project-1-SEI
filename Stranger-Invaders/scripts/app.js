function init() {
  // ! Elements
  const grid = document.querySelector('.game-display')
  const lives = document.querySelector('#lives')
  const high = document.querySelector('#high-score')
  const startButton = document.querySelector('#start-button')
  const restartButton = document.querySelector('#restart-button')
  const score = document.querySelector('.score')
  const demo = document.querySelector('.demo')
  const shooter = document.querySelectorAll('.rShooter')
  const elevenForce = document.querySelector('.eForce')
  const hero = document.getElementsByClassName('hero')
  const buttons = document.querySelectorAll('.btns')
  // console.log('demo', demo);
  // console.log('force', elevenForce);
  // console.log('hero', hero);
  // console.log('buttons', buttons);

  // map out cells of the grid onto an array
  const cells = Array.from(document.querySelectorAll('.grid div'))

  // console.log('shooter', shooter);

  // Disable restart at the beginning.
  restartButton.disabled = true

  const width = 10
  const cellCount = width * width
  const topGrid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const bottomGrid = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
  // let cell = []
  let invadersSpeed = 10000
  let currentScore = 0
  let currentLives = '3'
  // let timesPlay = 0
  const rightSide = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
  const leftSide = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
  // console.log('right', rightSide);
  // Character class
  // const charClass = 'hero'
  const startingPosition = 95
  let currentPosition = startingPosition
  // let forcePosition = startingPosition

  let direction = - 1

  // Invaders Class
  const invaderClass = 'demo'
  let startingInvaders = [
    1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25,
    26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38]

  let strangeInvaders = Array.from(startingInvaders) // same array with new ref
  let shooters = strangeInvaders

  // (upMove === keyCode && forcePosition >= width - 10) {
  //   addForce(forcePosition)

  // // Shots to fire from random length of the alienInvaders as this will cover the grid.
  // function shots() {
  //   // shooter.classList.add('shooter')
  //   addShots(shooters)
  //   if (shots === 'hero') {
  //     currentLives -= 1
  //     removeShots(shooters)
  //   } else {
  //     removeShots(bottomGrid)
  //   }
  // }

  // console.log('start', strangeInvaders)

  //Events
  document.addEventListener('keydown', heroMovement)
  startButton.addEventListener('click', startGame)
  restartButton.addEventListener('click', resetGame)
  document.addEventListener('keydown', force)

  // Getting the high score
  function getHighScore() {
    const highScore = parseInt(localStorage.getItem('high-score')) || 0
    // console.log('highScore ->', highScore);
    high.innerHTML = `${highScore}`
  }

  // Grid for display
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
    }
    addHero(startingPosition)
    // addForce(forcePosition) remove
    addInvaders(startingInvaders)
    // addShots()
  }

  // Add hero to position
  function addHero(currentPosition) {
    cells[currentPosition].classList.add('hero')
  }

  function removeHero(currentPosition) {
    // if (currentPosition.classList.contains('hero')) {
    cells[currentPosition].classList.remove('hero')
    // }
  }

  //Right & Left movement
  function heroMovement(event) {
    const keyCode = event.keyCode
    const left = 37
    const right = 39

    if (left === keyCode && currentPosition % width !== 0) {
      removeHero(currentPosition)
      currentPosition -= 1
      addHero(currentPosition)
    } else if (right === keyCode && currentPosition % width !== width - 1) {
      removeHero(currentPosition)
      currentPosition += 1
      addHero(currentPosition)
    } else if (currentLives === -1) {
      window.alert(`Game Over\n Final Score ${currentScore}`)
    } else {
      lives.innerHTML = `${currentLives}`
    }

    // addInvaders(startingInvaders)
  }

  // Add invaders to the cell at the beginning
  function addInvaders() {
    for (let i = 0; i < startingInvaders.length; i++) {
      if (!invaderClass.includes(i)) {
        cells[startingInvaders[i]].classList.add('demo')
      }
    }
  }

  // function addForce(forcePosition) {
  // 	for (let i = 0; i < hero.length; i++){
  // 		if (!forcePosition.includes(i)) {
  // 			thisCell.classList.add('elevenForce')
  // 		}
  // 	}
  // }

  // ! Shooting ==
  // Add force to position
  function addForce(forcePosition) {
    const thisCell = cells[forcePosition]
    // console.log(thisCell);
    thisCell.classList.add('elevenForce')
  }

  function removeForce(forcePosition) {
    const thisCell = cells[forcePosition]
    // console.log(thisCell);
    thisCell?.classList.remove('elevenForce')
    // if (forcePosition === topGrid) thisCell.classList.remove('elevenForce')
    // cells[forcePosition].classList.remove('elevenForce');
  }

  // function removeInvaders(startingInvaders) {
  //   addForce(forcePosition)
  //   if (elevenForce === demo) startingInvaders.classList.remove('demo')
  //   elevenForce.classList.remove('elevenForce')
  //   currentScore += 100

  //   removeForce(topGrid)
  // }

  // // Trying to add hero to the same cells as hero so that they move together.
  // function force(event) {
  //   const keyCode = event.keyCode
  //   const upMove = 32
  //   if (upMove === keyCode && forcePosition >= width) {
  //     let forcePosition = currentPosition
  //     let refreshIntervalId = setInterval(() => {
  //       moveBulletUp(currentPosition, refreshIntervalId)

  //       // forcePosition = - width
  //       // if (cells[forcePosition - 10].classList.length === 1) clearInterval();
  //     }, 250)
  //   } else if (forcePosition < topGrid) {
  //     clearInterval(refreshIntervalId)
  //     // break
  //     // removeForce(forcePosition)
  //     // addForce(forcePosition)
  //   }
  // }
//! Combine
  function force(event) {
    const keyCode = event.keyCode
    const upMove = 32
    let forcePosition = currentPosition
    if (upMove === keyCode && forcePosition >= width) {
      const refreshIntervalId = setInterval(() => {
        // move missile/force up
        removeForce(forcePosition)
        forcePosition -= width
        if (cells[forcePosition]) {
          const loadedSquare = cells[forcePosition].classList.contains('demo')
          if (loadedSquare) {
            cells[forcePosition].classList = ''
            strangeInvaders.splice(strangeInvaders.indexOf(forcePosition), 1)
            console.log('strange new', strangeInvaders)
            // forcePosition = currentPosition
            currentScore += 100
            score.innerHTML = currentScore
            clearInterval(refreshIntervalId)
          } else {
            console.log(score)
            // forcePosition -= 10
            addForce(forcePosition)
            // clearInterval(intId)
          }
        } else {
          clearInterval(refreshIntervalId)
        }
      }, 250)
    }
    // break
    // removeForce(forcePosition)
    // addForce(forcePosition)
  }
  


  function addShots(shooters) {
    for (let i = 0; i < startingInvaders.length; i++) {
      if (!shooters.includes(i)) {
        cells[shooters[i]].classList.add('shooter')
      }
      shooter.forEach((rShooter) => rShooter.classList.add('shooter'))
    }
  }

  function removeShots(shooters) {
    for (let i = 0; i < startingInvaders.length; i++) {
      if (shooters.includes(i)) {
        cells[shooters[i]].classList.remove('shooter')
      }
    }
  }

  // Shots to fire from random length of the alienInvaders as this will cover the grid.
  function shots() {
    // shooter.classList.add('shooter')
    addShots(shooters)
    if (shots === 'hero') {
      currentLives -= 1
      removeShots(shooters)
    } else {
      removeShots(bottomGrid)
    }
  }

  function moveInvaders() {
    const someTouchingRight = startingInvaders.some(invader => {
      return rightSide.includes(invader)
    }) // If any of the invaders touch the right side

    const someTouchingLeft = startingInvaders.some(invader => {
      return leftSide.includes(invader)
    })

    invadersSpeed = setInterval(moveInvaders, invadersSpeed)
    if (startingInvaders.some === rightSide) {
      // checks to see if any are touching the right side. Using 'rightSide' as it helps me to visualise.
      for (let i = 0; i < strangeInvaders.length; i++) {
        // Loops through all the strangerInvaders
        strangeInvaders[i] += width - 1 + 10
      } // to move down
    } else if (startingInvaders.some === leftSide) {
      for (let i = 0; i < strangeInvaders.length; i++) {
        strangeInvaders[i] += width + 1 + 10 // plus one to move it all right
      } // to move down one row
    } else startingInvaders.some === 'hero' // if some invaders touch the hero class it's over.
    // return window.alert('Game Over')
    // console.log(moveInvaders)
    clearInterval(invadersSpeed)
  }

  function startGame() {
    getHighScore()
    addHero(startingPosition)
    addInvaders(startingInvaders)
    moveInvaders()
    // shots(strangeInvaders)
    startButton.disabled = true
    restartButton.disabled = false
    currentScore = 0
    currentLives = `${currentLives}`
    score.innerHTML = currentScore
    lives.innerHTML = currentLives
    // if (shots === 'hero') {
    //   currentLives--
    //   lives.innerHTML = '${currentLives}'
    // } else if (currentLives === 0) {
    //   removeInvaders()
    //   removeHero()
    //   return endGame()
    // }
  }

  const interval = setInterval(moveInvaders, invadersSpeed)

  function resetGame() {
    clearInterval(interval)
    clearInterval(intId)
    clearInterval(refreshIntervalId)
    // let lives = 3
    // let score = 0
    invadersSpeed = 1500
    removeHero()
    startGame()
  }

  function winGame() {
    clearInterval()
    if (startingInvaders.length === 0 && startingPosition.includes('hero')) {
      winGame()
      window.alert('You win!')
    } else startGame()
  }

  function endGame() {
    clearInterval(interval)
    if (startingInvaders.length === 0 || currentLives === 0 || startingInvaders === bottomGrid) {
      endGame()
    } else if (currentScore > high) {
      window.alert(`New High Score!\n ${currentScore}`)
      localStorage.setItem('highScore', currentScore)
      getHighScore()
    }
    startButton.disabled = false
    currentLives = 3
    currentScore = 0
    invadersSpeed = 1500
    buttons.forEach((btns) => btns.classList.remove('demo'))
  }

  createGrid()
}

// window.onload = function startGame() {}

window.addEventListener('DOMContentLoaded', init)

