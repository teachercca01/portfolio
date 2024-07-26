'use strict';

//ローディング画面
////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
 //WebストレージからisFirstAccessキーの値を取得(chrome F12 Applicationパネル Local Strage の値)
 let isFirstAccess = sessionStorage.getItem('isFirstAccess');
 //Webストレージのキーがあるかどうか判定(null or undefined の場合true)
 if (!isFirstAccess) {
  //ローディング全体の取得
  const loadingElement = document.querySelector('.loading');
  //要素を表示するためクラスを付加
  loadingElement.classList.add('show');
  //ローディング 幾何学模様描画 プラグインparticlesJSの実行 #343a40 #c2ea18
  particlesJS("particles-js", { "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#c2ea18" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#343a40" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#c2ea18", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true });
  //4秒後にフェードアウト処理を実行
  // ローディング後にnavを背面へ
  document.querySelector('nav').style.zIndex = '-9999';
  setTimeout(function () {
   loadingElement.style.opacity = '0';
   //フェードアウト処理後の2秒後に
   setTimeout(function () {
    //ローディングを非表示にするためクラスを削除
    loadingElement.classList.remove('show');
    // ローディング後にnavを前面へ戻す
    document.querySelector('nav').style.zIndex = '1023';
    //WebストレージisFirstAccessキーの値としてdoneをセット
    sessionStorage.setItem('isFirstAccess', 'done');
   }, 2000);
  }, 4000);
 } else {
  // 2回目以降のアクセスはローディングを非表示
  let loadingElement = document.querySelector('.loading');
  loadingElement.style.display = 'none';
 }
});

//コンテンツフェードイン表示
////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('load', (event) => {
 //すべてのsection要素取得
 const sectionElements = document.querySelectorAll('section');
 //section要素にクラスfadeInを付与
 sectionElements.forEach(function (section) {
  //section要素にクラスfadeInを付与
  section.classList.add('fadeIn');
 });
 //fadeIn()呼び出し
 fadeIn();
});
//スクロール時fadeIn()呼び出し
window.addEventListener('scroll', fadeIn);
//関数定義fadeIn()
function fadeIn() {
 //すべてのsection要素取得
 const fadeInElements = document.querySelectorAll('.fadeIn');
 fadeInElements.forEach(function (section) {
  //section要素の現在位置取得
  const top = section.getBoundingClientRect().top;
  //ウィンドウの高さ取得
  const windowHeight = window.innerHeight;
  //section要素の現在位置がウィンドウの高さより200px以上、上にある場合true
  if (top < windowHeight - 200) {
   //要素にクラスanimatedを付与
   section.classList.add('animated');
  }
 });
}

//ページトップへ戻るボタン
////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
 //要素を取得
 const topBtn = document.querySelector('.page-top');
 //ウィンドウの高さを取得
 const windowHeight = window.innerHeight;
 //スクロール時の処理
 window.addEventListener('scroll', function () {
  //現在の垂直のスクロール位置がウィンドウの高さよりも大きい場合クラス属性値showを付与
  topBtn.classList.toggle('show', window.scrollY > windowHeight);
 });
 //クリック時の処理
 topBtn.addEventListener('click', function () {
  //ページのトップへ戻る
  window.scrollTo({
   top: 0,
   behavior: 'smooth'
  });
  return false;
 });
});

//文字のちらつき回避
////////////////////////////////////////////////////////////////////////////////////////
window.WebFontConfig = {
 //フォントのファミリーの指定
 google: { families: ['Hind', 'Noto+Sans+JP'] },
 //フォントの読み込み完了後に実行する関数
 active: function () {
  //セッションストレージにfonts=trueを保存
  sessionStorage.fonts = true;
 }
};
//即時関数で関数定義と同時に実行
(function () {
 //script要素生成
 let WebFont = document.createElement('script');
 //src属性 GoogleFontsのURL
 WebFont.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
 //async属性 非同期で読み込み
 WebFont.async = 'true';
 //初めのscript要素を取得
 let scriptElement = document.getElementsByTagName('script')[0];
 //その先頭に生成したscript要素を挿入
 scriptElement.parentNode.insertBefore(WebFont, scriptElement);
})();
