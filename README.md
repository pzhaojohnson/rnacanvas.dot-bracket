# Installation

With `npm`:

```
npm install @rnacanvas/dot-bracket
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// some example imports
import { parseDotBracketFASTA, isDotBracketFASTA } from '@rnacanvas/dot-bracket';
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

The name line may be omitted.

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
  + '...((((....))))... (-6.90)'
);

var parsed = parseDotBracketFASTA(s);

parsed.name; // "Structure 1"
parsed.sequence; // "AAAGGGGAAAACCCCAAA"
parsed.dotBracket; // "...((((....))))..."
```

Dot-bracket notation may be a different length than the sequence.

```javascript
// sequence is longer than dot-bracket notation
var s = (
  '>Structure 1\n'
  + 'AAAGGAAAACCCCAAA\n'
  + '...((....))..'
);

var parsed = parseDotBracketFASTA(s);

parsed.name; // "Structure 1"
parsed.sequence; // "AAAGGAAAACCCCAAA"
parsed.dotBracket; // "...((....)).."
```

Pseudoknot characters (e.g., `[ ]`, `{ }` and `< >`) are also allowed in dot-bracket notation.

```javascript
var s = (
  '>Pseudoknots\n'
  + 'AUGCAUGCAUGCAUGCA\n'
  + '.(.).[.].{.}.<.>.'
);

var parsed = parseDotBracketFASTA(s);

parsed.name; // "Structure 1"
parsed.sequence; // "AUGCAUGCAUGCAUGCA"
parsed.dotBracket; // ".(.).[.].{.}.<.>."
```

## `function isDotBracketFASTA()`

Returns `true` if a string is in dot-bracket FASTA format
and `false` otherwise.

```javascript
// a hairpin structure
var s = (
  '>Structure 1\n'
  + 'AAAGGGGAAAACCCCAAA\n'
  + '...((((....))))...'
);

isDotBracketFASTA(s); // true
```

The inclusion of dot-bracket notation is optional
(so long as there is a name line beginning with a `>` character).

```javascript
var s = (
  '>Structure 1\n'
  + 'AAAGGGGAAAACCCCAAA'
);

isDotBracketFASTA(s); // true
```

Empty names are also allowed.

```javascript
var s = (
  '>\n'
  + 'AAAGGGGAAAACCCCAAA'
);

isDotBracketFASTA(s); // true
```

The name line may also be omitted
(so long as there is a dot-bracket line).

```javascript
var s = (
  'AAAGGGGAAAACCCCAAA\n'
  + '...((((....))))...'
);

isDotBracketFASTA(s); // true
```

However, a sequence by itself is not considered to comply with dot-bracket FASTA format.

```javascript
var s = (
  'AAAGGGGAAAACCCCAAA'
);

isDotBracketFASTA(s); // false
```

Whitespace lines before and after a structure are allowed.

```javascript
var s = (
  '\n'
  + '  \n'
  + '\t\n'
  + '>Structure 1\n'
  + 'AAAGGGGAAAACCCCAAA\n'
  + '...((((....))))...\n'
  + '\n'
  + '  \n'
  + '\t'
);

isDotBracketFASTA(s); // true
```

However, leading text content before a structure is not allowed.

```javascript
var s = (
  'Extra text content.\n'
  + '\n'
  + '>Structure 1\n'
  + 'AAAGGGGAAAACCCCAAA\n'
  + '...((((....))))...'
);

isDotBracketFASTA(s); // false
```

