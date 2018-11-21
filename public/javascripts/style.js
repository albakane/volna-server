document.addEventListener('DOMContentLoaded', function () {

  // CREATION DES VARIABLES
  let addPilotsButton = document.querySelector('#morePilots')
  let indexPilots = 6

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

  addPilotsButton.addEventListener('click', addPilots)

})
