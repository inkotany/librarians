// app/api/send-reset/route.ts
import { Resend } from "resend";
import { render } from "@react-email/render";
import { createElement } from "react";
import ResetPasswordEmail from "@/app/email/sending";

const resend = new Resend(process.env.RESEND_API_KEY);
const apiUrl = process.env.NEXT_PUBLIC_API_URL_APP;
export async function POST(request: Request) {
  try {
    // Parse incoming JSON body
    const { token, email, name } = await request.json();

    if (!token || !email) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing token or email" }),
        { status: 400 }
      );
    }

    // Create reset link using token
    const resetLink = `${apiUrl}/login/retry02?token=${token}`;

    // Render email HTML with resetLink and optional name
    const html = await render(
      createElement(ResetPasswordEmail, { resetLink, name })
    );

    // Send email
    await resend.emails.send({
      from: "Gaggle Niti <noreply@gaggleniti.com>",
      to: email,
      subject: "Reset your Gaggle Niti password",
      html,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500 }
    );
  }
}
