---
title: How to sort Google Sheets automatically when data changes (free)
description: Keep a Google Sheets tab sorted by date, status or name automatically after every edit, with the header row in place. Free Apps Script, multi-column sorting.
image: https://decodedxr.github.io/sheets-auto-sort/assets/cover.png
---
{% raw %}

# How to sort Google Sheets automatically when data changes (free)

**Data → Sort range** sorts once. The moment someone adds a task or changes a due date, the list is out of order again, and someone has to remember to re-sort it.

There are two ways to fix that:

1. **A `SORT` formula on another tab**, like `=SORT(Tasks!A2:D, 3, TRUE)`. It's always sorted, but it's a read-only copy: you can't edit the sorted view.
2. **A script that re-sorts the real tab after every edit.** That's what this guide sets up, using [Auto Sort](https://github.com/DecodedXR/sheets-auto-sort), a free, MIT-licensed Apps Script.

## Step 1: Add the script

1. Open your sheet and go to **Extensions → Apps Script**.
2. Delete what's in `Code.gs` and paste in [this `Code.gs`](https://github.com/DecodedXR/sheets-auto-sort/blob/main/Code.gs).

## Step 2: Say what to sort

At the top is a `SORTS` list, one line per tab:

```js
const SORTS = [
  { tab: 'Tasks', sortBy: 'C, A desc' },
];
```

- `tab` is the tab's name, exactly as on the tab.
- `sortBy` is one or more column letters, separated by commas. Add `desc` after a letter for Z→A, largest first or newest first.

`'C, A desc'` means: sort by column C, and where C is the same, put the newest (or largest) value in A first.

Click **Save**. That's it: no trigger to set up. Edit any cell on the Tasks tab and watch it re-sort.

## Recipes

| You want | sortBy |
|---|---|
| Earliest due date first (dates in C) | `'C'` |
| Newest entries first (timestamps in A) | `'A desc'` |
| By status, then by due date | `'B, C'` |
| Highest score first, ties by name | `'D desc, A'` |

## FAQ

**Can I sort right now without editing?** Reload the sheet once to see the **↕️ Auto Sort** menu, then click **Sort All Now**. The first time, Google asks you to approve the script ("Google hasn't verified this app" → **Advanced → Go to (your project name) → Allow**).

**My row jumped while I was typing.** The sort runs as soon as an edit is saved. Fill in the column you sort by last, or use a `SORT` formula view instead.

**Does it sort rows from Google Forms?** Form submissions don't count as edits, so new responses are sorted on the next edit or with **Sort All Now**.

**What about the header?** `HEADER_ROWS` (1 by default) rows at the top never move.

---

[Get the script on GitHub](https://github.com/DecodedXR/sheets-auto-sort) · [More free Google Sheets scripts](https://decodedxr.github.io/free-google-sheets-scripts/)
{% endraw %}
