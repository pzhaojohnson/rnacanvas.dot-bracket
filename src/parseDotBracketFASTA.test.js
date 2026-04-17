import { parseDotBracketFASTA } from './parseDotBracketFASTA';

test('`function parseDotBracketFASTA()`', () => {
  // a hairpin structure
  expect(parseDotBracketFASTA(
    '>Structure-736184762\n'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC\n'
    + '...((((((.......)))))).....'
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '...((((((.......)))))).....',
  });

  // different newline encodings
  expect(parseDotBracketFASTA(
    '>Structure-736184762\r'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC\r'
    + '...((((((.......)))))).....'
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '...((((((.......)))))).....',
  });

  expect(parseDotBracketFASTA(
    '>Structure-736184762\r\n'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC\r\n'
    + '...((((((.......)))))).....'
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '...((((((.......)))))).....',
  });

  // some structures with different sequence and dot-bracket lengths
  expect(parseDotBracketFASTA(
    '>Structure-736184762\n'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC\n'
    + '....(((.....)))..'
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '....(((.....)))..',
  });

  expect(parseDotBracketFASTA(
    '>Structure-736184762\n'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC\n'
    + '....(((.....))).......................'
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '....(((.....))).......................',
  });

  // no dot-bracket line
  expect(parseDotBracketFASTA(
    '>Structure-736184762\n'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC'
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '',
  });

  // empty dot-bracket line
  expect(parseDotBracketFASTA(
    '>Structure-736184762\n'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC\n'
    + ''
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '',
  });

  // no sequence line
  expect(parseDotBracketFASTA(
    '>Structure-736184762'
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: '',
    dotBracket: '',
  });

  // empty sequence line
  expect(parseDotBracketFASTA(
    '>Structure-736184762\n'
    + ''
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: '',
    dotBracket: '',
  });

  // empty sequence and dot-bracket lines
  expect(parseDotBracketFASTA(
    '>Structure-736184762\n'
    + '\n'
    + ''
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: '',
    dotBracket: '',
  });

  // no name line (but sequence and dot-bracket lines)
  expect(parseDotBracketFASTA(
    'GAUGCUCGGCAUGCAUGCUAGCUGAUC\n'
    + '...((((((.......)))))).....'
  )).toStrictEqual({
    name: undefined,
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '...((((((.......)))))).....',
  });

  // no name line (and just a sequence line)
  expect(parseDotBracketFASTA(
    'GAUGCUCGGCAUGCAUGCUAGCUGAUC'
  )).toStrictEqual({
    name: undefined,
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '',
  });

  // empty name
  expect(parseDotBracketFASTA(
    '>\n'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC\n'
    + '...((((((.......)))))).....'
  )).toStrictEqual({
    name: '',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '...((((((.......)))))).....',
  });

  // empty string
  expect(() => parseDotBracketFASTA('')).toThrow();

  // just whitespace
  expect(() => parseDotBracketFASTA('  \t  \n  \r\n \t\t\t  ')).toThrow();

  // a one nucleotide structure
  expect(parseDotBracketFASTA(
    '>Structure-736184762\n'
    + 'G\n'
    + '.'
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'G',
    dotBracket: '.',
  });

  // extra leading and trailing whitespace around name
  expect(parseDotBracketFASTA(
    '> \t  Structure-736184762  \t\t \t\n'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC\n'
    + '...((((((.......)))))).....'
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '...((((((.......)))))).....',
  });

  // a structure with a delta-G value (separated by a space)
  expect(parseDotBracketFASTA(
    '>Structure-736184762\n'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC\n'
    + '...((((((.......))))))..... (-28.10)'
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '...((((((.......)))))).....',
  });

  // a structure with a delta-G value (separated by a tab)
  expect(parseDotBracketFASTA(
    '>Structure-736184762\n'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC\n'
    + '...((((((.......)))))).....\t(-28.10)'
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '...((((((.......)))))).....',
  });

  // leading and trailing empty and whitespace lines
  expect(parseDotBracketFASTA(
    '\n'
    + '     \n'
    + '\t\n'
    + '\n'
    + '     \t  \n'
    + '>Structure-736184762\n'
    + 'GAUGCUCGGCAUGCAUGCUAGCUGAUC\n'
    + '...((((((.......)))))).....\n'
    + '   \t  \n'
    + '\n'
    + '\t\t\n'
    + ' \t '
  )).toStrictEqual({
    name: 'Structure-736184762',
    sequence: 'GAUGCUCGGCAUGCAUGCUAGCUGAUC',
    dotBracket: '...((((((.......)))))).....',
  });
});
