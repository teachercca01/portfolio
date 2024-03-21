'use strict';

//ページ内リンクが押された場合メニューをアイコン化
////////////////////////////////////////////////////////////////////////////////////////
// リンク要素の取得
const menuLinks = document.querySelectorAll('.c-menu__item a');
// ボタン要素の取得
const checkbox = document.querySelector('.c-menu-btn');
// ループでリンク要素全てに対して処理を行う
for (var i = 0; i < menuLinks.length; i++) {
 // リンク要素をクリックした場合処理を行う
 menuLinks[i].addEventListener('click', function () {
  // チェックボックスをoffへ変更してメニューをアイコン化へ戻す
  checkbox.checked = false;
 });
}

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

//ページ内リンク余白
////////////////////////////////////////////////////////////////////////////////////////
//URLの#の後の部分が変更された場合実行
window.addEventListener("hashchange", function () {
 //現在のURLの#の後ろ取得
 const hash = window.location.hash;
 //3つのいずれかに該当したらture
 if (hash === "#concept" || hash === "#service" || hash === "#faq") {
  //リンク先要素取得
  const target = document.querySelector(hash);
  //リンク先要素の位置取得
  const rect = target.getBoundingClientRect();
  //768px以上は48px、それ以外は16px
  const offset = window.innerWidth >= 768 ? 48 : 16;
  //ページの上端からリンク先要素まで絶対位置取得
  const absoluteElementTop = rect.top + window.scrollY;
  //リンク先要素をoffset分上に配置
  const middle = absoluteElementTop - offset;
  //スクロール
  window.scrollTo({
   top: middle,
   behavior: 'smooth'
  });
 }
});



