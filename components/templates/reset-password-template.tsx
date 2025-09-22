import * as React from "react";

interface ResetPasswordEmailTemplateProps {
  email: string;
  otp: string;
  expiryMinutes?: number; // how long OTP is valid
  supportEmail?: string;
  resetUrl?: string; // optional link to reset page
}

export function ResetPasswordEmailTemplate({
  email,
  otp,
  expiryMinutes = 10,
  supportEmail = "mythoria18@gmail.com",
}: ResetPasswordEmailTemplateProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          :root{
            --color-mystic-800: #121417;
            --color-mystic-700: #1f1c26;
            --color-mystic-600: #3d4754;
            --color-mystic-500: #9eabb8;
            --color-mystic-400: #293038;
            --color-mystic-300: #403d54;
            --color-mystic-blue-900: #1466b8;
            --color-book-800: #5b4636;
          }
          /* Minimal inline styles for email clients that don't process tailwind */
          .container{background:var(--color-mystic-800);color:var(--color-mystic-500);font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;padding:32px}
          .card{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.03);border-radius:12px;padding:28px;max-width:600px;margin:0 auto}
          .logo{display:block;margin:0 auto 12px auto}
          .brand{color:var(--color-mystic-blue-900);font-weight:700;font-size:22px;margin-top:6px;text-align:center}
          .lead{color:var(--color-mystic-500);text-align:center;margin-top:6px}
          .otp{display:inline-block;background:linear-gradient(90deg, rgba(20,102,184,0.1), rgba(20,102,184,0.06));border:1px solid rgba(20,102,184,0.14);padding:14px 20px;border-radius:8px;font-weight:700;font-size:20px;letter-spacing:2px;color:var(--color-mystic-blue-900);margin:12px 0}
          .btn{display:inline-block;background:var(--color-mystic-blue-900);color:white;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:600}
          .muted{color:var(--color-mystic-500);font-size:13px}
          .footer{color:var(--color-mystic-500);font-size:13px;text-align:center;margin-top:18px}
          @media(max-width:420px){.card{padding:18px}}
        `}</style>
      </head>
      <body className="container">
        <div className="card">
          <img
            className="logo"
            src="https://www.mythoria-stories.com/assets/mythoria.webp"
            alt="Mythoria"
            width={172}
            height={72}
          />

          <div className="brand">Mythoria</div>
          <p className="lead">
            Reset your password and get back to your adventure
          </p>

          <hr
            style={{
              border: "none",
              height: 1,
              background: "rgba(255,255,255,0.03)",
              margin: "18px 0",
            }}
          />

          <p className="muted">
            We received a request to reset the password for{" "}
            <strong style={{ color: "white" }}>{email}</strong>. Use the
            one-time code below to continue. The code expires in {expiryMinutes}{" "}
            minutes.
          </p>

          <div style={{ textAlign: "center" }}>
            <div className="otp">{otp}</div>
          </div>

          <p className="muted" style={{ marginTop: 14 }}>
            If you didn't request this, ignore this message or contact our
            support at{" "}
            <a
              href={`mailto:${supportEmail}`}
              style={{
                color: "var(--color-mystic-blue-900)",
                textDecoration: "underline",
              }}
            >
              {supportEmail}
            </a>
            .
          </p>

          <div className="footer">
            <div style={{ marginTop: 8 }}>Thanks — Mythoria Team</div>
            <div style={{ marginTop: 6, color: "var(--color-mystic-600)" }}>
              © {new Date().getFullYear()} Mythoria Stories
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
