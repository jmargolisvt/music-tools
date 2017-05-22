chart = section

section = w:((lyrics / chords / notes / title / end) space?)* { return [].concat.apply([], w).join(''); }

title = first:('--') + space? rest: plainChunk?
    { return "<fieldset><legend>" + rest + "</legend>"}

end = first:('end') + space?
    { return "</fieldset>"}

notes = first:('..') + space? rest: chunk?
    { return "<div class='notes'>" + rest + "</div>"}

lyrics = first:('ly:') + space? rest: chunk?
	{ return "<div class='lyrics section'>" + rest + "</div>"}

chords = first:('ch:') + space? rest: chunk?
    { return "<div class='chords section'>" + rest + "</div>"}

plainChunk = ch:(word space?)* {return [].concat.apply([], ch).join('')}

chunk = ch:(word space?)* {return [].concat.apply([], ch).join('<p>')}

word = l:letter + {return l.join('')}

letter = [a-zA-Z',:;\-\.\?|!0-9\#()/ ]

space = [ \t\n\r]
