# Email Relay Setup — Sending Reports to TCM Practitioners

This site optionally lets users email their tongue self-check report directly
to a TCM practitioner of their choice. The relay is implemented as a single
Netlify Function (`netlify/functions/send-report.js`) that uses **Resend** —
a developer-friendly transactional email service with a generous free tier.

The site works perfectly without setting this up — users will simply see a
"Falling back to email app" message and the report will open in their default
mail client via mailto: instead. Set up the relay only if you want one-click
sending from the site itself.

## Privacy guarantees that this design preserves

- **No accounts.** Users type their own name and emails into the form each
  time they want to send a report. The site does not remember anything between
  sessions.
- **No storage on your side.** The Netlify Function receives the report,
  forwards it once, and the data leaves no trace in your infrastructure.
- **The user CCs themselves.** Every email sent has the user as CC, so they
  always have a copy of what was sent.
- **Reply-to is the user.** When the practitioner hits "Reply", the message
  goes to the user, not to you.

## Step 1 — Sign up for Resend

1. Go to <https://resend.com> and create an account (free, no credit card).
2. Verify your email.

## Step 2 — Verify a sender domain

Resend won't send mail "from" any address you don't own. You have two options:

### Option A — Use a domain you own

If you own (e.g.) `mytcmsite.com`:

1. In the Resend dashboard, click **Domains → Add Domain**.
2. Enter `mytcmsite.com`.
3. Resend gives you a few DNS records (SPF, DKIM, DMARC). Add these in
   the DNS settings of your domain registrar.
4. Click **Verify** in Resend. Verification typically completes in a few
   minutes.
5. Pick any sender address on that domain (e.g. `report@mytcmsite.com`) —
   you don't need to actually create the mailbox; Resend just needs the
   domain to be verified.

### Option B — Use Resend's `onboarding@resend.dev` (testing only)

Without a custom domain, Resend lets you send only to **your own verified
email address**, useful for testing. Production users won't be able to
receive these emails. So this option is for confirming everything works
before doing Option A.

## Step 3 — Get an API key

1. In Resend, click **API Keys → Create API Key**.
2. Copy the key (starts with `re_…`).

## Step 4 — Set environment variables in Netlify

1. In Netlify, open your site's **Site settings → Environment variables**.
2. Add these two:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | the `re_…` key you just created |
| `FROM_ADDRESS`   | the sender, e.g. `Tongue Reports <report@mytcmsite.com>` |

3. Trigger a redeploy: **Deploys → Trigger deploy → Deploy site**.

## Step 5 — Test it end-to-end

1. Open your deployed site at `your-site.netlify.app/tongue` (or `/tongue.html`).
2. Pick a tongue color, shape, and coating to enable the report.
3. Click **Generate my self-check report**.
4. Click **Send to my practitioner**.
5. Fill in:
    - Your name
    - Your email (this address will receive a CC)
    - Practitioner's email (during testing, just use your own)
    - Optional note
    - Tick the consent checkbox
6. Click **Send report**.
7. Check both inboxes — the practitioner address should receive the report
   with your photo as an attachment, with the user CC'd. The Reply-To header
   is set to the user's email, so the practitioner can simply hit Reply.

## Cost estimate

Resend's free tier: **3,000 emails per month, 100 per day**. For a TCM
educational site this should cover anything except viral traffic. If you
ever need more, paid tiers start at $20/month for 50k emails.

Alternative providers with similar APIs you can swap in by editing
`netlify/functions/send-report.js`: Postmark (100/month free), SendGrid
(100/day free), Mailgun (5,000 first 3 months).

## Operational notes

- **Delivery logs.** Resend keeps a log of every email sent (sender,
  recipient, subject, status) for ~30 days for delivery debugging. You can
  see them in the Resend dashboard. After 30 days they're auto-deleted.
- **The photo is sent as an attachment.** Not as an inline base64 blob —
  it shows up as `tongue-photo.jpg` (or `.png`) in the practitioner's email.
- **Size limits.** The function rejects payloads larger than ~2 MB. If a
  user's photo is bigger, Canvas in the browser already downscales it before
  it ever reaches the function (see `tongue.html` photo handler).
- **Spam score.** Always send from a properly authenticated domain (Option A
  in Step 2). Sending from an unverified or suspicious-looking address will
  land your messages in spam folders.

## Privacy / GDPR notes (Norway / EU)

If you operate in the EU (including Norway, where helsedataloven applies):

- The relay design avoids "data storage" — you are merely a transmitter, the
  same way a postcard isn't kept by the postal service. The user supplies
  their own data and chooses the recipient. This is the lowest-risk pattern.
- Make sure your privacy policy mentions that:
    - Reports are emailed via Resend (a sub-processor).
    - The site itself stores nothing.
    - Users should not include identifiable medical information they aren't
      willing to send to the practitioner they named.
- If you want **zero retention even at Resend**, contact Resend support to
  ask about their data retention controls. Some plans support shorter logs.

## If you don't set up Resend

The site detects the missing configuration and gracefully falls back to
opening the user's local email app via `mailto:` with the report content
pre-filled. The user can then attach their photo manually and send. This
is what the original site already does for users who don't want to use the
relay at all.

---

That's it. The whole relay is one ~150-line file (`netlify/functions/send-report.js`),
two env variables, and Resend's free tier. No database, no users table, no logs.
