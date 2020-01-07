// The following line makes sure your styles are included in the project. Don't remove this.
import '../styles/main.scss';
import 'bootstrap/scss/bootstrap.scss'
// Import any additional modules you want to include below \/

import {musicJson} from '../../assets/music'
// \/ All of your javascript should go here \/

//var musicIndex = JSON.parse(musicJson)



let button = document.querySelector("#submit")
let input = document.querySelector("#myInput")

button.addEventListener('click', (e) => {
  getDataFromItunes()
})

document.querySelector('.button1').addEventListener('click', showMe)
function showMe(){
    document.querySelector("#tbody3").classList.toggle("tbody2")

}

let musicIndex;
function getDataFromItunes(){
  let url = 'https://itunes.apple.com/search?term='+input.value
  let cors = 'https://cors-anywhere.herokuapp.com/'

  

  fetch(cors+url)
  .then(data => data.json())
  .then(newObject => {
      musicIndex = newObject
      console.log(musicIndex)
  })
  .then(build)
  .catch(error => console.log(error))
  
  
  
}

function build(){
 var min;
 var sec;
 

  for (var i=0; i< musicIndex.results.length; i++){

    var ms = musicIndex.results[i].trackTimeMillis
    min = Math.floor((ms/1000/60) << 0)
    sec  = Math.floor((ms/1000) % 60)

    if(sec < 10){
        sec = "0" + sec
    }
    
    if(i<10){
            var e = `
            
              <tr id="searchResult">
                <th scope="row">${[i + 1]}</th>
                <td>  <img src=${musicIndex.results[i].artworkUrl30}></img> ${musicIndex.results[i].trackName}</td>
                <td>${musicIndex.results[i].artistName}</td>
                <td>${musicIndex.results[i].collectionName}</td>
                <td>${min}:${sec}</td>
                <td>${musicIndex.results[i].trackPrice} €</td>
              </tr>
              
            
         
          
          `
          document.querySelector('.tbody1').insertAdjacentHTML("beforeend", e)}
          else if (i >=10){
            var e = `
            
            <tr id="searchResult">
              <th scope="row">${[i + 1]}</th>
              <td>  <img src=${musicIndex.results[i].artworkUrl30}></img> ${musicIndex.results[i].trackName}</td>
              <td>${musicIndex.results[i].artistName}</td>
              <td>${musicIndex.results[i].collectionName}</td>
              <td>${min}:${sec}</td>
              <td>${musicIndex.results[i].trackPrice} €</td>
            </tr>
            
          
       
        
        `
        document.querySelector('.tbody2').insertAdjacentHTML("beforeend", e)
          }
          
  
        
}}


$(document).ready(function(){
  $("input").click(function(){
    $("tbody").empty();
  });
});