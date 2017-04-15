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
    // update the count
    if(elem) {
      elem.innerHTML = list[sections[i]].length + ' songs';
    }
  }
  // update the set time
  updateTime(list);
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

function updateTime(list) {
  for (set in list) {
    // build arrays
    let x = list[set],
        total = [];
    for (i=0; i<x.length; i++) {
      let time = x[i][Object.keys(x[i])[0]]['time'];
      if ( time !== 'undefined') {
        total.push(time);
      }
    }

    // add up time and display it
    let arr = [],
        min = '';
    total.forEach((x) =>
      arr.push((parseInt(x.split(':')[0]) * 60) + parseInt(x.split(':')[1]))
    );
    console.log(arr);
    if (arr.length > 0 && set !== 'bench') {
      sec = arr.reduce( (a,b) => a + b );
      min = Math.floor(sec/60) + ":" + zeroPad(sec);
      document.getElementById(set).querySelector('.total-time').innerHTML = min;
    }
  };
}

function zeroPad (sec) {
  let x = sec % 60;
  x > 9 ? x = x : x = '0' + x;
  return x;
}
