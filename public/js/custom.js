// get all the song id's and put them in an array
function getOrder() {
  var x = document.getElementsByClassName('song');
  var arr = new Object;

  for (i=0; i< x.length; i++) {
    arr[x[i].getAttribute('data-id')] = x[i].getAttribute('data-name');
  }
  return (JSON.stringify(arr));
}
/*** SORT INTO SETS ***/

jQuery(document).ready(function($) {
  var drag_items = $('.song.edit');
  var drop_areas = $('.drop');

  //set up drag and drop event listeners
  function setUpEventListeners() {

    drag_items.each(function() {
      var thisDrag = $(this);
      thisDrag[0].addEventListener('dragstart', dragStart);
      thisDrag[0].addEventListener('drag', drag);
    //  thisDrag[0].addEventListener('dragend', dragEnd);
    });

    drop_areas.each(function() {
      var thisDrop = $(this);

      thisDrop[0].addEventListener('dragenter', dragEnter);
      thisDrop[0].addEventListener('dragover', dragOver);
      thisDrop[0].addEventListener('dragleave', dragLeave);
      thisDrop[0].addEventListener('drop', drop);

    });

  }
  setUpEventListeners();

  var dragItem;

  //called as soon as the draggable starts being dragged
  //used to set up data and options
  function dragStart(event) {
    drag = event.target;
    dragItem = event.target;

    //set the effectAllowed for the drag item
    event.dataTransfer.effectAllowed = 'move';

    var songId = $(dragItem).attr('data-id');
    var songTitle = $(dragItem).prop('outerHTML');
    //check for IE (it supports only 'text' or 'URL')
    // try {
    //   event.dataTransfer.setData('text/uri-list', songId);
    //   event.dataTransfer.setData('text/html', songTitle);
    // } catch (e) {
    //   event.dataTransfer.setData('text', songId);
    // }

    $(drag).addClass('drag-active');

  }

  //called as the draggable enters a droppable
  //needs to return false to make droppable area valid
  function dragEnter(event) {
    var drop = this;

    //set the drop effect for this zone
    event.dataTransfer.dropEffect = 'move';
    $(drop).addClass('drop-active');

    event.preventDefault();
    event.stopPropagation();

  }

  //called continually while the draggable is over a droppable
  //needs to return false to make droppable area valid
  function dragOver(event) {
    var drop = this;

    //set the drop effect for this zone
    event.dataTransfer.dropEffect = 'move';
    $(drop).addClass('drop-active');

    event.preventDefault();
    event.stopPropagation();
  }

  //called when the draggable was inside a droppable but then left
  function dragLeave(event) {
    var drop = this;
    $(drop).removeClass('drop-active');
  }

  //called continually as the draggable is dragged
  function drag(event) {

  }

  //called when the draggable has been released (either on droppable or not)
  //may be called on invalid or valid drop
  function dragEnd(event) {
    var drag = this;

    $(drag).removeClass('drag-active');
  }

  //called when draggable is dropped on droppable
  //final process, used to move data or update UI on successful drop
  function drop(event) {

    drop = this;
    $(drop).removeClass('drop-active');

    var dataList, dataHTML, dataText;

    //collect our data (based on what browser support we have)
    try {
      dataList = event.dataTransfer.getData('text/uri-list');
      dataHTML = event.dataTransfer.getData('text/html');
    } catch (e) {;
      dataText = event.dataTransfer.getData('text');
    }

    //we have access to the HTML
    if (dataHTML) {
      console.log(dataHTML);
      // dataHTML.addEventListener('dragstart', dragStart);
      // dataHTML.addEventListener('drag', drag);
      $(drop).append(dataHTML);
      //$(dragItem).hide();
      //var drag = $(drop).find('.drag');
    }
    //only have access to text (old browsers + IE)
    else {
      $(drop).append($(dragItem).clone());
      //var drag = $(drop).find('.drag');
    }

    //check if this element is in the right spot
    //checkCorrectDrop(drop, drag);
    //see if the final image is complete
    //checkCorrectFinalImage();

    event.preventDefault();
    event.stopPropagation();
  }

  //check to see if this dropped item is in the correct spot
  function checkCorrectDrop(drop, drag) {

    //check if this drop is correct
    var imageValue = $(drag).attr('data-value');
    var dropValue = $(drop).attr('data-value');

    if (imageValue == dropValue) {
      $(drop).removeClass('incorrect').addClass('correct');
      //make the dropped item no longer draggable (removing the attr)
      $(drag).attr('draggable', 'false');

      //hide the original drag item (set during dragStart), we don't need it anymore
      $(dragItem).hide();

    } else {
      $(drop).removeClass('correct').addClass('incorrect');
    }

  }

  //checks to see if the dropped images are in the correct locations
  function checkCorrectFinalImage() {

    var correctItems = drop_areas.filter('.correct');
    if (correctItems.length == drop_areas.length) {
      $('.message-container').empty();
      $('.message-container').append('<h3>You solved the puzzle!</h3>');
      $('.message-container').append('<p>Thanks for putting Internet Explorer back together again!</p>');
    } else {
      $('.message-container').empty();
    }
  }

  //Reset the drop containers
  $('.reset-button').on('click', function() {
    $('.dnd-image-drag').find('.drop').children('img').remove();
    $('.dnd-image-drag').find('.drop').removeClass('correct incorrect');
    $('.message-container').empty();
    $('.dnd-image-drag .drag').show();
  });

  // check for ie
  var userAgent = window.navigator.userAgent;
  if (userAgent.indexOf('MSIE') != -1) {
    $('.ie-message').show();
  }

});
