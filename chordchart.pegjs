chart = chordSection / lyrics

chordSection = w:(chord space?)* {
return "<div class='section'>"
+ w.map(x => x[0]) + "<div>"; }

chord = first:[a-gA-G] rest:ext*
        { return  first + rest.join(""); } / lyrics

ext = [b#(aug)(dim)(min)(maj7)(min7)]

lyrics = first:'l:' rest: chunk?
	{ return "<div class='lyrics'>" + rest + "</div>"}

chunk = ch:(word)* {return ch.join('')}

word = l:letter + {return l.join('')}

letter = [a-zA-Z ]

repeat = ['r:'0-9+]

verse = v:(chordSection lyrics?) {return "<div>" + rest + "</div>"}

space "whitespace" = [ \t\n\r]*


///////////////

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
};
