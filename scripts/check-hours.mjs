/**
 * Sanity-checks the opening-hours logic against fixed instants, including both
 * daylight-saving transitions. Run: node scripts/check-hours.mjs
 */
import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const result = await build({
  entryPoints: ['src/lib/openingHours.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
});
const dir = mkdtempSync(join(tmpdir(), 'chichas-'));
const file = join(dir, 'openingHours.mjs');
writeFileSync(file, result.outputFiles[0].text);
const { openingStatusAt } = await import(pathToFileURL(file).href);

// Each case: UTC instant, what St. Augustine local time it is, expectation.
const cases = [
  ['2026-10-14T15:30:00Z', 'Wed 11:30 ET', true, 'Closes 9:30 PM'],
  ['2026-10-14T14:30:00Z', 'Wed 10:30 ET (before weekday open)', false, 'Opens today at 11:00 AM'],
  ['2026-10-15T01:45:00Z', 'Wed 21:45 ET (after close)', false, 'Opens Thursday at 11:00 AM'],
  ['2026-10-17T14:30:00Z', 'Sat 10:30 ET (weekend open)', true, 'Closes 10:00 PM'],
  ['2026-10-18T13:30:00Z', 'Sun 09:30 ET (before weekend open)', false, 'Opens today at 10:00 AM'],
  ['2026-10-19T02:30:00Z', 'Sun 22:30 ET (after weekend close)', false, 'Opens Monday at 11:00 AM'],
  // EDT -> EST ends 2026-11-01; winter instants use UTC-5.
  ['2026-11-02T16:30:00Z', 'Mon 11:30 EST', true, 'Closes 9:30 PM'],
  ['2026-11-02T15:30:00Z', 'Mon 10:30 EST (before open)', false, 'Opens today at 11:00 AM'],
  // EST -> EDT starts 2027-03-14.
  ['2027-03-15T15:30:00Z', 'Mon 11:30 EDT', true, 'Closes 9:30 PM'],
  ['2027-03-15T14:30:00Z', 'Mon 10:30 EDT (before open)', false, 'Opens today at 11:00 AM'],
];

let failures = 0;
for (const [iso, label, expectedOpen, expectedDetail] of cases) {
  const status = openingStatusAt(new Date(iso));
  const ok = status && status.isOpen === expectedOpen && status.detail === expectedDetail;
  if (!ok) failures += 1;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(38)} -> ${status ? (status.isOpen ? 'Open' : 'Closed') : 'null'} / ${status?.detail}`,
  );
}
console.log(failures === 0 ? '\nAll opening-hours checks passed.' : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
