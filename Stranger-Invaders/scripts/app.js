function init() {

  // ! Elements
  const grid = document.querySelector('.game-display')
  const lives = document.querySelector('#lives')
  const high = document.querySelector('#high-score')
  const startButton = document.querySelector('#start-button')
  const restartButton = document.querySelector('#restart-button')
  const score = document.querySelector('.score')
  const demo = document.querySelector('.demo')
  // const shooter = document.getElementsByClassName('rShooter')
  const shooter = Array.from(document.getElementsByClassName('rShooter'))
  const elevenForce = document.getElementsByClassName('eForce')
  const hero = document.getElementsByClassName('hero')
  const buttons = document.querySelectorAll('.btns')
  console.log('demo', demo)
 
  console.log('force', elevenForce)
  console.log('hero', hero)
  console.log('buttons', buttons)

  

  // map out cells of the grid onto an array
  const cells = Array.from(document.querySelectorAll('.grid div'))

  console.log('shooter', shooter)

  // Disable restart at the beginning.
  restartButton.disabled = true

  const width = 10
  const cellCount = width * width
  const topGrid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const bottomGrid = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
  // let cell = []
  let invadersSpeed = 1500
  let currentScore = 0
  let currentLives = '3'
  // let timesPlay = 0
  const rightSide = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
  const leftSide = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
  console.log('right', rightSide)
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
  console.log('start', strangeInvaders)
  //Events
  document.addEventListener('keydown', heroMovement)
  startButton.addEventListener('click', startGame)
  restartButton.addEventListener('click', resetGame)
  document.addEventListener('keydown', force)

  // Getting the high score
  function getHighScore() {
    const highScore = parseInt(localStorage.getItem('high-score')) || 0
    console.log('highScore ->', highScore)
    high.innerHTML = (`${highScore}`)
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
    addForce(forcePosition)
    addInvaders(startingInvaders)
  }

  // Add hero to position
  function addHero(currentPosition) {
    cells[currentPosition].classList.add('hero')
  }

  function removeHero(currentPosition) {
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
    for (let i = 0; i < startingInvaders.length; i++)
      if (!invaderClass.includes(i)) {
        cells[startingInvaders[i]].classList.add('demo')
      }
  }


  // Add force to position
  function addForce(forcePosition) {
    cells[forcePosition].classList.add('elevenForce')
  }
  

  function removeForce(forcePosition) {
    cells[forcePosition].classList.remove('elevenForce')
  }

  function removeInvaders(startingInvaders) {
    addForce(forcePosition)
    if (elevenForce === demo)
      startingInvaders.classList.remove('demo')
    elevenForce.classList.remove('elevenForce')
    currentScore += 100
    removeForce(topGrid)
  }

  // Trying to add hero to the same cells as hero so that they move together.
  function force(event) {
    const keyCode = event.keyCode
    const upMove = 32
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
    } else if (upMove === keyCode && forcePosition >= width ) {
      addForce(forcePosition)
      forcePosition -= 1
      // startingInvaders.classList.remove('demo')
      currentScore += 100
    }
  }
  


  function addShots() {
    console.log('end', strangeInvaders)
    shooter.forEach(rShooter => rShooter.classList.add('shooter'))
    for (let i = 0; i < strangeInvaders.length; i++)
      if (!strangeInvaders.includes(i)) {
      // Array.from(shooter)
        // console.log('strange', strangeInvaders)
        cells[strangeInvaders].classList.add('shooter')
        console.log('adding shots', addShots)
      // console.log('shots', addShots)
      }
  }


  function removeShots(strangeInvaders) {
    cells[strangeInvaders].classList.remove('shooter')
  }
  // for (let i = 0; i < startingInvaders.length; i++) {
  //   cell[startingInvaders[i]].classList.remove('demo')

  // Shots to fire from random length of the alienInvaders as this will cover the grid.
  function shots(){
    // shooter.classList.add('shooter')
    addShots(strangeInvaders)
    if (shots === 'hero'){
      currentLives -= 1
      removeShots(strangeInvaders)
    } else {
      removeShots(bottomGrid)
    }
  }

  function moveInvaders(){
    if (strangeInvaders.some === rightSide) // checks to see if any are touching the right side. Using 'rightSide' as it helps me to visualise.
      for (let i = 0; i < strangeInvaders.length; i++){ // Loops through all the strangerInvaders
        strangeInvaders[i] += width - 1 // - 1 to move left all of them left
        + 10 // to move down
    } else if (strangeInvaders.some === leftSide)
      for (let i = 0; i < strangeInvaders.length; i++) {
        strangeInvaders[i] += width + 1 // plus one to move it all right
        + 10 // to move down one row
    } else if (startingInvaders.some === 'hero') // if some invaders touch the hero class it's over.
      window.alert('Game Over')
      console.log('moving', moveInvaders)
  }


  // (left === keyCode && currentPosition % width !== 0) {
  //   removeHero(currentPosition)
  //   currentPosition -= 1
  //   addHero(currentPosition)
  // } else if (right === keyCode && currentPosition % width !== width - 1) {
  //   removeHero(currentPosition)
  //   currentPosition += 1




  // function shooter() {


  // }


  function startGame() {
    getHighScore()
    addHero(startingPosition)
    addInvaders(startingInvaders)
    moveInvaders()
    shots(strangeInvaders)
    startButton.disabled = true
    restartButton.disabled = false
    currentScore = 0
    currentLives = `${currentLives}`
    score.innerHTML = (`${currentScore}`)
    lives.innerHTML = '❤️'.repeat(currentLives)
    interval
    if (shots === hero) {
      currentLives--
      lives.innerHTML = lives ? '❤️'.repeat(lives) : '💔'
    } else if (currentLives === 0) {
      removeInvaders()
      removeHero()
      return endGame()
    }
  }

  const interval = setInterval(moveInvaders, invadersSpeed)
  

  function resetGame() {
    clearInterval(interval)
    // let lives = 3
    // let score = 0
    invadersSpeed = 1500
    removeHero()
    startGame()
  }

  function endGame() {
    clearInterval(interval)
    if (currentScore > high) {
      window.alert(`New High Score!\n ${currentScore}`)
      localStorage.setItem('highScore', currentScore)
      getHighScore()
    }
    startButton.disabled = false
    currentLives = 3
    currentScore = 0
    invadersSpeed = 1500
    buttons.forEach(btns => btns.classList.remove('demo'))
  
  }





  createGrid()

  
  // window.onload = function startGame() {}


}


window.addEventListener('DOMContentLoaded', init)