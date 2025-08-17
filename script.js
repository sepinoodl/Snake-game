const gameCanvas = document.getElementById('game-canvas')
const ctx = gameCanvas.getContext('2d')
const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')
const scoreSign = document.querySelector('.score')

ctx.lineWidth = 4;
rectSpaceRL = 10;
rectSpaceTB = 10;


ctx.fillStyle = '#54e9e4'
ctx.fillRect(rectSpaceRL , rectSpaceTB , (gameCanvas.width - 2 * (rectSpaceRL)) , (gameCanvas.height - 2 * (rectSpaceTB)) )
ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height)

start.style.top = `-${gameCanvas.height/2 + start.offsetHeight/2}px`
gameOver.style.top = `-${gameCanvas.height/3 + 1.75*(gameCanvas.height/3)}px`

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
    window.addEventListener('keydown' , function(event) {
      let leftKey = 'ArrowLeft'
      let rightKey = 'ArrowRight'
      let topKey = 'ArrowUp'
      let bottomKey = 'ArrowDown'
      let keyPressed = event.code
      
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
    }
    
    function creatFood(){
      foodX = randomNumber(0 , gameCanvas.width - 10)
      foodY = randomNumber(0 , gameCanvas.height - 10)
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

    snake.forEach(snakePart => {
      if(snakePart.x == foodX && snakePart.y == foodY){
        console.log('snake and food are in one place')
      drawFood()
      } else {
        console.log('snake and food are in the diffrent place')
      }

    })

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
      ctx.fillStyle = '#54e9e4'
      ctx.fillRect(rectSpaceRL , rectSpaceTB , (gameCanvas.width - 2 * (rectSpaceRL)) , (gameCanvas.height - 2 * (rectSpaceTB)) )
      ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height)
      gameOver.style.display = 'block'
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
      }, 70);
    }

    main()

    
    }
}