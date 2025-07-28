import { render } from "@react-email/components";
import nodemailer from "nodemailer";

import ResetPasswordEmail from "@/email-components/reset-password-email";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_API_USER,
        pass: process.env.GMAIL_API_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export async function sendResetPassword(params: {
    email: string;
    url: string;
    name: string;
}) {
    const emailHtml = await render(
        <ResetPasswordEmail
            resetPasswordLink={params.url}
            userFirstname={params.name}
        />
    );

    await transporter.sendMail({
        from: "no-reply <no-reply@nextfig.dev>",
        to: params.email,
        subject: "Password Reset",
        html: emailHtml,
    });
}
