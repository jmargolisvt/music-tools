chordSection = w:(chord space?)* { return "<span class='chord'>"
+ w + "<span>"; }

chord = first:[a-gA-G] rest:ext*
        { return first + rest.join(""); }

ext = [b#(aug)(dim)]

lyrics = first:[l:] rest:[*]
	{return "<div class='lyrics'>" + rest + "</div>"}

verse = v:(chordSection lyrics?) {return "<div>" + rest + "</div>"}

repeat = [r0-9]

space "whitespace" = [ \t\n\r]*
