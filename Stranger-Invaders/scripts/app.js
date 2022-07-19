function init() {

  // ! Elements
  const grid = document.querySelector('.game-display')
  const lives = document.querySelector('#lives')
  const high = document.querySelector('#high-score')
  const startButton = document.querySelector('#start-button')
  const restartButton = document.querySelector('#restart-button')
  const score = document.querySelector('.score')
  // const userName = document.querySelector('.username-btn')
  const demo = document.querySelector('.demo')
  const shooter = document.getElementsByClassName('rShooter')
  const elevenForce = document.getElementsByClassName('eForce')
  const hero = document.getElementsByClassName('hero')
  const buttons = document.querySelectorAll('.btns')
  startButton.disabled = false
  restartButton.disabled = true

  // map out cells of the grid
  const cells = Array.from(document.querySelectorAll('.grid div'))

  // Disable restart at the beginning.
  restartButton.disabled = true

  // ! Variables
  const width = 10
  const cellCount = width * width
  const topGrid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const bottomGrid = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
  let cell = []
  let invadersSpeed = 1500
  let currentScore = 0
  let currentLives = '3'
  // let timesPlay = 0
  let height = width
  const rightSide = grid[9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
  const leftSide = grid[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]


  // const startingInvaders = [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 
  //   18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37,38]



  // Character class
  // const charClass = 'hero'
  const startingPosition = 95
  let currentPosition = startingPosition

  let forcePosition = startingPosition

  // Invaders Class
  const invaderClass = 'demo'
  const startingInvaders = [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17,
    18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38]
  
  let strangeInvaders = startingInvaders

  // Getting the high score
  function getHighScore() {
    highScore = parseInt(localStorage.getItem('high-score')) || 0;
    console.log('highScore ->', highScore)
    high.innerHTML = (`${highScore}`)
  }


  // Grid for display
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      let cell = document.createElement('div')
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
    }
    addHero(startingPosition)
    addForce(forcePosition)
  }

  // Add hero to position
  function addHero(currentPosition) {
    const hero = document.getElementsByClassName('hero')
    cells[currentPosition].classList.add('hero')
  }

  function removeHero(currentPosition) {
    const hero = document.getElementsByClassName('hero')
    cells[currentPosition].classList.remove('hero')
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
    } else if (currentLives === - 1) {
      window.alert(`Game Over\n Final Score ${currentScore}`)
    } else {
      lives.innerHTML = (`${currentLives}`)
    }





    // addInvaders(startingInvaders)
  }

  // Add invaders to the cell at the beginning
  function addInvaders() {
    // clearInterval()
    // const startingInvaders = [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 
    //   18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37,38]
    for (let i = 0; i < startingInvaders.length; i++)
      if (!invaderClass.includes(i)) {
        cells[startingInvaders[i]].classList.add('demo')
      }
  }

  // // Similar to whack-a-mole game
  // function removeInvaders(startingInvaders) {s
  //   if (elevenForce === demo)
  //     startingInvaders.classList.remove('demo')
  //   elevenForce.classList.remove('elevenForce')
  //   currentScore += 100
  // }

    // Add force to position
    function addForce(forcePosition) {
      // clearInterval(interval)
      const elevenForce = document.getElementsByClassName('elevenForce')
      cells[forcePosition].classList.add('elevenForce')
    }
  

    function removeForce(forcePosition) {
      const elevenForce = document.getElementsByClassName('elevenForce')
      cells[forcePosition].classList.remove('elevenForce')
    }

    // function removeInvaders(startingInvaders) {
    //   addForce()
    //   if (elevenForce === demo)
    //     startingInvaders.classList.remove('demo')
    //   elevenForce.classList.remove('elevenForce')
    //   currentScore += 100
    //   removeForce()
    // }

  // Trying to add hero to the same cells as hero so that they move together.
  function force(event) {
    const keyCode = event.keyCode
    const spaceUp = 32
    const left = 37
    const right = 39
    if (left === keyCode && forcePosition % width !== 0) {
      removeForce(forcePosition)
      forcePosition -= 1
      addForce(forcePosition)
    } else if (right === keyCode && forcePosition % width !== width - 1) {
      removeForce(forcePosition)
      forcePosition += 1
      addForce(forcePosition)
  if (spaceUp === keyCode && forcePosition) {
    for (let i = 0; i < demo.length; i++){
    if (elevenForce === demo)
    startingInvaders.classList.remove('demo', 'elevenForce')
    score += 100
  }
}
  }
}

function addShots(strangeInvaders) {
  const shooter = document.getElementsByClassName('shooter')
  cells[strangeInvaders].classList.add('shooter')
  if (shooter){
    return
  }
}


function removeShots(strangeInvaders) {
  // const shooter = document.getElementsByClassName('.rShooter')
  cells[strangeInvaders].classList.remove('shooter')
}
  // for (let i = 0; i < startingInvaders.length; i++) {
  //   cell[startingInvaders[i]].classList.remove('demo')

  // Shots to fire from random length of the alienInvaders as this will cover the grid.
  function shots(){
    // shooter.classList.add('shooter')
    const randomShots = startingInvaders[Math.floor(Math.random() * (startingInvaders.length - 2))]
    addShots()
    if (shots === hero){
      currentLives -= 1
      removeShots()
    } else {
      removeShots(bottomGrid)
    }
  }


  function moveInvaders(){
    if (startingInvaders !== rightSide)
     for (let i = 0; i < rightSide; i++) {
       startingInvaders[i] = currentPosition += width
       shots()
     }
     if (startingInvaders === rightSide)
     for (let i = 0; i < leftSide; i++){
       startingInvaders[i] = currentPosition -= width - 1
       shots()
     } else if (startingInvaders === hero){
       window.alert(`Game Over`)
     }
    for (let i = 0; i < startingInvaders.length; i++)
    if(!invaderClass.includes(i)) {
     cells[startingInvaders[i]].classList.add('demo')
    }
  } 
  
 

  // function shooter() {


  // }


  function startGame() {
    getHighScore()
    addHero(startingPosition)
    addInvaders(startingInvaders)
    moveInvaders()
    shots()
    startButton.disabled = true
    restartButton.disabled = false
    currentScore = 0
    currentLives = `${currentLives}`
    // lives.innerHTML = (`${currentLives}`)
    score.innerHTML = (`${currentScore}`)
    // createGrid() 
    // addInvaders(startingInvaders)
    lives.innerHTML = '❤️'.repeat(currentLives)
    interval = setInterval(moveInvaders, invadersSpeed)

    // topScoreDisplay.innerHTML = url('./images/heart.gif').repeat(lives)
    
    // Need to add an if statement in here for if the invaders are hit then remove a life
    if (shots === hero) {
      currentLives--
      lives.innerHTML = lives ? '❤️'.repeat(lives) : "💔"
      if (currentLives === 0) {
        removeInvaders()
        removeHero()
        return endGame()
      }
    }
  }

  function resetGame() {
    clearInterval(interval)
    let lives = 3
    let score = 0
    invadersSpeed = 1500
    // buttons.forEach(btn => btn.classList.remove('demo', 'hero'))
    // removeHero()
    startGame()
  }

  function endGame() {
    clearInterval(interval)
    if (currentScore > highScore) {
      window.alert(`New High Score!\n ${currentScore}`)
      localStorage.setItem('highScore', currentScore)
      getHighScore()
    }
    // startButton.disabled = false
    currentLives = 3
    currentScore = 0
    invadersSpeed = 1500
    buttons.forEach(btns => btns.classList.remove('demo'))
  
  }





  createGrid()

  document.addEventListener('keydown', heroMovement)
  startButton.addEventListener('click', startGame)
  restartButton.addEventListener('click', resetGame)
  document.addEventListener('keydown', force)
  // window.onload = function startGame() {}



}
window.addEventListener('DOMContentLoaded', init)
