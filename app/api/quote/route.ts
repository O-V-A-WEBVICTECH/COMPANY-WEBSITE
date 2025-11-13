import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      type,
      platforms,
      features,
      domain,
      hosting,
      budget,
      email,
      phone,
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
    const subject = `New Web Quote Submission - OVA WEBVIC TECH`;
    const html = `
      <h3>New Web Quote Submission</h3>
      <ul>
        <li><strong>Project Name:</strong> ${title || ""}</li>
        <li><strong>Type:</strong> ${type || ""}</li>
        <li><strong>Platforms:</strong> ${
          Array.isArray(platforms) ? platforms.join(", ") : ""
        }</li>
        <li><strong>Features:</strong> ${
          Array.isArray(features) ? features.join(", ") : ""
        }</li>
        <li><strong>Domain:</strong> ${domain ? "Yes" : "No"}</li>
        <li><strong>Hosting:</strong> ${hosting ? "Yes" : "No"}</li>
        <li><strong>Budget:</strong> ${budget || ""}</li>
        <li><strong>Phone:</strong> ${phone || ""}</li>
        <li><strong>Email:</strong> ${email || ""}</li>
        <li><strong>Note:</strong> ${note || ""}</li>
      </ul>
      <pre>${JSON.stringify(body, null, 2)}</pre>
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
