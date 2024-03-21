'use strict';

////////////////////////////////////////
// 手順
// class - Player
// class - Laser
// class - Balloon
// class - Game
// 初期設定
// イベントハンドリング 
////////////////////////////////////////

////////////////////////////////////////
// class - Player
////////////////////////////////////////
class Player {
  // プレイヤーオブジェクトの生成
  constructor(x, y, imageSrc) {
    // 初期位置（x, y）
    this.x = x;
    this.y = y;
    // 画像のパス(src)
    this.image = new Image();
    this.image.src = imageSrc;
  }
  // メソッドmove() 左右移動
  move(direction) {
    if (direction === 'left') {
      this.x -= 20;
      if (this.x < 0) this.x = 0;
    } else if (direction === 'right') {
      this.x += 20;
      if (this.x > canvas.width - 40) this.x = canvas.width - 40;
    }
  }
  // 2D描画
  draw() {
    c2d.drawImage(this.image, this.x, this.y, 40, 40);
  }
}

////////////////////////////////////////
// class - Laser
////////////////////////////////////////
class Laser {
  // レーザービームオブジェクトの生成
  constructor(x, y) {
    // 初期位置（x, y）
    this.x = x;
    this.y = y;
  }
  // 上に4px移動
  update() {
    this.y -= 4;
  }
  draw() {
    // 描画色
    c2d.fillStyle = 'yellow';
    // 位置とサイズ
    c2d.fillRect(this.x - 1, this.y, 10, 10);
  }
}

////////////////////////////////////////
// class - Balloon
////////////////////////////////////////
class Balloon {
  // バルーンオブジェクトの生成
  constructor(x, y, imageSrc) {
    // 初期位置（x, y）
    this.x = x;
    this.y = y;
    // 画像のパス(src)
    this.image = new Image();
    this.image.src = imageSrc;
  }
  // 下に2px移動
  update() {
    this.y += 2;
  }
  // 2D描画
  draw() {
    c2d.drawImage(this.image, this.x, this.y, 40, 40);
  }
  // ゲーム領域外に出たら描画の停止
  isOutOfScreen() {
    return this.y > canvas.height;
  }
}

////////////////////////////////////////
// class - Game
////////////////////////////////////////
class Game {
  // ゲームオブジェクトの生成
  constructor() {
    // class-Playerインスタンスの生成(classに実引数を渡す)
    this.player = new Player(canvas.width / 2 - 20, canvas.height - 60, 'img/controller.svg');
    // 配列と変数の初期化
    this.balloons = [];
    this.lasers = [];
    this.score = 0;
    this.gameActive = false;
    this.endFlg = 0;
  }
  // ゲームの開始
  start() {
    this.gameActive = true;
    this.score = 0;
    this.balloons = [];
    this.lasers = [];
    document.querySelector('.c-msg').style.display = 'none';
    scoreDisplay.textContent = this.score;
    scoreDisplay.parentElement.style.display = 'block';
    this.gameLoop();
  }
  // ゲームの描画・更新
  gameLoop() {
    if (!this.gameActive) return;
    c2d.clearRect(0, 0, canvas.width, canvas.height);
    this.updateBalloons();
    this.updateLasers();
    this.player.draw();
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  // 風船の描画・削除
  updateBalloons() {
    for (let i = this.balloons.length - 1; i >= 0; i--) {
      let balloon = this.balloons[i];
      balloon.update();
      balloon.draw();
      if (balloon.isOutOfScreen()) {
        this.balloons.splice(i, 1);
      }
    }
  }
  //  風船の生成
  addBalloon() {
    const x = Math.random() * (canvas.width - 40);
    this.balloons.push(new Balloon(x, -40, 'img/balloon.svg'));
  }
  // レーザービームの生成
  fireLaser() {
    this.lasers.push(new Laser(this.player.x + 20, this.player.y));
  }
  // キー操作
  keyOperation(e) {
    if (!this.gameActive && e.code === 'Space' && this.endFlg === 0) {
      // if (!this.gameActive && e.code === 'Space') {
      this.start();
    } else if (this.gameActive) {
      if (e.code === 'ArrowLeft') {
        this.player.move('left');
      } else if (e.code === 'ArrowRight') {
        this.player.move('right');
      } else if (e.code === 'Space') {
        this.fireLaser();
      }
    }
  }
  // レーザービームと風船の生成・削除・スコアの更新
  updateLasers() {
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      let laser = this.lasers[i];
      laser.update();
      laser.draw();
      if (laser.y < 0) {
        this.lasers.splice(i, 1);
        // continue;
      }
      for (let j = this.balloons.length - 1; j >= 0; j--) {
        let balloon = this.balloons[j];
        if (this.isColliding(laser, balloon)) {
          this.score += 10;
          scoreDisplay.textContent = this.score;
          this.balloons.splice(j, 1);
          this.lasers.splice(i, 1);
          if (this.score >= 100) {
            const delayInSeconds = 0.2;
            setTimeout(() => {
              this.gameEnd();
            }, delayInSeconds * 1000);
          }
          break;
        }
      }
    }
  }
  // 風船とレーザービームの衝突判定
  isColliding(laser, balloon) {
    return laser.x > balloon.x && laser.x < balloon.x + 40 &&
      laser.y > balloon.y && laser.y < balloon.y + 40;
  }
  // ゲームの終了
  gameEnd() {
    document.querySelector('.c-msg').style.display = 'block';
    document.querySelector('.c-msg__init').style.display = 'none';
    document.querySelector('.c-msg__win').style.display = 'block';
    this.gameActive = false;
    document.removeEventListener('keydown', e => game.keyOperation(e));
    this.endFlg = 1;
  }
}

////////////////////////////////////////
// 初期設定
////////////////////////////////////////
const canvas = document.querySelector('.c-canvas');
const c2d = canvas.getContext('2d');
const scoreDisplay = document.querySelector('.c-display__score--detail');
// class-gameのコンストラクタ生成
const game = new Game();

////////////////////////////////////////
// イベントハンドリング 
////////////////////////////////////////
document.addEventListener('keydown', (e) => game.keyOperation(e));
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (!gameActive) {
      if (endFlg === 0) {
        gameStart();
      }
    }
  }
});
setInterval(() => {
  if (game.gameActive) game.addBalloon();
}, 1000);
