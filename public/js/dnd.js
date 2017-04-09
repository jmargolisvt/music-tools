$(document).ready(function() {
  if ($('#edit_view').length) {
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
  }

  $('#date').datepicker({dateFormat: 'mm/dd/yy'});

});

var list = new Object;

function getOrder() {
  let sections = ['bench', 'set_1', 'set_2', 'set_3'];
  for (var i = 0; i < sections.length; i++) {
    buildList(sections[i], document.querySelectorAll('#'+ sections[i] + ' .song:not(.ui-sortable-placeholder)'));
    // exclude JQuery UI's placeholder li's
    var elem = document.getElementById('count_' + i);
    if(elem) {
      elem.innerHTML = list[sections[i]].length;
    }
  }
  document.getElementById("songArray").value = JSON.stringify(list);
}

function buildList(cat, songs) {
  list[cat] = new Array;
  for (i=0; i< songs.length; i++) {
    list[cat].push({[songs[i].getAttribute('data-id')]:
      {'name':songs[i].getAttribute('data-name'),
       'time':songs[i].getAttribute('data-time')}});
  }
}
