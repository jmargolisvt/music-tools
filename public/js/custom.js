// get all the song id's and put them in an array
function getOrder() {
  var x = document.getElementsByClassName('song');
  var arr = [];
  for (i=0; i< x.length; i++) {
    arr.push(x[i].getAttribute('data-id'));
  }
  return arr;
}
