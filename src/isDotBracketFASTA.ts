import { parseDotBracketFASTA } from './parseDotBracketFASTA';

/**
 * Returns `true` if the string is a dot-bracket FASTA string
 * and `false` otherwise.
 */
export function isDotBracketFASTA(s: string): boolean {
  let parsed;

  try {
    parsed = parseDotBracketFASTA(s);
  } catch {
    return false;
  }

  if (parsed.name != undefined) {
    return true;
  }

  return (
    parsed.dotBracket.length > 0
    && [...parsed.dotBracket].every(c => dotBracketCharacters.has(c))
  );
}

/**
 * All recognized characters in dot-bracket notation.
 */
const dotBracketCharacters = new Set([...'.()[]{}<>']);
