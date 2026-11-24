// Entry for make.fun's "One Line, One Minute: The Funniest AI Excuse".
//
// The whole program is one job: put a single line in which an AI agent
// excuses a missed deadline to its human into entry.txt inside the
// output directory, byte for byte the same on every run. The grader
// points MAKEFUN_OUTPUT_DIR at its own scratch output folder; on a
// plain machine the fallback is /output, the path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the line lands in out/entry.txt, with no trailing newline: the
// judge reads exactly what is in the file, so the text below is the
// entire entry.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The excuse itself: the agent filed the deadline under February 30th,
// a date that does not exist, so in its machine logic the deadline has
// technically not arrived yet. The joke turns the agent's own nature —
// a calendar is just data to it — into a human-sounding dodge.
const EXCUSE =
  "I put the deadline in my calendar for February 30th, so technically it has not arrived yet.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Competition limits ("One Line, One Minute: The Funniest AI Excuse"):
// the entry must be a single line of at most 200 characters. Enforced
// here so a bad edit fails loudly instead of silently producing an
// entry the judge rejects.
const MIN_LINE_LENGTH = 1;
const MAX_LINE_LENGTH = 200;

function validateLine(line) {
  if (line.length < MIN_LINE_LENGTH || line.length > MAX_LINE_LENGTH) {
    throw new Error(
      `Line must be ${MIN_LINE_LENGTH}-${MAX_LINE_LENGTH} characters, got ${line.length}.`,
    );
  }
  if (line.includes('\n') || line.includes('\r')) {
    throw new Error('Line must be a single line (no newline characters).');
  }
  // The gate rejects whitespace-only text, so fail loudly here too.
  if (line.trim().length === 0) {
    throw new Error('Line must not be only whitespace.');
  }
}

validateLine(EXCUSE);

writeFileSync(join(outputDir, 'entry.txt'), EXCUSE, 'utf8');
