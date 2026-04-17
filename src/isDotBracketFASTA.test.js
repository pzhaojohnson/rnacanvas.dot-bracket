import { isDotBracketFASTA } from './isDotBracketFASTA';

test('`function isDotBracketFASTA()`', () => {
  // a hairpin structure in dot-bracket FASTA format
  expect(isDotBracketFASTA(
    '>Structure 1\n'
    + 'AAAGGGGAAAACCCCAAA\n'
    + '...((((....))))...'
  )).toBe(true);

  // different newline encodings
  expect(isDotBracketFASTA(
    '>Structure 1\r'
    + 'AAAGGGGAAAACCCCAAA\r'
    + '...((((....))))...'
  )).toBe(true);

  expect(isDotBracketFASTA(
    '>Structure 1\r\n'
    + 'AAAGGGGAAAACCCCAAA\r\n'
    + '...((((....))))...'
  )).toBe(true);

  // sequence and dot-bracket notations of different lengths
  expect(isDotBracketFASTA(
    '>Structure 1\n'
    + 'AAAGGGGAAAACCCCAAA\n'
    + '...((((....))))'
  )).toBe(true);

  // leading and trailing empty and whitespace lines
  expect(isDotBracketFASTA(
    '\n'
    + '   \n'
    + '\t\n'
    + '>Structure 1\n'
    + 'AAAGGGGAAAACCCCAAA\n'
    + '...((((....))))...\n'
    + '\n'
    + '\t\n'
    + '   '
  )).toBe(true);

  // empty dot-bracket notation (but still has name line)
  expect(isDotBracketFASTA(
    '>Structure 1\n'
    + 'AAAGGGGAAAACCCCAAA\n'
    + ''
  )).toBe(true);

  // no dot-bracket line (but still has name line)
  expect(isDotBracketFASTA(
    '>Structure 1\n'
    + 'AAAGGGGAAAACCCCAAA'
  )).toBe(true);

  // no dot-bracket line (and empty name)
  expect(isDotBracketFASTA(
    '>\n'
    + 'AAAGGGGAAAACCCCAAA'
  )).toBe(true);

  // no name line (and no dot-bracket line)
  expect(isDotBracketFASTA(
    'AAAGGGGAAAACCCCAAA'
  )).toBe(false);

  // no name line (but still has sequence and dot-bracket lines)
  expect(isDotBracketFASTA(
    'AAAGGGGAAAACCCCAAA\n'
    + '...((((....))))...'
  )).toBe(true);

  // empty name
  expect(isDotBracketFASTA(
    '>\n'
    + 'AAAGGGGAAAACCCCAAA\n'
    + '...((((....))))...'
  )).toBe(true);

  // an empty string
  expect(isDotBracketFASTA('')).toBe(false);

  // only empty lines and whitespace
  expect(isDotBracketFASTA(' \t   \n   \r\n   \r  \t\t\t ')).toBe(false);

  // random text contents
  expect(isDotBracketFASTA(
    '\n'
    + 'USOIDJF\n'
    + '8 283r 98hif 981\n'
    + '\n'
    + ' \tij03u'
  )).toBe(false);
});
