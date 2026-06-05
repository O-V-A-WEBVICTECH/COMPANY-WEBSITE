
import { config } from "dotenv";
config();
import { prisma } from "../lib/prisma";

// ── config ────────────────────────────────────────────────────────────────────
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || "admin@webvictech.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@1234!";
const ADMIN_NAME     = process.env.ADMIN_NAME     || "WebvicTech Admin";
const ADMIN_ROLE     = process.env.ADMIN_ROLE     || "super_admin"; // "admin" | "super_admin"
const BASE_URL       = process.env.BETTER_AUTH_URL || "http://localhost:3000";
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱  Seeding admin user...\n");

  // 1. Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
  if (existing) {
    // Already exists — just ensure the role is correct
    if (existing.role !== ADMIN_ROLE) {
      await prisma.user.update({
        where: { email: ADMIN_EMAIL },
        data: { role: ADMIN_ROLE },
      });
      console.log(`✅  User already exists. Role updated to "${ADMIN_ROLE}".`);
    } else {
      console.log(`ℹ️   Admin user already exists with role "${existing.role}". Nothing to do.`);
    }
    return;
  }

  // 2. Register via better-auth sign-up endpoint so password is hashed correctly
  const res = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": BASE_URL,
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sign-up failed (${res.status}): ${body}`);
  }

  // 3. Promote to admin role directly in DB
  const updated = await prisma.user.update({
    where: { email: ADMIN_EMAIL },
    data: {
      role: ADMIN_ROLE,
      emailVerified: true,
    },
  });

  console.log(`✅  Admin created successfully!`);
  console.log(`   ID    : ${updated.id}`);
  console.log(`   Name  : ${updated.name}`);
  console.log(`   Email : ${updated.email}`);
  console.log(`   Role  : ${updated.role}`);
  console.log(`\n🔐  Login at: ${BASE_URL}/admin`);
  console.log(`   Email   : ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log(`\n⚠️   Change the password after first login!\n`);
}

main()
  .catch((e) => {
    console.error("❌  Seed failed:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
