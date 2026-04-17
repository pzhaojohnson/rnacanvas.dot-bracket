import { splitLines } from '@rnacanvas/utilities';

/**
 * Parses a string in dot-bracket FASTA format
 * (e.g., the text contents of a dot-bracket FASTA file).
 *
 * Throws if unable to parse the string.
 */
export function parseDotBracketFASTA(dotBracketFASTA: string) {
  let lines = splitLines(dotBracketFASTA);

  // remove empty lines (or lines that are just whitespace)
  lines = lines.filter(line => line.trim().length > 0);

  if (lines.length == 0) {
    throw new Error('Dot-bracket FASTA string has no content.');
  }

  let firstLine = lines[0];

  let name = firstLine.charAt(0) == '>' ? firstLine.substring(1) : undefined;

  // remove leading and trailing whitespace
  name = name?.trim();

  let sequence = firstLine.charAt(0) != '>' ? (
    firstLine
  ) : lines.length < 2 ? (
    ''
  ) : (
    lines[1]
  );

  let dotBracket = lines.length < 2 ? (
    ''
  ) : firstLine.charAt(0) != '>' ? (
    lines[1]
  ) : lines.length < 3 ? (
    ''
  ) : (
    lines[2]
  );

  // remove any trailing delta-G value
  dotBracket = dotBracket.split(/\s+/)[0];

  return { name, sequence, dotBracket };
}
