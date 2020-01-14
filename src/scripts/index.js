// The following line makes sure your styles are included in the project. Don't remove this.
import '../styles/main.scss';
import 'bootstrap/scss/bootstrap.scss'
// Import any additional modules you want to include below \/

import { musicJson } from '../../assets/music'
// \/ All of your javascript should go here \/

//var musicIndex = JSON.parse(musicJson)



let button = document.querySelector("#submit")
let input = document.querySelector("#myInput")
let outputContainer = document.querySelector('.tbody1')
let arraySong = []

function load(){
  let data = localStorage.getItem('favorite');
      if ( data ){
        data = JSON.parse(data);
        if ( Array.isArray(data) ){
          arraySong = data;
          
        }
      }
    }

load()

outputContainer.addEventListener('click', addtoFavorite)

function addtoFavorite(e) {
  if (!e.target.classList.contains('addFavorite')) return
  console.log(e)

  


  var parrent = e.target.parentElement.parentElement
  var classArray = parrent.querySelectorAll('td')

  arraySong.push({ artist: classArray[1].innerText, song: classArray[0].innerText })
  console.log(arraySong)
  localStorage.setItem('favorite', JSON.stringify(arraySong))

  createFavorite()


}

function createFavorite(){
  for (var i = 0; i < arraySong.length; i++){
    var fav =  `
                <p>${arraySong[i].artist}:${arraySong[i].song}</p>`

    
    document.querySelector('#favorites').insertAdjacentHTML('beforeend',fav)
}}



button.addEventListener('click', (e) => {
  getDataFromItunes()
})

document.querySelector('.button1').addEventListener('click', showMe)
function showMe() {
  document.querySelector("#tbody3").classList.toggle("tbody2")

}

let musicIndex;
function getDataFromItunes() {
  let url = 'https://itunes.apple.com/search?term=' + input.value
  let cors = 'https://cors-anywhere.herokuapp.com/'



  fetch(cors + url)
    .then(data => data.json())
    .then(newObject => {
      musicIndex = newObject
      console.log(musicIndex)
    })
    .then(build)
    .catch(error => console.log(error))



}

function build() {
  var min;
  var sec;


  for (var i = 0; i < musicIndex.results.length; i++) {

    var ms = musicIndex.results[i].trackTimeMillis
    min = Math.floor((ms / 1000 / 60) << 0)
    sec = Math.floor((ms / 1000) % 60)

    if (sec < 10) {
      sec = "0" + sec
    }

    if (i < 10) {
      var e = `
            
              <tr class ="searchResult${i + 1}">
                <th scope="row">${[i + 1]}</th>
                <td>  <img src=${musicIndex.results[i].artworkUrl30}></img> ${musicIndex.results[i].trackName}</td>
                <td >${musicIndex.results[i].artistName}</td>
                <td>${musicIndex.results[i].collectionName}</td>
                <td>${min}:${sec}</td>
                <td>${musicIndex.results[i].trackPrice} €</td>
                <td><button class="btn btn-dark addFavorite">X</button></td>
              </tr>
              
            
         
          
          `
      document.querySelector('.tbody1').insertAdjacentHTML("beforeend", e)
    }
    else if (i >= 10) {
      var e = `
            
            <tr id="searchResult">
              <th scope="row">${[i + 1]}</th>
              <td>  <img src=${musicIndex.results[i].artworkUrl30}></img> ${musicIndex.results[i].trackName}</td>
              <td class = "name">${musicIndex.results[i].artistName}</td>
              <td>${musicIndex.results[i].collectionName}</td>
              <td>${min}:${sec}</td>
              <td>${musicIndex.results[i].trackPrice} €</td>
            </tr>
            
          
       
        
        `
      document.querySelector('.tbody2').insertAdjacentHTML("beforeend", e)



    }





  }
}








$(document).ready(function () {
  $("input").click(function () {
    $("tbody").empty();
  });
});