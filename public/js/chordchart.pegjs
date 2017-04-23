chart = section

section = w:((lyrics / chords / title / notes) space?)* { return [].concat.apply([], w).join(''); }

title = first:('--') + space? rest: chunk?
    { return "<div class='title section'><h5>" + rest + "</h5></div>"}

notes = first:('..') + space? rest: chunk?
    { return "<div class='notes section'>" + rest + "</div>"}

lyrics = first:('ly:') + space? rest: chunk?
	{ return "<div class='lyrics section'>" + rest + "</div>"}

chords = first:('ch:') + space? rest: chunk?
    { return "<div class='chords section'>" + rest + "</div>"}

chunk = ch:(word space?)* {return [].concat.apply([], ch).join('<p>')}

word = l:letter + {return l.join('')}

letter = [a-zA-Z',:;\-\.\?|!0-9 ]

space = [ \t\n\r]
