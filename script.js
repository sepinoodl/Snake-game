const gameCanvas = document.getElementById('game-canvas')
const ctx = gameCanvas.getContext('2d')
const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')
const scoreSign = document.querySelector('.score')

ctx.lineWidth = 4;
rectSpaceRL = 10;
rectSpaceTB = 10;
speed = 70;
startOffsetHeight = 82;
const vw = window.innerWidth;
gameCanvas.width = gameCanvas.clientWidth;
gameCanvas.height = gameCanvas.clientHeight;

ctx.fillStyle = '#54e9e4'
ctx.fillRect(rectSpaceRL , rectSpaceTB , (gameCanvas.width - 2 * (rectSpaceRL)) , (gameCanvas.height - 2 * (rectSpaceTB)) )
ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height)

start.style.top = `-${gameCanvas.offsetHeight/2 + startOffsetHeight/2}px`
console.log(gameOver.clientHeight)

start.addEventListener('click' , startFunc)

function startFunc(event) {
  
  ctx.lineWidth = 1;
  let rect = gameCanvas.getBoundingClientRect()
  let sides = rect.bottom - rect.top
  let foodX;
  let foodY;
  let movementX = 10;
  let movementY = 0;
  let score = 0;
  let randomNumber = (max , min) => Math.round((Math.random() * (max - min) + min ) / 10) * 10
  gameOver.style.display = 'none'
  scoreSign.innerHTML = score

  gameCanvas.setAttribute('tabindex' , '0')
  gameCanvas.focus()



  if(ctx.fillStyle == 'pink') {
    return
  } else if (ctx.fillStyle == '#54e9e4') {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
    ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height)
    
    setTimeout(() => {
    ctx.clearRect(0 , 0 , gameCanvas.width , gameCanvas.height)
    start.style.display = 'none'

    delay()
    }, 1000);
    }

    function delay() {
      
      let snake = [
      { x: 240 , y: 250},
      { x: 230 , y: 250},
      { x: 220 , y: 250},
      { x: 210 , y: 250},
      { x: 200 , y: 250}
    ]

    

    let clearSnake = () => {
      ctx.fillStyle = 'pink'
      ctx.fillRect(0 , 0 , gameCanvas.width , gameCanvas.height )
      ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height)
    }

    let changingKey = false;
    gameCanvas.addEventListener('keydown' , function(event) {
      let leftKey = 'ArrowLeft'
      let rightKey = 'ArrowRight'
      let topKey = 'ArrowUp'
      let bottomKey = 'ArrowDown'
      let keyPressed = event.code

      event.preventDefault()
      
      if(changingKey) return
      changingKey = true;

      if(keyPressed == leftKey && movementX !== +10) {
        event.preventDefault()
        movementY = 0
        movementX = -10
      }
      if(keyPressed == rightKey && movementX !== -10) {
        event.preventDefault()
        movementY = 0
        movementX = +10
      }
      if(keyPressed == topKey && movementY !== +10) {
        event.preventDefault()
        movementX = 0
        movementY = -10
      }
      if(keyPressed == bottomKey && movementY !== -10) {
        event.preventDefault()
        movementX = 0
        movementY = +10
      }
    })

    let startX , startY , direction = null;
    gameCanvas.addEventListener('touchstart' , function(event){
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
      direction = null;
      event.preventDefault()
    })
    gameCanvas.addEventListener('touchmove' , function(event){
      if(direction) return;

      event.preventDefault()
      
      
      let min = 10
      let dx = event.touches[0].clientX - startX
      let dy = event.touches[0].clientY - startY
      
      if( Math.abs(dx) > min ){
        direction = dx > 0 ? 'right' : 'left'
      } else if( Math.abs(dy) > min ){
        direction = dy > 0 ? 'down' : 'up'
      }

      if(direction == 'right' && movementX !== -10){
        movementX = +10
        movementY = 0
      }
      if(direction == 'left' && movementX !== +10){
        movementX = -10
        movementY = 0
      }
      if(direction == 'down' && movementY !== -10){
        movementY = +10
        movementX = 0
      }
      if(direction == 'up' && movementY !== +10){
        movementY = -10
        movementX = 0
      }
    })
    
    gameCanvas.addEventListener('touchend' , function(event){
      direction = null;
    })


    let advanceSnake = () => {
      let head = { x: snake[0].x + movementX , y: snake[0].y + movementY }
      if(head.x == foodX && head.y == foodY){
        score += 10;
        scoreSign.innerHTML = score
        creatFood()
        console.log('hey you')
      } else {
        snake.pop()
      }
      snake.unshift(head)
      console.log(snake)
      
      if(vw > 768){
        if(score > 50){
          speed = 60
        } if(score > 100){
          speed = 50
        } if(score > 250){
          speed = 40
        } if(score > 500){
          speed = 30
        } if(score > 1000){
          speed = 20
        } if(score > 2000){
          speed = 10
        }
      } else if(vw < 768) {
        speed = 80
        if(score > 100){
          speed = 70
        } if(score > 150){
          speed = 60
        } if(score > 200){
          speed = 50
        } if(score > 400){
          speed = 40
        } if(score > 500){
          speed = 30
        } if(score > 1000){
          speed = 20
        }
      }
    }
    
    function creatFood(){
      let foodPlaceInSnake = false

      while(!foodPlaceInSnake) {
        foodX = randomNumber(0 , gameCanvas.width - 10)
        foodY = randomNumber(0 , gameCanvas.height - 10)
        foodPlaceInSnake = !snake.some(snakePart => snakePart.x == foodX && snakePart.y == foodY)
      }
      drawFood()
    }
    creatFood()

    function drawFood() {
      ctx.lineWidth = 1;
      ctx.fillStyle = 'red'
      ctx.strokeStyle = 'black'
      console.log(foodX)
      console.log(foodY)
      ctx.fillRect(foodX , foodY , 10 , 10)
      ctx.strokeRect(foodX , foodY , 10 , 10)
      
    }

    if(foodX < gameCanvas.width && foodY < gameCanvas.height){
      console.log("drawFood is Done")
    }else if(foodX >= gameCanvas.width && foodY >= gameCanvas.height){
      console.log("Again")
      drawFood()
    }

    let drawSnake = () => snake.forEach(drawSnakePart)
    let drawSnakePart = snakePart => {
      ctx.strokeStyle = 'blaack'
      ctx.fillStyle = 'lightgreen'
      ctx.strokeRect( snakePart.x , snakePart.y , 10 , 10 )
      ctx.fillRect( snakePart.x , snakePart.y , 10 , 10 )
    }

    function restart(){
      ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
      start.style.display = 'block'
      speed = 70
      ctx.fillStyle = '#54e9e4'
      ctx.fillRect(rectSpaceRL , rectSpaceTB , (gameCanvas.width - 2 * (rectSpaceRL)) , (gameCanvas.height - 2 * (rectSpaceTB)) )
      ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height)
      gameOver.style.display = 'block'  
      if(vw > 768) {
        gameOver.style.top = `-${gameCanvas.offsetHeight - .2 * gameCanvas.offsetHeight}px`
      } else if(vw < 768) {
          gameOver.style.fontSize = `1.5rem`
          gameOver.style.right = '-5px'
          gameOver.style.top = `-${gameCanvas.offsetHeight + gameOver.offsetHeight}px`
      }

    }


    function main() {

      setTimeout(() => {
        if(snake[0].x >= gameCanvas.width || snake[0].y >= gameCanvas.height || snake[0].x < 0 || snake[0].y < 0) {
          setTimeout(() => {
            restart()
            start.addEventListener('click' , startFunc)
          }, 1000);
          return
        }
        for (let i = 1; i < snake.length; i++) {
        console.log(snake[i])
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
          setTimeout(() => {
            restart()
            start.addEventListener('click' , startFunc)
          }, 1000);
          return
        }
      }

        changingKey = false;
        clearSnake()
        advanceSnake()
        drawSnake()
        drawFood()

        main()
      }, speed);
    }

    main()

    
    }
}
