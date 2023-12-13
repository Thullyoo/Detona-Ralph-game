const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifeLeft: document.querySelector("#lifes"),
    },
    values: {
        result: 0,
        gameVelocity: 1000,
        hitPosition: 0,
        currentTime: 60,
        lifes: 3,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000)
    }
}
function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove('enemy');
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("O tempo acabou! O seu resultado foi: " + state.values.result);
    }
}
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        } else{
            addListenerError();
        }
        
      });
    });
  }
function playSound(sound){
    let audio = new Audio(`./src/audios/${sound}.m4a`)
    audio.volume = 0.3;
    audio.play();
}
function main (){
    addListenerHitBox();
}
main();