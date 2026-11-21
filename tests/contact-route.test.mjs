// Pins the contact form's two outcomes with Resend mocked (no network, no mail is sent):
//   a failed Resend send -> the route answers non-OK, so the form shows its failure line;
//   a good Resend send   -> the route answers 200 { success: true }, so the form shows its sent line.
// The Resend SDK reports API failures as { error } instead of throwing; the route must not answer success then.
// Run: node --test --experimental-test-module-mocks --experimental-strip-types tests/contact-route.test.mjs
import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { register } from "node:module";

// Next's bundler resolves "next/server" without an extension; plain Node ESM needs "next/server.js".
register(
  "data:text/javascript," +
    encodeURIComponent(
      'export async function resolve(s, c, n) { return n(s === "next/server" ? "next/server.js" : s, c); }',
    ),
  import.meta.url,
);

let nextResult = { data: null, error: null };
const sent = [];

class FakeResend {
  constructor(key) {
    this.key = key;
    this.emails = {
      send: async (payload) => {
        sent.push(payload);
        return nextResult;
      },
    };
  }
}

mock.module("resend", { namedExports: { Resend: FakeResend } });

process.env.RESEND_API_KEY = "test-placeholder-not-a-key";
process.env.CONTACT_EMAIL = "inbox@example.invalid";

const { POST } = await import(
  new URL("../src/app/api/contact/route.ts", import.meta.url).href
);

const form = (ip) =>
  new Request("https://joshuaizzard.com/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({
      name: "Test Visitor",
      email: "visitor@example.invalid",
      message: "Hello",
      website: "",
    }),
  });

test("a failed Resend send answers a failure, never success", async () => {
  nextResult = {
    data: null,
    error: { name: "validation_error", statusCode: 403, message: "refused" },
  };
  const before = sent.length;
  const res = await POST(form("203.0.113.1"));
  assert.equal(sent.length, before + 1, "the route called Resend once");
  assert.equal(res.ok, false);
  assert.equal(res.status, 500);
  assert.deepEqual(await res.json(), { error: "Failed to send" });
});

test("a good Resend send answers success", async () => {
  nextResult = { data: { id: "email_test_1" }, error: null };
  const before = sent.length;
  const res = await POST(form("203.0.113.2"));
  assert.equal(sent.length, before + 1, "the route called Resend once");
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { success: true });
});

test("the form shows the failure line on a non-OK answer and the sent line on OK", () => {
  const src = readFileSync(
    new URL("../src/components/ContactForm.tsx", import.meta.url),
    "utf8",
  );
  assert.match(src, /if \(!res\.ok\) \{\s*setStatus\("error"\);/);
  assert.match(src, /status === "error" && \([\s\S]*?Your message was not sent\./);
  assert.match(src, /status === "sent" \?[\s\S]*?Message sent\./);
});
