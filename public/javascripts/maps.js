function initMap() {

  let leClosAudy = {
    lat : 47.591641,
    lng : 1.453239
  }

  let map = new google.maps.Map(document.querySelector('#map'), {
    controls : true,
    draggable : true,
    zoom   : 12,
    center : leClosAudy
  })
}