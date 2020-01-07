// The following line makes sure your styles are included in the project. Don't remove this.
import '../styles/main.scss';
import 'bootstrap/scss/bootstrap.scss'
// Import any additional modules you want to include below \/

import {musicJson} from '../../assets/music'
// \/ All of your javascript should go here \/

//var musicIndex = JSON.parse(musicJson)

document.querySelector('.button1').addEventListener('click', showMyAss)

function showMyAss(){
    document.querySelector("#tbody3").classList.toggle("tbody2")

}

$.getJSON('https://itunes.apple.com/search?term=sound+of+silence&callback=?', function(musicIndex){
  var min;
 var sec;
 console.log(musicIndex)

  for (var i=0; i< musicIndex.results.length; i++){

    var ms = musicIndex.results[i].trackTimeMillis
    min = Math.floor((ms/1000/60) << 0)
    sec  = Math.floor((ms/1000) % 60)

    if(sec < 10){
        sec = "0" + sec
    }
    
    if(i<10){
            var e = `
            
              <tr>
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
            
            <tr>
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
          
  
        
}

$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
})









/*
document.querySelector('#myInput').addEventListener('keyup', myFunction)


function myFunction() {
    var input, filter, table, tr, td, i, txtValue, tc;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1]
      
      if (td) {
        txtValue = td.textContent || td.innerText || tc.textContent || tc.innerText;
       
         if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }*/

  

/*var ms = 298999,
min = Math.floor((ms/1000/60) << 0),
sec = Math.floor((ms/1000) % 60);

console.log(min + ':' + sec);*/

