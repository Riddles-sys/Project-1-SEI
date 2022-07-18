function init() {

// ! Elements
  const grid = document.querySelector('.game-display')
  const lives = document.querySelector('#lives')
  const high = document.querySelector('#high-score')
  const startButton = document.querySelector('#start-button')
  const restartButton = document.querySelector('#restart-button')
  const score = document.querySelector('.score')
  const userName = document.querySelector('.username-btn')
  const demo = document.querySelector('.demo')
  const shooter = document.querySelector('.rShooter')
  const elevenForce = document.querySelector('.eForce')
  const hero = document.getElementsByClassName('hero')
  
  // map out cells of the grid
  const cells = Array.from(document.querySelectorAll('.grid div'))

  // Disable restart at the beginning.
  restartButton.disabled = true

// ! Variables
  const width = 10
  const cellCount = width * width
  let cell = []
  let invadersSpeed = 1500
  let currentScore = 0
  let currentLives = 3
  let timesPlay = 0
  let height = width

  // const startingInvaders = [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 
  //   18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37,38]



// Character class
  // const charClass = 'hero'
  const startingPosition = 95
  let currentPosition = startingPosition

// Invaders Class
  const invaderClass = 'demo'
  let startingInvaders = [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 
    18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37,38]

// Getting the high score
function getHighScore() {
  highScore = parseInt(localStorage.getItem('high-score')) || 0;
  console.log('highScore ->', highScore)
  high.innerHTML = (`${highScore}`)
}

  
// Grid for display
  function createGrid(){
    for(let i = 0; i < cellCount; i++){
      let cell = document.createElement('div')
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
    }
    addHero(startingPosition)
  }

  // Add hero to position
  function addHero(currentPosition){
    cells[currentPosition].classList.add('hero')
  }

  function removeHero(currentPosition){
    cells[currentPosition].classList.remove('hero')
  }

  //Right & Left movement
  function heroMovement(event){
    const keyCode = event.keyCode
    const left = 37
    const right = 39
  
    removeHero(currentPosition)
  
    if (left === keyCode && currentPosition % width !== 0){
      currentPosition -= 1
    } else if (right === keyCode && currentPosition % width !== width - 1){
      currentPosition += 1
    } else if (currentLives === - 1){
      window.alert(`Game Over\n Final Score ${currentScore}`)
      endGame()
    } else {
      lives.innerHTML = (`${currentLives}`)
    }
  



    addHero(currentPosition)


    // Add invaders to the cell at the beginning
    function addInvaders(){
      // clearInterval()
      // const startingInvaders = [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 
      //   18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37,38]
      for (let i = 0; i < startingInvaders.length; i++)
      if(!invaderClass.includes(i)) {
        cells[startingInvaders[i]].classList.add('demo')
      }
    }
  
    addInvaders(startingInvaders)
  }

  // Similar to whack-a-mole game
  function removeInvaders(startingInvaders){
    // const demo = document.querySelector('.demo')
    // const shooter = document.querySelector('.rShooter')
    if (elevenForce === demo)
    startingInvaders.classList.remove('demo')
    elevenForce.classList.remove('elevenForce')
    currentScore += 100
  }

  // Trying to add hero to the same cells as hero so that they move together.
  function force(event){
    const keyCode = event.keyCode
    const left = 37
    const right = 39
    const spaceUp = 32
    removeHero()
    if (hero === elevenForce){ 
    } if (left === keyCode && currentPosition % width !== 0){
      currentPosition -= 1
    } else if (right === keyCode && currentPosition % width !== width - 1){
      currentPosition += 1
    } else (spaceUp === keyCode && currentPosition % height === + 1)
    currentPosition += 1
    
  }


    // for (let i = 0; i < startingInvaders.length; i++) {
    //   cell[startingInvaders[i]].classList.remove('demo')
  

  function moveInvaders(){
   

  }
    

  function startGame(){
    getHighScore()
    addHero(startingPosition)
    addInvaders(startingInvaders)
    startButton.disabled = true
    restartButton.disabled = false
    currentScore = 0
    currentLives = [3]
    // lives.innerHTML = (`${currentLives}`)
    score.innerHTML = (`${currentScore}`)
    // createGrid() 
    // addInvaders(startingInvaders)
    lives.innerHTML = '❤️'.repeat(currentLives)
    interval = setInterval(moveInvaders, invadersSpeed)

    // topScoreDisplay.innerHTML = url('./images/heart.gif').repeat(lives)
    const invaderHit = removeInvaders() 
    // Need to add an if statement in here for if the invaders are hit then remove a life
    if (!invaderHit) {
      currentLives--
      lives.innerHTML = lives ? '❤️'.repeat(lives) : "💔"
      if(currentLives === 0){
        return endGame()
      }
    }
    startButton.disabled = true
    restartButton.disabled = false
  }

  function resetGame(){
    clearInterval()
    // let lives = 3
    // let score = 0
    // invadersSpeed = 1500
    removeHero()
    startGame()

  }
  




  createGrid()

  document.addEventListener('keydown', heroMovement)
  startButton.addEventListener('click', startGame)
  restartButton.addEventListener('click', resetGame)
  document.addEventListener('keydown', force)
  // window.onload = function startGame() {}



}
window.addEventListener('DOMContentLoaded', init)
