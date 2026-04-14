# 5-Minute Manual Checklist

> Open this file and work through each step. Screenshots not needed — just follow the URLs.

---

## 1. Cloudflare DNS — joshuaizzard.com (~1 min)

1. Open https://dash.cloudflare.com
2. Click **joshuaizzard.com** in the site list
3. Click **DNS** in the left sidebar → **Records**
4. Click **Add record** and add:

| Type | Name | Content | Proxy status |
|------|------|---------|--------------|
| `A` | `@` | `76.76.21.21` | **DNS only** (click the orange cloud to make it gray) |
| `CNAME` | `www` | `cname.vercel-dns.com` | **DNS only** (gray cloud) |

5. Save both records

## 2. Cloudflare DNS — joshuaizzard.dev (~1 min)

1. Still in Cloudflare, click the back arrow to return to the site list
2. Click **joshuaizzard.dev**
3. Click **DNS** → **Records** → **Add record**
4. Add the exact same two records:

| Type | Name | Content | Proxy status |
|------|------|---------|--------------|
| `A` | `@` | `76.76.21.21` | **DNS only** (gray cloud) |
| `CNAME` | `www` | `cname.vercel-dns.com` | **DNS only** (gray cloud) |

5. Save both records

**CRITICAL: Both domains must have the proxy toggle set to gray (DNS only), not orange. Vercel's SSL won't work through Cloudflare's proxy.**

## 3. Vercel — Disable Deployment Protection (~30 sec)

1. Open https://vercel.com
2. Click your **joshuaizzard-com** project
3. Click **Settings** (top nav)
4. Click **Deployment Protection** (left sidebar)
5. Find **Vercel Authentication**
6. Set it to **Disabled** (or **Only Preview Deployments**)
7. Click **Save**

After this, https://joshuaizzard-com.vercel.app should return the site publicly (not a 401).

## 4. Vercel — Set joshuaizzard.dev as redirect (~30 sec)

1. Still in Vercel project settings
2. Click **Domains** (left sidebar)
3. You should see both `joshuaizzard.com` and `joshuaizzard.dev` listed
4. If either is missing, click **Add** and type it in
5. Click the **⋮** menu next to `joshuaizzard.dev`
6. Select **Redirect to…** → choose `joshuaizzard.com` → **308 Permanent**
7. Save

This makes .dev always redirect to .com. Both domains work, .com is canonical.

## 5. Resend — API Key for Contact Form (~2 min)

1. Open https://resend.com/signup
2. Create a free account (email + password)
3. After login, you'll see the dashboard
4. Go to **API Keys** (left sidebar) → **Create API Key**
5. Name it `joshuaizzard-com` → **Full access** → Create
6. Copy the key (starts with `re_`)

Now add it to Vercel:
1. Open https://vercel.com → joshuaizzard-com project → **Settings** → **Environment Variables**
2. Add two variables:

| Key | Value | Environments |
|-----|-------|-------------|
| `RESEND_API_KEY` | `re_your_key_here` | Production, Preview, Development |
| `CONTACT_EMAIL` | `jhizzard@gmail.com` | Production, Preview, Development |

3. Click **Save**
4. Redeploy: go to **Deployments** tab → click the **⋮** menu on the latest → **Redeploy**

## 6. Verify Everything Works (~1 min)

Wait 5-10 minutes after the DNS changes, then check:

1. **joshuaizzard.com** — should load your portfolio
2. **joshuaizzard.dev** — should redirect to joshuaizzard.com
3. **joshuaizzard.com/blog** — should show 10 blog posts
4. **joshuaizzard.com/#contact** — scroll to contact form, send a test message, check jhizzard@gmail.com inbox

If joshuaizzard.com shows a Vercel error page, DNS hasn't propagated yet. Wait 15 more minutes and try again. DNS can take up to 48 hours in rare cases, but Cloudflare is usually under 5 minutes.

## 7. Test in Codespaces (optional, 5 min per repo)

For each repo (termdeck, mnemos, rumen):
1. Go to the GitHub repo page
2. Click the green **Code** button
3. Click the **Codespaces** tab
4. Click **Create codespace on main**
5. Wait for it to boot (~2 min)
6. In the terminal that appears:
   - TermDeck: `npm run dev` → click the port-forwarded URL → verify dashboard loads
   - Mnemos: `npm run build` → should compile with zero errors
   - Rumen: `npm run typecheck` → should pass with zero errors

---

**Estimated total time: 5-7 minutes** (excluding Codespaces testing which is optional and takes longer).

After completing steps 1-6, your portfolio is live at joshuaizzard.com with a working contact form, 10 blog posts, and 15 project cards. The three open source repos are testable via Codespaces.
