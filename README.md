<p align="center"><img src="assets/logo.png" alt="FileSafety" width="180"></p>

# FileSafety (v3)

> **Built by me in 2021–2022** (the earliest asset is from October 2021; the code is from January to September 2022). Uploaded to GitHub in November 2026 as an archive of my early work. The commit dates match the original file timestamps.
>
> I later sold FileSafety. The live product at [filesafety.net](http://filesafety.net) is run by its new owner and has changed a lot since then. This repo is my original v3 code only, and it is unrelated to the current production system. The session secret and SMTP password in `backend/settings/` were replaced with placeholders.

FileSafety is a SaaS licensing and activation platform for developers who sell scripts and files. Developers register their products, issue license keys, and bind activations to an address with an expiry date. Their software then checks each license against the FileSafety API.

## Features
- **Products and activations:** create products, then activate, update or deactivate licenses (key, address, expiry)
- **Developer API (`/v1`):** authenticated with API credentials so developers' own software can validate licenses
- **Accounts:** register, log in and verify email (Passport local strategy, bcrypt, verification emails through Nodemailer)
- **Subscriptions:** API access depends on an active subscription
- **Dashboard:** overview, products, activations and activity logs
- **Admin routes:** user management

## Stack
- **Backend:** Node.js, Express, Passport, express-session, MySQL, Nodemailer
- **Web:** React 17 (Create React App), styled-components

## Structure
```
backend/
  settings/           Express, MySQL and mailer settings
  source/filesafety.js   entry point
  source/routers/     authentication, /v1 API (products, activations, responses, admin), activations
  source/middlewares/ auth, admin, subscription and API credential checks
  source/database/    MySQL connection and table manager
  source/public/      production build of the web app
web/
  src/pages/          homepage, authentication, dashboard
  src/components/     sidebar, modals, dashboard and authentication UI
```

## Running it
Backend: fill in `backend/settings/*.json`, then `cd backend && npm install && npm start`.
Web: `cd web && npm install && npm start`. API URLs in `web/src` point to the old production API and need changing for local use.

## Author
Ghaith (icxaith), 2021–2022
