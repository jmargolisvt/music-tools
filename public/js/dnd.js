$(document).ready(function() {
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
              top: '0px',
              width: 'inherit',
              height: 'inherit'
        }));
    }
  });
});
