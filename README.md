# Sibeve Group — Static Site

## Email Setup (Contact & Quote Forms)

The site uses Node + Nodemailer to send form submissions to **sibeve.sales@gmail.com** and an auto-reply to the requester.

### 1. Generate a Gmail App Password

1. Sign in to the Google Account for `sibeve.sales@gmail.com`.
2. Go to **Google Account → Security** and enable **2-Step Verification** (required).
3. Visit https://myaccount.google.com/apppasswords
4. Create an app password (name it "Sibeve Website"). Copy the 16-character password.

### 2. Create your `.env` file

Copy `.env.example` to `.env` in the project root and paste your App Password:

```
SMTP_USER=sibeve.sales@gmail.com
SMTP_PASS=xxxxxxxxxxxxxxxx
MAIL_TO=sibeve.sales@gmail.com
MAIL_FROM=Sibeve Group <sibeve.sales@gmail.com>
PORT=3000
```

> The `.env` file MUST NOT be committed to git. Add it to `.gitignore`.

### 3. Install dependencies

```powershell
npm install
```

### 4. Run the server

```powershell
npm start
```

Open http://localhost:3000

### Endpoints

- `POST /api/contact` — handles the contact form
- `POST /api/quote` — handles the quote request form

Both:
1. Send a notification email to `MAIL_TO`
2. Send an auto-reply to the submitter's email address

### Troubleshooting

- **"Email service is not configured"** — `SMTP_PASS` is missing. Check `.env`.
- **"Invalid login"** — Re-generate the App Password (don't use your normal Gmail password).
- **Auto-reply not arriving** — Check spam folder; ensure the requester's email is valid.
- **Port already in use** — The server auto-increments to the next free port; check console output.
