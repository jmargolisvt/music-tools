chart = section

section = w:((lyrics / chords) space?)* {return w.join(''); }

lyrics = first:('ly:') + space? rest: chunk?
	{ return "<div class='lyrics section'>" + rest + "</div>"}

chords = first:('ch:') + space? rest: chunk?
    { return "<div class='chords section'>" + rest + "</div>"}

chunk = ch:(word space?)* {return ch.map(x => "<p>" + x + "</p>").join('')}

word = l:letter + {return l.join('')}

letter = [a-zA-Z',:;\-\.\?!0-9 ]

space = [ \t\n\r]
