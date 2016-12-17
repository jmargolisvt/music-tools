$(document).ready(function() {
  getOrder();

  $( '.song.edit' ).draggable({
    connectToSortable: '.sortable',
    revert: 'invalid'
  });

  $( '.sortable' ).sortable({});

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
// exclude JQuery UI's placeholder li's
function getOrder() {
  var bench = document.querySelectorAll('#the_bench .song:not(.ui-sortable-placeholder)');
  var set1 = document.querySelectorAll('#set_1 .song:not(.ui-sortable-placeholder)');
  var set2 = document.querySelectorAll('#set_2 .song:not(.ui-sortable-placeholder)');
  var list = new Object;

  buildList('bench', bench, list);
  buildList('set_1', set1, list);
  buildList('set_2', set2, list);
  document.getElementById("songArray").value = JSON.stringify(list);

  updateCount(set1, set2);
}

function buildList(cat, songs, list) {
  list[cat] = new Array;
  for (i=0; i< songs.length; i++) {
    list[cat].push({[songs[i].getAttribute('data-id')]: songs[i].getAttribute('data-name')});
  }
}

function updateCount(set1, set2) {
  document.getElementById('count_1').innerHTML = set1.length - document.querySelectorAll('#set_1 li.ui-sortable-placeholder').length;
  document.getElementById('count_2').innerHTML = set2.length - document.querySelectorAll('#set_2 li.ui-sortable-placeholder').length;
}
