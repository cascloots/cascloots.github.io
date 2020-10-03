let elem = document.querySelectorAll('.main-carousel');

elem.forEach(elem =>{
  var elem = new Flickity( elem, {
    // options
    value: true,
    freeScroll: false,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    wrapAround: true 
  });
});