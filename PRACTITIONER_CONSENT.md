# Practitioner Listing — Consent Form / 医师收录同意书 / Samtykke for Oppføring

> This template is what each practitioner signs and emails back to the site owner
> **before** their name is added to the directory. Keep these signed copies — they
> are the legal record of consent under GDPR Article 7 and helsedataloven.

---

## 1. What the listing contains / 收录内容 / Hva oppføringen inneholder

The site `[your-domain.com]` would publish the following information about you:

| Field | Example |
|---|---|
| Display name | Dr. Mei Chen |
| Chinese name (optional) | 陈梅 |
| Credentials | MD-TCM, Lic. Acupuncturist (Oslo) |
| Languages spoken | English, Norsk, 中文 |
| Practice location | Oslo, Norway |
| Specialties | Internal medicine, Women's health |
| Short bio (~80 words) | Free text you provide |
| Contact email | The address users can email reports to |
| Optional website | Your clinic URL |
| Optional photo | A professional headshot you provide |

The page is publicly readable. Any visitor to the site will see this information.

---

## 2. What it does NOT contain / 不包含的内容 / Hva oppføringen IKKE inneholder

- **No personal address, phone, or government-ID info** beyond what you state above.
- **No information about your patients.** The site sends users' tongue self-check
  reports directly to your email; the site does not store or read them.
- **No advertising or financial relationship.** The listing is free; the site owner
  receives nothing in exchange for listing you.

---

## 3. Use of the email address / 邮箱用途 / E-postens bruk

The email you provide will be used for:

1. **Pre-filling the "Send to my practitioner" form** — when a user picks you from
   the directory, the form auto-fills with your email so they can send their
   self-check report to you.
2. **Nothing else.** The site does not subscribe you to anything, does not share
   your email with third parties, and does not contact you except in response to
   a withdrawal request from you.

---

## 4. Your right to withdraw / 撤回权 / Din rett til å trekke deg tilbake

You may **withdraw consent at any time** by sending a single email to the site owner.
Withdrawal is processed **within 7 days** (typically same-day) and is no harder
than giving consent in the first place — this is required by GDPR Article 7(3).

After withdrawal:
- Your entry is removed from the published directory
- Any cached/CDN copies are purged within ~24 hours
- Your consent record (this form) is retained for **3 years** as legal proof of
  prior consent, then destroyed. You can also request immediate destruction.

---

## 5. Data controller / 数据控制者 / Dataansvarlig

| Role | Entity |
|---|---|
| Data controller | `[Your name / company]` |
| Contact for privacy questions | `[Your email]` |
| Hosting | Netlify, Inc. (USA — adequate-decision via SCC) |
| Email forwarding (optional) | Resend (USA — adequate-decision via SCC) |

The site stores **no patient data**. The site stores only this consent record (the
signed copy of this document) and the public listing JSON.

---

## 6. Disclaimers acknowledged by the practitioner

By signing below you confirm:

- ☐ You hold valid current credentials in the jurisdiction you list.
- ☐ You understand the site presents tongue diagnosis as **educational
  self-observation only**, not as clinical diagnosis.
- ☐ You are responsible for your own clinical practice and for any consultation
  that arises from a user contacting you. The site is a referral signpost only;
  it makes no clinical claims and assumes no liability for treatment.
- ☐ You will not use the listing to make claims that are illegal under your
  jurisdiction's medical-advertising rules (e.g., specific cure claims, or
  claims about treating regulated conditions).

---

## 7. Consent statement / 同意声明 / Samtykkeerklæring

> I, **`__________________________________________`** *(full legal name)*,
>
> consent to the publication of the information in §1 above on the site
> `[your-domain.com]` and to the use of my email address as described in §3.
>
> I confirm I am the rightful owner of the email and (if applicable) photo
> provided.
>
> I understand my right to withdraw at any time as described in §4.

| | |
|---|---|
| Signature | `_____________________________________` |
| Date | `_____________________________________` |
| Practitioner email | `_____________________________________` |

---

## 8. How to return this form

Send this filled-out form back to **`[your email]`** as either:

- A scanned PDF / photo of the signed paper form, or
- A reply email with the §7 statement filled in (typed counts as a signature
  under Norwegian law for non-real-estate consents)

Once received and reviewed, your entry will be added to the directory typically
within 7 days.

---

## Site owner: how to handle these forms

1. **Save the signed form** to a folder on your computer (not in the site repo).
   Filename suggestion: `practitioners-consent/<lastname>-<date>.pdf`.
2. **Add the practitioner** to `assets/practitioners.json` — see the existing
   structure. Set `"active": true` and fill in `consent_date`.
3. **Keep a backup** of the consent forms (encrypted; e.g., a password-protected
   ZIP on a separate drive). These are the proof you need if asked.
4. **On withdrawal request:** within 7 days remove the JSON entry, redeploy
   the site, send a confirmation reply to the practitioner, and keep the
   consent-record file for 3 years (or destroy on explicit request).
