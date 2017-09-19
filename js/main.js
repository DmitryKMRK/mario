'use strict';

var mario = document.querySelector('.mario');
var princess = document.querySelector('.princess');
var field = document.querySelector('.field');
var modalStart = document.querySelector('.modal-start');
var modalFinish = document.querySelector('.modal-finish');
var modalLose = document.querySelector('.modal-lose');
var modalStartBtn = document.querySelector('.modal-start__btn');
var modalFinishBtn = document.querySelector('.modal-finish__btn');
var modalLoseBtn = document.querySelector('.modal-lose__btn');
var RIGHT_BTN = 39;
var LEFT_BTN = 37;
var TOP_BTN = 38;
var BOTTOM_BTN = 40;
var ENTER_BTN = 13;
var ENEMY_WIDTH = 40;
var ENEMY_HEIGHT = 40;
var PADDING_LEFT = 20;
var PADDING_RIGHT = field.offsetWidth - 50;
var PADDING_TOP = 40;
var PADDING_BOTTOM = field.offsetHeight - 90;

function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function createEnemies(n) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < n; i++) {
    var newEnemy = document.createElement('div');
    newEnemy.style.backgroundImage = 'url("img/enemy.gif")';
    newEnemy.style.backgroundSize = 'contain';
    newEnemy.style.width = ENEMY_WIDTH + 'px';
    newEnemy.style.height = ENEMY_HEIGHT + 'px';
    newEnemy.style.position = 'absolute';
    newEnemy.style.left = random(PADDING_LEFT, PADDING_RIGHT) + 'px';
    newEnemy.style.top = random(PADDING_TOP, PADDING_BOTTOM) + 'px';
    newEnemy.className = 'enemy';
    fragment.appendChild(newEnemy);
  }
  field.appendChild(fragment);
}

function deleteEnemies() {
  var enemies = document.querySelectorAll('.enemy');
  for (var i = 0; i < enemies.length; i++) {
    field.removeChild(enemies[i]);
  }
}

function startGame() {
  deleteEnemies();
  modalStart.style.display = 'none';
  modalFinish.style.display = 'none';
  modalLose.style.display = 'none';
  mario.style.left = '0px';
  mario.style.top = '0px';
  mario.style.display = 'block';
  princess.style.display = 'block';
  createEnemies(25);
}

function checkMove() {
  var enemies = document.querySelectorAll('.enemy');
  var getCurrentTop = function(el) {
    return el.style.top.substring(0, el.style.top.length - 2);
  }
  var getCurrentLeft = function(el) {
    return el.style.left.substring(0, el.style.left.length - 2);
  }

  for (var i = 0; i < enemies.length; i++) {
    if((getCurrentLeft(enemies[i]) - getCurrentLeft(mario)) < 30 && (getCurrentLeft(enemies[i]) - getCurrentLeft(mario)) > -30 && (getCurrentTop(enemies[i]) - getCurrentTop(mario)) < 40 && (getCurrentTop(enemies[i]) - getCurrentTop(mario)) > -40) {
      return true;
    }
  }
}

function winGame() {
  var currentLeft = +mario.style.left.substring(0, mario.style.left.length - 2);
  var currentTop = +mario.style.top.substring(0, mario.style.top.length - 2);
  if (currentLeft >= field.offsetWidth - 40 && currentTop >= field.offsetHeight - 50) {
    for (var i = 0; i < field.children.length; i++) {
      field.children[i].style.display = 'none';
    }
    modalFinish.style.display = 'flex';
  }
}

function loseGame() {
  if (checkMove()) {
    for (var i = 0; i < field.children.length; i++) {
      field.children[i].style.display = 'none';
    }
    modalLose.style.display = 'flex';
  }
}

document.addEventListener('keydown', function(ev) {
  var currentLeft = +mario.style.left.substring(0, mario.style.left.length - 2);
  var currentTop = +mario.style.top.substring(0, mario.style.top.length - 2);
  
  if (ev.keyCode === RIGHT_BTN) {
    if (currentLeft < field.offsetWidth - 60) {
      mario.style.left = currentLeft + 30 + 'px';
    } else {
      mario.style.left = currentLeft;
    }
    checkMove();
  }
  
  else if (ev.keyCode === LEFT_BTN) {
    if (currentLeft >= 30) {
      mario.style.left = currentLeft - 30 + 'px';
    } else {
      mario.style.left = currentLeft;
    }
    checkMove();
  }
  
  else if (ev.keyCode === TOP_BTN) {
    if (currentTop >= 40) {
      mario.style.top = currentTop - 40 + 'px';
    } else {
      mario.style.top = currentTop;
    }
    checkMove();
  }
  
  else if (ev.keyCode === BOTTOM_BTN) {
    if (currentTop < field.offsetHeight - 80) {
      mario.style.top = currentTop + 40 + 'px';
    } else {
      mario.style.top = currentTop;
    }
    checkMove();
  }
});

document.addEventListener('keydown', winGame);
document.addEventListener('keydown', loseGame);

modalStartBtn.addEventListener('click', startGame);
modalFinishBtn.addEventListener('click', startGame);
modalLoseBtn.addEventListener('click', startGame);

document.addEventListener('keydown', function(ev) {
   if (ev.keyCode === ENTER_BTN && modalStart.style.display !== 'none') {
    startGame();
  }
  
  else if (ev.keyCode === ENTER_BTN && modalFinish.style.display !== 'none') {
    startGame();
  }
  
  else if (ev.keyCode === ENTER_BTN && modalLose.style.display !== 'none') {
    startGame();
  }
});