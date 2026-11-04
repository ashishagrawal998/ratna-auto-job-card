# Workshop Job Card

Job card system for tractor workshops (first dealer: Ratna Auto, Massey Ferguson, Lahan-1).

- `/` – live app (login required). Talks to Supabase directly; all data rules (who sees what) are enforced in the database with row-level security.
- `/demo/` – demo with sample customers and the real MRP parts list, no login.
- `app.js` – the app. Supabase URL + publishable key are public by design; never commit the secret key.
- Real customer data lives only in Supabase, never in this repo.
