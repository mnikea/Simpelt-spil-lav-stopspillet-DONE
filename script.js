let points;
let liv;
let myRand;
let speed;

window.addEventListener("load", sidenVises);

function sidenVises() {
  console.log("sidenVises");
  startGame();
}

function startGame() {
  console.log("startGame");

  //Nulstil point og udskriv
  points = 0;
  document.querySelector("#score_board").innerHTML = points;

  //reset liv til 3
  liv = 3;
  document.querySelector("#liv").innerHTML = liv;

  //reset speed
  speed = 1;

  //Start timer
  document.querySelector("#time_sprite").classList.add("time");
  document.querySelector("#time_container").addEventListener("animationend", stopSpillet);

  //Giv en random position, random delay til container og speed
  myRand = Math.floor(Math.random() * 6) + 1;
  document.querySelector("#red_container1").classList.add("pos" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  document.querySelector("#red_container1").classList.add("delay" + myRand);
  document.querySelector("#red_container1").classList.add("speed" + speed);
  //Start op_ned-animationer
  document.querySelector("#red_container1").classList.add("op_ned");
  //Lyt efter op_ned-animationer er færdig
  document.querySelector("#red_container1").addEventListener("animationiteration", genstartRed);
  //Lyt efter klik
  document.querySelector("#red_container1").addEventListener("mousedown", clickRed);

  //Giv en random position, random delay til container og speed
  myRand = Math.floor(Math.random() * 6) + 1;
  document.querySelector("#blue_container1").classList.add("pos" + myRand);
  myRand = Math.floor(Math.random() * 4) + 1;
  document.querySelector("#blue_container1").classList.add("delay" + myRand);
  document.querySelector("#blue_container1").classList.add("speed" + speed);
  //Start op_ned-animationer
  document.querySelector("#blue_container1").classList.add("op_ned");
  //Lyt efter op_ned-animationer er færdig
  document.querySelector("#blue_container1").addEventListener("animationiteration", genstartBlue);
  //Lyt efter klik
  document.querySelector("#blue_container1").addEventListener("mousedown", clickBlue);
}

function clickRed() {
  console.log("clickRed");
  //ryd op, så man ikke kan kilkke på den samme flere gange
  document.querySelector("#red_container1").removeEventListener("mousedown", clickRed);

  //frys (pause), op_ned-animationen
  document.querySelector("#red_container1").classList.add("frys");

  //Tæl en op på points og udskriv
  points++;
  document.querySelector("#score_board").innerHTML = points;

  if (points >= 5) {
    speed = 3;
  } else if (points >= 2) {
    speed = 2;
  }

  //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
  document.querySelector("#red_sprite1").classList.add("forsvind");

  //Lyt efter forsvind-animationer er færdig
  document.querySelector("#red_container1").addEventListener("animationend", genstartRed);
}

function genstartRed() {
  console.log("genstartRed");
  //ryd op, fjern alt er på container og sprite
  document.querySelector("#red_container1").classList = "";
  document.querySelector("#red_sprite1").classList = "";

  //For at kunne genstarte op_ned animationen, da vi fjener og tilføjer den i samme function
  document.querySelector("#red_container1").offsetLeft;

  //Giv en random position til container
  myRand = Math.floor(Math.random() * 6) + 1;
  document.querySelector("#red_container1").classList.add("pos" + myRand);

  //sæt speed på
  document.querySelector("#red_container1").classList.add("speed" + speed);

  //Start op_ned-animationer på element
  document.querySelector("#red_container1").classList.add("op_ned");

  //Lyt efter klik på element
  document.querySelector("#red_container1").addEventListener("mousedown", clickRed);
}

function clickBlue() {
  console.log("clickBlue");
  //ryd op, så man ikke kan kilkke på den samme flere gange
  document.querySelector("#blue_container1").removeEventListener("mousedown", clickBlue);

  //frys (pause), op_ned-animationen
  document.querySelector("#blue_container1").classList.add("frys");

  //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
  document.querySelector("#blue_sprite1").classList.add("forsvind");

  //Lyt efter forsvind-animationer er færdig
  document.querySelector("#blue_container1").addEventListener("animationend", genstartBlue);

  //Tæl en ned på liv og udskriv
  liv--;
  document.querySelector("#liv").innerHTML = liv;
  if (liv <= 0) {
    stopSpillet();
  }
}

function genstartBlue() {
  console.log("genstartBlue");
  //ryd op, fjern alt er på container og sprite
  document.querySelector("#blue_container1").classList = "";
  document.querySelector("#blue_sprite1").classList = "";

  //For at kunne genstarte op_ned animationen, da vi fjener og tilføjer den i samme function
  document.querySelector("#blue_container1").offsetLeft;

  //Giv en random position til container
  myRand = Math.floor(Math.random() * 6) + 1;
  document.querySelector("#blue_container1").classList.add("pos" + myRand);

  //sæt speed på
  document.querySelector("#blue_container1").classList.add("speed" + speed);

  //Start op_ned-animationer på element
  document.querySelector("#blue_container1").classList.add("op_ned");

  //Lyt efter klik på element
  document.querySelector("#blue_container1").addEventListener("mousedown", clickBlue);
}

function stopSpillet() {
  console.log("stopSpillet");

  //stop timer
  document.querySelector("#time_sprite").classList.remove("time");
  document.querySelector("#time_container").removeEventListener("animationend", stopSpillet);

  //ryd op, fjern alt er på container og sprite
  document.querySelector("#red_container1").classList = "";
  document.querySelector("#red_sprite1").classList = "";

  document.querySelector("#blue_container1").classList = "";
  document.querySelector("#blue_sprite1").classList = "";

  //Fjern alle eventlistener
  document.querySelector("#red_container1").removeEventListener("animationend", genstartRed);
  document.querySelector("#red_container1").removeEventListener("animationiteration", genstartRed);
  document.querySelector("#red_container1").removeEventListener("mousedown", clickRed);

  document.querySelector("#blue_container1").removeEventListener("animationend", genstartRed);
  document.querySelector("#blue_container1").removeEventListener("animationiteration", genstartRed);
  document.querySelector("#blue_container1").removeEventListener("mousedown", clickRed);

  if (liv <= 0) {
    gameOver();
  } else if (points >= 10) {
    levelComplete();
  } else {
    gameOver();
  }
}

function gameOver() {
  console.log("You lose");
}

function levelComplete() {
  console.log("Yuuhuuu du vandt");
}
