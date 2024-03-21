////////////////////////////////////////////////////////////////////////////////////
// 1. ドキュメントを読み込んだらイベントを開始する
// 2. 関数宣言 - getInputValue() - 入力値を取得する
// 3. 関数宣言 - startTimer() - スタートボタンを押した後の処理
// 4. 関数宣言 - updateTimer()  - 1秒ごとにカウントダウンを更新する
// 5. 関数宣言 - updateTimerDisplay()  - ディスプレイを更新する
// 6. 関数宣言 - stopTimer() - ストップボタンを押した後の処理
// 7. 関数宣言 - blinkBackground() - カウントダウンが終了した場合の処理
// 8. 関数宣言 - resetTimer() - リセットボタンを押した後の処理
// 9.ボタンを押した場合に、関数宣言startTimer() stopTimer() resetTimer()を実行する
////////////////////////////////////////////////////////////////////////////////////

'use strict';

// 1. ドキュメントを読み込んだらイベントを開始する
document.addEventListener('DOMContentLoaded', function () {

 // カウントダウン表示用のspan要素を取得する
 const hourElem = document.querySelector('.c-timer__h');
 const minElem = document.querySelector('.c-timer__m');
 const secElem = document.querySelector('.c-timer__s');
 // 合計秒数を格納するための変数totalを定義する
 let total = 0;
 // カウントダウンの秒数を格納する変数を定義する
 let countdown;
 // 一時停止した場合に秒数を保持する変数を定義する
 let remainingTime = 0;

 ////////////////////////////////////////////////////////////////////////////////////////////////
 // 2. 関数宣言 - getInputValue() - 入力値を取得する
 ////////////////////////////////////////////////////////////////////////////////////////////////
 function getInputValue(selector) {
  // 関数宣言startTimer()の実引数を定数inputに代入する
  const input = document.querySelector(selector);
  // 定数inputの値を10新数へ変換して定数valueに代入する
  const value = parseInt(input.value, 10);
  // 定数valuleの値が空の場合は0、空でない場合は入力値を関数宣言startTimer()へリターンする
  return isNaN(value) ? 0 : value;
 }

 ////////////////////////////////////////////////////////////////////////////////////////////////
 // 3. 関数宣言 - startTimer() - スタートボタンを押した後の処理(カウントダウン開始)
 ////////////////////////////////////////////////////////////////////////////////////////////////
 function startTimer() {
  // 変数totalの値に0を代入する
  total = 0;
  if (remainingTime > 0) {
   // stopボタンを押して一時停止し、秒数を保持している場合は、その秒数を変数totalへ代入する
   total = remainingTime;
  } else {
   // 一時停止していない場合は、時数・分数・秒数をミリ秒へ変換して変数totalへ加算する
   total += getInputValue('.o-input__h') * 3600 * 1000; // 時数 1時間 = 60分 × 60秒 = 3600秒
   total += getInputValue('.o-input__m') * 60 * 1000;   // 分数 1分 = 60秒
   total += getInputValue('.o-input__s') * 1000;  // 秒数 1秒 = 1000ミリ秒
  }
  //  残り秒数が0以下の場合は、処理を中止する
  if (total <= 0) return;

  // 関数宣言 updateTimer()を呼び出してディスプレイを更新する
  updateTimer();
 }

 ////////////////////////////////////////////////////////////////////////////////////////////////
 // 4. 関数宣言 - updateTimer()  - 1秒ごとにカウントダウンを更新する
 ////////////////////////////////////////////////////////////////////////////////////////////////
 function updateTimer() {
  // 変数totalのミリ秒を時数・分数・秒数へ変換して定数に代入する
  const hours = Math.floor(total / (3600 * 1000));
  const minutes = Math.floor((total % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((total % (60 * 1000)) / 1000);
  // 関数宣言 updateTimerDisplay()を呼び出してディスプレイを更新する
  updateTimerDisplay(hours, minutes, seconds);
  if (total > 0) {
   // 変数totalの値が0より大きい場合、1秒ごとに関数宣言setTimeout()を呼び出す
   countdown = setTimeout(updateTimer, 1000);
   // カウントダウンを一時停止した場合、残りミリ秒を変数remainingTimeに格納する
   remainingTime = total;
   // 変数totalから1000を減算する
   total -= 1000;
  } else {
   // 変数totalの値が0以下の場合、関数宣言resetTimer()を呼び出す
   resetTimer();
   // 関数宣言blinkBackground()を呼び出し、背景を点滅させる
   blinkBackground(3, 500);
  }
 }

 ////////////////////////////////////////////////////////////////////////////////////////////////
 // 5. 関数宣言 - updateTimerDisplay()  - ディスプレイを更新する
 ////////////////////////////////////////////////////////////////////////////////////////////////
 function updateTimerDisplay(hours, minutes, seconds) {
  // 関数宣言 updateTimer()の実引数 時数・分数・秒数をディスプレイに2桁表示する
  hourElem.textContent = String(hours).padStart(2, '0');
  minElem.textContent = String(minutes).padStart(2, '0');
  secElem.textContent = String(seconds).padStart(2, '0');
 }

 ////////////////////////////////////////////////////////////////////////////////////////////////
 // 6. 関数宣言 - stopTimer() - ストップボタンを押した後の処理
 ////////////////////////////////////////////////////////////////////////////////////////////////
 function stopTimer() {
  // 変数countdownのタイマーをキャンセルする
  clearTimeout(countdown);
  // 変数blinkIntervalで繰り返し実行されるタイマーをキャンセルする
  clearInterval(blinkInterval);
  // body要素の背景色をなしにする
  document.body.style.background = '';
  // 変数countdownの値を未定義にする
  countdown = undefined;
 }

 // 変数blinkIntervalの値を空にする
 let blinkInterval = null;

 ////////////////////////////////////////////////////////////////////////////////////////////////
 // 7. 関数宣言 - blinkBackground() - カウントダウンが終了した場合の処理
 ////////////////////////////////////////////////////////////////////////////////////////////////
 function blinkBackground(times, interval) {
  // 変数countの値を0にする
  let count = 0;
  // 点滅状態を追跡するための変数isBlinkColorの値をfalseにする
  let isBlinkColor = false;
  // 定数blinkColorsに配列で点滅の色を2色格納する
  const blinkColors = ['#e0e017', '#333'];
  // 以前の点滅をクリアする
  clearInterval(blinkInterval);
  // 点滅を実行する
  blinkInterval = setInterval(function () {
   // body要素の背景色を交互に表示して点滅しているように見せる
   document.body.style.background = isBlinkColor ? blinkColors[1] : blinkColors[0];
   isBlinkColor = !isBlinkColor;
   // 変数countの値に1加算する
   count++;
   //  変数countの値が実引数3*2と等しい場合は、繰り返される点滅を解除する
   if (count === times * 2) {
    clearInterval(blinkInterval);
    // document.body.style.background = ''; // 初期背景色に戻す
   }
   // 実引数500を借り引数intervalにセットする
  }, interval);
 }

 ////////////////////////////////////////////////////////////////////////////////////////////////
 // 8. 関数宣言 - resetTimer() - リセットボタンを押した後の処理
 ////////////////////////////////////////////////////////////////////////////////////////////////
 function resetTimer() {
  // 関数宣言stopTImer()を呼び出して、カウントダウンをストップする
  stopTimer();
  // 関数宣言updateTimerDisplayに実引数0を渡して、ディスプレイを初めの状態に戻す
  updateTimerDisplay(0, 0, 0);
  // body要素の背景色をなしにする
  document.body.style.background = '';
  // .l-wrapの要素のclass属性値endを削除する
  document.querySelector('.l-wrap').classList.remove('end');
  // 変数remainingTimeに一時停止して保持していた秒数を0に戻す
  remainingTime = 0;
  // 入力値を戻す
  document.querySelectorAll('.o-input').forEach(function (input) {
   input.value = '';
  });
  // 変数countdownの値を未定義にする
  countdown = undefined;
 }

 ////////////////////////////////////////////////////////////////////////////////////////////////
 // 9.ボタンを押した場合に、関数宣言startTimer() stopTimer() resetTimer()を実行する
 ////////////////////////////////////////////////////////////////////////////////////////////////
 document.querySelector('.c-button--start').addEventListener('click', startTimer);
 document.querySelector('.c-button--stop').addEventListener('click', stopTimer);
 document.querySelector('.c-button--reset').addEventListener('click', resetTimer);
});