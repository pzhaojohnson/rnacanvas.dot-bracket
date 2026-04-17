# Installation

With `npm`:

```
npm install @rnacanvas/dot-bracket
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// an example import
import { parseDotBracketFASTA } from '@rnacanvas/dot-bracket';
```

## `function parseDotBracketFASTA()`

Parses a string in dot-bracket FASTA format
(e.g., the text contents of a dot-bracket FASTA file).

```javascript
// a dot-bracket FASTA string
var s = (
  '>Structure 1\n'
  + 'AAAGGGGAAAACCCCAAA\n'
  + '...((((....))))...'
);

var parsed = parseDotBracketFASTA(s);

parsed.name; // "Structure 1"
parsed.sequence; // "AAAGGGGAAAACCCCAAA"
parsed.dotBracket; // "...((((....))))..."
```

All common newline encodings are supported
(i.e., `\n`, `\r` and `\r\n`).

The name line may also be omitted.

```javascript
var s = (
  'AAAGGGGAAAACCCCAAA\n'
  + '...((((....))))...'
);

var parsed = parseDotBracketFASTA(s);

parsed.name; // undefined
parsed.sequence; // "AAAGGGGAAAACCCCAAA"
parsed.dotBracket; // "...((((....))))..."
```

Any delta-G value trailing the dot-bracket notation will be omitted.

(Anything trailing the dot-bracket notation will be omitted.)

```javascript
// has a delta-G value after its dot-bracket notation
var s = (
  '>Structure 1\n'
  + 'AAAGGGGAAAACCCCAAA\n'
  + '...((((....))))... (-28.10)'
);

var parsed = parseDotBracketFASTA(s);

parsed.name; // "Structure 1"
parsed.sequence; // "AAAGGGGAAAACCCCAAA"
parsed.dotBracket; // "...((((....))))..."
```

Pseudoknot characters (e.g., `[]`, `{}` and `<>`) are also allowed in dot-bracket notation.

```javascript
var s = (
  '>Pseudoknots\n'
  + 'AUGCAUGCAUGCAUGCAUGCAUGC\n'
  + '.((.[[.{{.<<.)).]].}}.>>'
);

var parsed = parseDotBracketFASTA(s);

parsed.name; // "Structure 1"
parsed.sequence; // "AUGCAUGCAUGCAUGCAUGCAUGC"
parsed.dotBracket; // ".((.[[.{{.<<.)).]].}}.>>"
```
