import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const RECIPIENT_EMAIL = "hemanathkalai29@gmail.com";
const SENDER_EMAIL = "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    // 1. Check if Resend is configured
    if (!resend || !process.env.RESEND_API_KEY) {
      console.error("Resend API Key is missing or Resend client is not initialized.");
      return NextResponse.json(
        { success: false, error: "Contact service is not fully configured on the server." },
        { status: 500 }
      );
    }

    // 2. Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request format." },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // 3. Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "Name is required." }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }
    if (!subject || !subject.trim()) {
      return NextResponse.json({ success: false, error: "Subject is required." }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ success: false, error: "Message is required." }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 4. Compose email template matching the portfolio design style (Warm Soft Minimal Clay tones)
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Portfolio Message</title>
          <style>
            body {
              font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #B5ACA4;
              margin: 0;
              padding: 40px 20px;
              color: #000000;
            }
            .container {
              max-width: 600px;
              background-color: #C4BCB5;
              border: 1px solid rgba(255, 255, 255, 0.4);
              border-radius: 24px;
              padding: 40px;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6);
              margin: 0 auto;
            }
            .header {
              border-bottom: 1px solid rgba(0, 0, 0, 0.08);
              padding-bottom: 20px;
              margin-bottom: 24px;
            }
            .header h1 {
              font-size: 24px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: -0.02em;
              margin: 0;
            }
            .header p {
              font-size: 11px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #554E48;
              margin: 4px 0 0 0;
            }
            .meta-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 12px;
              margin-bottom: 24px;
            }
            @media (min-width: 480px) {
              .meta-grid {
                grid-template-columns: 1fr 1fr;
              }
            }
            .meta-item {
              background-color: rgba(244, 241, 238, 0.6);
              border: 1px solid rgba(255, 255, 255, 0.4);
              padding: 12px;
              border-radius: 12px;
            }
            .meta-label {
              font-size: 9px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: #554E48;
              display: block;
              margin-bottom: 4px;
            }
            .meta-value {
              font-size: 13px;
              font-weight: 600;
              word-break: break-all;
            }
            .message-box {
              background-color: rgba(244, 241, 238, 0.75);
              border: 1px solid rgba(255, 255, 255, 0.5);
              padding: 24px;
              border-radius: 16px;
              margin-bottom: 24px;
              box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.02);
            }
            .message-label {
              font-size: 10px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #554E48;
              margin-bottom: 12px;
              display: block;
              border-bottom: 1px solid rgba(0, 0, 0, 0.05);
              padding-bottom: 4px;
            }
            .message-body {
              font-size: 14px;
              line-height: 1.6;
              white-space: pre-wrap;
              margin: 0;
            }
            .footer {
              text-align: center;
              font-size: 10px;
              color: #554E48;
              font-weight: 500;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Portfolio Contact Spec</h1>
              <p>Transmission Incoming • Real-Time Alert</p>
            </div>
            
            <div class="meta-grid">
              <div class="meta-item">
                <span class="meta-label">Full Name</span>
                <span class="meta-value">${name.trim()}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Email Address</span>
                <span class="meta-value">${email.trim()}</span>
              </div>
              <div class="meta-item" style="grid-column: span 2;">
                <span class="meta-label">Subject</span>
                <span class="meta-value">${subject.trim()}</span>
              </div>
            </div>

            <div class="message-box">
              <span class="message-label">Project Message / Transmission Payload</span>
              <p class="message-body">${message.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
            </div>

            <div class="meta-item" style="text-align: center;">
              <span class="meta-label">Transmission Timestamp</span>
              <span class="meta-value" style="font-size: 11px;">${timestamp}</span>
            </div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} HEMANATH AFK Portfolio Engine. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 5. Send email via Resend SDK
    const emailResult = await resend.emails.send({
      from: `Portfolio Contact <${SENDER_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      subject: `[Portfolio Contact] ${subject.trim()}`,
      html: emailHtml,
      replyTo: email.trim(),
    });

    if (emailResult.error) {
      console.error("Resend API returned error details:", emailResult.error);
      return NextResponse.json(
        { success: false, error: "Email provider failed to send message." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Transmission successful. Your message has been received." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unhandled error in contact API route:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
