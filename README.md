# Music Tools -- Chord Charts, Set Lists, etc.

This tool is intended for musicians who want tools to more easily manage a song catalog and write set lists.  It's a Node app with JQuery UI for drag-and-drop goodness.  PEGJS is used to generate a parser for writing interactive chord charts.  It's far from complete, has bugs, etc. but you can help make it better!  Pull requests welcome. :)

To watch sass, from the public/stylesheets dir, run:
`node-sass -o css style.scss -w`

To generate a new parser for the chord chart, from the /public/js/ dir run: `pegjs --export-var PARSER --format globals -o chordchart.js chordchart.pegjs`

This app was built on top of https://github.com/kacole2/express-node-mongo-skeleton. You can read about installation there.

### Create a chord chart

`-- ` creates a section title

`end` closes a section

`.. ` creates a notes div

`ly: ` creates a lyrics div

`ch: ` creates a chords div
