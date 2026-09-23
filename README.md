# Currency Converter

A simple currency converter built using HTML, CSS, and JavaScript.

## Files

- `index.html` - the page structure and styling
- `script.js` - all the JavaScript logic (fetching rates + converting)

## How it works

1. When the page loads, it fills the "From" and "To" dropdowns with currency options.
2. It tries to fetch live exchange rates from a free API (`open.er-api.com`).
   - If the fetch works, it uses the live rates.
   - If the fetch fails (no internet, API down, etc.), it falls back to some fixed backup rates so the app still works.
3. When you click "Convert", it:
   - Converts your entered amount to USD first.
   - Then converts that USD amount into the target currency.
   - Shows the result on the page.

## Currencies supported

- USD - US Dollar
- INR - Indian Rupee
- EUR - Euro
- GBP - British Pound
- JPY - Japanese Yen
- AUD - Australian Dollar
- CAD - Canadian Dollar

## How to run it

1. Download both `index.html` and `script.js` into the same folder.
2. Open `index.html` in any web browser.
3. Enter an amount, pick your currencies, and click "Convert".

## Notes

- This was made for practicing basic JavaScript concepts like functions, loops, fetch, and DOM manipulation.
- Rates come from a free API and are not meant for real financial use.
