import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      serviceCategory,
      type,
      platforms,
      features,
      domain,
      hosting,
      deployment,
      ciCd,
      budget,
      email,
      phone,
      range,
      currency,
      note,
    } = body;

    if (!email || !budget || !phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      console.warn(
        "⚠️ SMTP not configured; set SMTP_HOST, SMTP_USER, SMTP_PASS in env"
      );
      return NextResponse.json({
        success: true,
        message: "Received (SMTP not configured)",
        estimate_id: "local",
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const receiver = process.env.RECEIVER_EMAIL || "o.v.a.webvictech@gmail.com";
    const subject = `New Quote Submission – ${serviceCategory === "backend" ? "Backend / API" : "Website / App"} | OVA WEBVIC TECH`;
    const isBackend = serviceCategory === "backend";
    const html = `
      <h3>New Project Quote Submission</h3>
      <ul>
        <li><strong>Service Category:</strong> ${isBackend ? "Backend / API Development" : "Website / App Development"}</li>
        <li><strong>Project Name:</strong> ${title || "—"}</li>
        <li><strong>Type:</strong> ${type || "—"}</li>
        ${
          !isBackend
            ? `<li><strong>Platforms:</strong> ${Array.isArray(platforms) ? platforms.join(", ") || "None" : "—"}</li>`
            : ""
        }
        <li><strong>Features:</strong> ${Array.isArray(features) ? features.join(", ") || "None" : "—"}</li>
        ${
          isBackend
            ? `<li><strong>Deployment &amp; DevOps:</strong> ${deployment ? "Yes" : "No"}</li>
               <li><strong>CI/CD Pipeline:</strong> ${ciCd ? "Yes" : "No"}</li>`
            : `<li><strong>Domain Registration:</strong> ${domain ? "Yes" : "No"}</li>
               <li><strong>Web Hosting:</strong> ${hosting ? "Yes" : "No"}</li>`
        }
        <li><strong>Estimated Range:</strong> ${range || "—"} (${currency || "NGN"})</li>
        <li><strong>Budget:</strong> ${budget || "—"}</li>
        <li><strong>Phone:</strong> ${phone || "—"}</li>
        <li><strong>Email:</strong> ${email || "—"}</li>
        ${note ? `<li><strong>Note:</strong> ${note}</li>` : ""}
      </ul>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || user,
      to: receiver,
      subject,
      html,
    });

    console.log("✅ Email sent successfully to", receiver);
    return NextResponse.json({
      success: true,
      message: "Email sent",
      estimate_id: "prod",
    });
  } catch (err) {
    console.error("❌ send quote error", err);
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}
