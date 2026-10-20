# Free Auto Sort for Google Sheets: keep tabs sorted automatically

![Auto Sort for Google Sheets](assets/cover.png)

Google Sheets sorts a range once, when you ask. Add a row or change a date, and it's out of order again. This keeps the tabs you choose sorted **automatically after every edit**, with the header row left in place. One free script, no add-on.

```js
const SORTS = [
  { tab: 'Tasks',    sortBy: 'C, A desc' },   // by column C, then newest A first
  { tab: 'Contacts', sortBy: 'B' },           // by column B, A→Z
];
```

- Sort by one column or several (`'B, D desc'`)
- `asc` (A→Z, smallest first, oldest first) or `desc`
- **↕️ Auto Sort → Sort All Now** sorts every listed tab on demand

New to this? Read the [step-by-step guide](https://decodedxr.github.io/sheets-auto-sort/auto-sort-google-sheets.html).

## Setup (1 minute)

1. In your sheet: **Extensions → Apps Script**.
2. Replace `Code.gs` with this repo's `Code.gs`.
3. Edit `SORTS` for your tab names and columns, and click **Save**. It starts working on the next edit.

`HEADER_ROWS` (default 1) is how many rows at the top never move.

## Things to know

- The tab re-sorts as soon as an edit is saved, so the row you just edited may jump to a new place. That's the point, but it can surprise people who are typing across a row. Fill in the sort column last, or sort on a column that's filled in last.
- Only edits made by people trigger a sort. Rows added by Google Forms or other scripts get sorted on the next edit or with **Sort All Now**.
- Formulas that refer to a specific row (like `=A5`) still point at row 5 after sorting. Formulas inside the sorted rows that refer to their own row move with the row.
- Prefer a sorted view that never changes the data? Use a `=SORT(...)` formula on another tab instead.

## More free Google tools

- [Row Cleanup](https://github.com/DecodedXR/sheets-row-cleanup): move Done rows to another tab, delete blank rows.
- [All free Google Sheets scripts](https://github.com/DecodedXR/free-google-sheets-scripts).

## License

MIT. See `LICENSE`.
