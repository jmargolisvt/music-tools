// get all the song id's and put them in an array
function getOrder() {
  var x = document.getElementsByClassName('song');
  var arr = new Object;
  for (i=0; i< x.length; i++) {
    arr[x[i].getAttribute('data-id')] = x[i].getAttribute('data-name');
  }
  return (JSON.stringify(arr));
}

$( document ).ready(function() {
    console.log( "ready!" );
});
