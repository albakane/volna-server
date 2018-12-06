document.addEventListener('DOMContentLoaded', function () {

  // CREATION DES VARIABLES
  let addPilotsButton = document.querySelector('#morePilots')
  let indexPilots = 6
  let uneDate = new Date();


  function createInput(index) {
    let input = document.createElement('input')
    input.setAttribute('name', 'reg_number_' + index)
    input.setAttribute('placeholder', 'Matricule')
    input.classList.add('input-bottom');
    return input
  }

  // ---------- AJOUTER DES PILOTES DANS LA COMPETITION ----------
  function addPilots() {
    let pilotsContainer = document.querySelector('#pilots')
    for (let i = 0; i < 5; i++) {
      let input = createInput(indexPilots)
      indexPilots++
      pilotsContainer.appendChild(input)
    }
  }

  function heureFrance(){
    let maintenant = new Date();
    let heure = maintenant.getHours();
    let minute = maintenant.getMinutes();
    let seconde = maintenant.getSeconds();
    if (seconde < 10)
      seconde = "0" + seconde;
    if (minute < 10)
      minute = "0" + minute;
    if (heure < 10)
      heure = "0" + heure;
      return  heure + " : " + minute + " : " + seconde ;
  }

  function printDate() {
    console.log(heureFrance())
    document.querySelector('.afficherHeure p').innerHTML = heureFrance();
  }

  setInterval(printDate, 1000)

  addPilotsButton.addEventListener('click', addPilots)

})
