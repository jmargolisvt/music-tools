chart = chordSection / lyrics

chordSection = w:(chord space?)* {
return "<div class='section'>"
+ w.map(x => x[0]).join('') + "<div>"; }

chord = first:[a-gA-G] rest:ext*
        { return  first + rest.join(''); } / lyrics

ext = [b#(aug)(dim)(min)(maj7)(min7)(min6)]

lyrics = first:'ly:' rest: chunk?
	{ return "<div class='lyrics'>" + rest+ "</div>"}

chunk = ch:(word space?)* {return ch.map(x => "<p>" + x + "</p>").join('')}

word = l:letter + {return l.join('')}

letter = [a-zA-Z',:;\-\.\?!0-9 ]

repeat = ['r:'0-9+]

verse = v:(chordSection lyrics?) {return "<div>" + rest + "</div>"}

space "whitespace" = [ \t\n\r]
