SceneYard — Full System Brief (Tech + Non-Tech)
==================================================

1. OVERVIEW
------------
SceneYard is a modern platform and community for **After Effects creators**. It provides a curated library of professional-quality After Effects templates and project files. Users can subscribe, earn credits, and download ready-to-use projects that help them produce videos faster and at higher quality. The platform combines marketplace mechanics, credit-based subscriptions, and community features.

The ultimate goal is to become the **largest curated After Effects ecosystem** — where users can browse, download, learn, and later upload their own creations.

--------------------------------------------------

2. CORE VALUE PROPOSITION
--------------------------
- **Quality over quantity**: Each template is handcrafted, tested, and organized.
- **Speed**: Editors can finish projects faster using pre-built scenes.
- **Simplicity**: Credits system instead of complex pricing.
- **Community**: Built by motion designers, for motion designers.
- **Scalability**: Starts as an internal library → evolves into an open creator marketplace.

--------------------------------------------------

3. TARGET USERS
----------------
- Freelance video editors and motion designers.
- Small agencies and studios.
- YouTubers and content creators.
- Students and creative professionals.

--------------------------------------------------

4. USER GOALS
--------------
- Discover professional-grade After Effects templates.
- Download templates using credits (earned via subscription or top-up).
- Save time on projects without compromising quality.
- Get inspired by other creators.
- Eventually sell or share their own templates (future phase).

--------------------------------------------------

5. KEY FEATURES
----------------
### User Features
- Google login authentication.
- Dynamic After Effects template library.
- Search & filter by style, tags, AE version, or resolution.
- Credits-based subscription system.
- Download manager (tracks credits used and items downloaded).
- Referral bonuses and Golden membership program.
- Feedback form for template requests.
- Responsive, cinematic UI with live previews.

### Admin Features
- Upload and manage templates.
- Categorize and tag templates.
- Manage plans, subscriptions, and pricing.
- Monitor analytics (downloads, users, credits, revenue).
- Approve new creators (future phase).

--------------------------------------------------

6. SUBSCRIPTION MODEL
----------------------
SceneYard operates on a **credit-based subscription model**:

| Plan | Price | Credits | Rollover | Notes |
|------|--------|----------|-----------|--------|
| Free | $0 | 10 (trial week) | None | Limited access |
| Plus | $15 | 25 | 1 month | Standard plan |
| Pro | $25.99 | 50 | 2 months | Early access |
| Ultimate | $39.99 | 100 | 3 months | Full access + perks |

### Additional details
- Users can **top-up** credits at any time.
- **Golden Members** (early supporters) get +15% credits for life.
- Referral program grants bonus credits to both referrer and referee.

--------------------------------------------------

7. SYSTEM ARCHITECTURE (TECH OVERVIEW)
--------------------------------------

### Infrastructure
- **Frontend:** Next.js (React-based)
- **Backend:** Cloudflare Workers
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare R2 (for preview and downloadable assets)
- **Payments:** Lemon Squeezy (webhooks + checkout)
- **Auth:** Google OAuth 2.0
- **Search:** SQLite FTS5
- **Analytics/Logs:** Cloudflare KV or Logflare

### Core Data Entities
- **Users** — Basic profile, Google ID, referral info, role.
- **Plans** — Defines subscription tiers.
- **Subscriptions** — Holds active plan, credits balance, renewal dates.
- **Payment Events** — Stores raw provider webhook events.
- **Credits Ledger** — Every credit gain/loss entry.
- **Downloads** — Tracks all user downloads.
- **Videos** — Represents After Effects templates.
- **Assets** — Files stored on R2 (preview + download files).
- **Styles / Tags** — Filtering and search structure.
- **Likes** — User favorites.

### File Storage
- Each video links to two assets: a **preview video** and a **project file (.zip)**.
- All files are stored privately in R2.
- Downloads happen via short-lived **signed URLs** (10–15 minutes validity).

### Database Highlights
- Every credit change goes through the **credits_ledger** table with a unique idempotency key.
- Subscriptions table keeps a cached balance and version for optimistic locking.
- Payment events are idempotent by provider event ID.
- FTS5 table for fast title + description + tags search.

--------------------------------------------------

8. SECURITY MODEL
------------------
- All project files are private; no public R2 links.
- Downloads require a valid session and credit deduction.
- Each download and payment action is idempotent (preventing double charges).
- Webhooks from Lemon Squeezy verified via HMAC signature.
- Roles: `user`, `admin`.
- Admin-only upload and moderation routes.
- Optional reCAPTCHA or rate limits for forms and downloads.

--------------------------------------------------

9. FRONTEND EXPERIENCE
-----------------------

### Pages / Routes
1. Landing Page (waitlist, hero, demo, FAQ, feedback)
2. Templates page (grid of videos with filters & search)
3. Template detail page (preview, cost, download button)
4. Pricing / Subscription page
5. Account page (plan info, balance, downloads, favorites)
6. Billing page (history, receipts)
7. Admin dashboard (upload, manage content)

### Design Direction
- Modern, minimal, cinematic.
- Color palette: dark neutral base with dynamic accents.
- Fonts: clean geometric sans (e.g., Inter, Plus Jakarta Sans, Satoshi).
- Animations: light motion, not flashy.
- Hero section: Pixel Blast background (reactbits.dev).
- Feedback & steps forms: Stepper component (reactbits.dev).
- Demo section: 4 autoplaying preview videos with download CTA.

--------------------------------------------------

10. FUNCTIONAL FLOWS
--------------------

### Login & Signup
1. User logs in with Google.
2. Account is created or updated.
3. Trial credits are added automatically.

### Subscription / Renewal
1. User chooses a plan → redirected to Lemon checkout.
2. Lemon sends webhook on success → adds credits and updates subscription.
3. System updates renewal dates and balance.

### Download Process
1. User selects template.
2. System checks credits balance.
3. Deducts credits using ledger (atomic transaction).
4. Inserts download record.
5. Returns signed URL to R2 file.
6. If retried (same idempotency key), system returns previous success.

### Top-up & Referral
- Similar to subscription renewal but triggered by specific payment events.
- Bonus credits added via ledger entry.

--------------------------------------------------

11. NON-TECHNICAL FEATURES & BRANDING
--------------------------------------

### Brand Identity
- **Name:** SceneYard — represents creativity, collaboration, and cinematic quality.
- **Tone:** modern, confident, community-driven.
- **Positioning:** professional yet approachable.

### Visual Principles
- Simplicity first; show confidence through clarity.
- Background motion adds life, not distraction.
- Focused typography hierarchy: bold headers, light body.
- Dynamic, responsive, and visually balanced.

### Communication Style
- Friendly and creative tone.
- Clear explanations with simple terms.
- Inspiring messaging that appeals to motion designers.

--------------------------------------------------

12. COMMUNITY & FUTURE EXPANSION
---------------------------------

### Future Phases
- **Phase 1:** Internal library only (SceneYard Originals).
- **Phase 2:** Creator uploads & marketplace.
- **Phase 3:** Tutorials, educational content, and blog.
- **Phase 4:** Freelance / job platform for motion designers.

### Community Building
- Referral rewards for early members.
- Discord or built-in forum integration (later phase).
- Creator spotlight program.

--------------------------------------------------

13. BUSINESS STRATEGY
----------------------

### Revenue Streams
- Subscription fees (main source).
- Top-ups for extra credits.
- Future marketplace commission.
- Golden member lifetime tier.

### Marketing Hooks
- Early access waitlist with rewards.
- Demo videos showcasing real templates.
- “Golden Member” counter (urgency & exclusivity).
- Referral-based growth loop.

--------------------------------------------------

14. FAQ SUMMARY
----------------
- SceneYard templates are **original, not resold**.
- Built for **speed and clean workflow**.
- Mostly **plugin-free**.
- Includes **commercial license** with subscription.
- Templates tested for **render performance**.
- Users can request new templates.

--------------------------------------------------

15. TECHNICAL CHECKLIST
------------------------
- [x] Google OAuth integration
- [x] Credit ledger system with idempotency
- [x] Subscription management via Lemon webhooks
- [x] Private R2 file storage with signed URLs
- [x] Cloudflare D1 schema finalized
- [x] Download flow optimized for retries
- [x] Frontend: responsive React + Next.js
- [x] Admin upload interface
- [ ] Email notifications on renewals (planned)
- [ ] Public API for creator uploads (future)

--------------------------------------------------

16. LAUNCH PLAN
----------------
- Pre-launch waitlist landing page (with Pixel Blast background, demo section, FAQ, and feedback form).
- Build initial library of 350–400 exclusive templates.
- Invite first 500 Golden Members.
- Launch subscription + download system.
- Add analytics + optimization after stable release.

--------------------------------------------------

17. SUMMARY STATEMENT
----------------------
SceneYard is a creative platform merging design quality, technical precision, and community spirit. It’s not a random template dump — it’s a refined ecosystem where professionals find the best motion design tools to create faster and better.

The system combines simplicity (for users), safety (for transactions), and scalability (for future creators). Every detail — from database structure to text tone — supports a single mission: **Empower motion designers to create without limits.**

