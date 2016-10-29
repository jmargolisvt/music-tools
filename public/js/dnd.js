$(document).ready(function() {
  getOrder();

  $( '.song.edit' ).draggable({
    connectToSortable: '.sortable',
    revert: 'invalid'
  });

  $( '.sortable' ).sortable({

  });
  $( '.sortable' ).disableSelection();

  $( '.drop' ).droppable({
    drop: function (event, ui) {
        $(this).find('.sortable')
            .append(ui.helper.css({
              // because JQuery UI adds inline styles
              position: 'relative',
              left: '0px',
              top: '0px'
        }));
        getOrder();
    }
  });
});

// get all the song id's and put them in an object
function getOrder() {
  var x = document.querySelectorAll('#the_bench .song');
  var y = document.querySelectorAll('#set_1 .song');
  var z = document.querySelectorAll('#set_2 .song');
  var list = new Object;
  build_list('bench', x, list);
  build_list('set_1', y, list);
  build_list('set_2', z, list);
  //return (JSON.stringify(list));
  document.getElementById("songArray").value = JSON.stringify(list);
}

function build_list(cat, songs, list) {
  list[cat] = new Array;
  for (i=0; i< songs.length; i++) {
    list[cat].push({[songs[i].getAttribute('data-id')]: songs[i].getAttribute('data-name')});
  }
}
