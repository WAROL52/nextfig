import { Resend } from "resend";

import { Email } from "@/email-components/email";

// import {Email} from "@/components/emails/email";

export const resend = new Resend(process.env.RESEND_API_KEY || "");

export function sendResetPassword(params: { email: string; url: string }) {
    return resend.emails.send({
        from: "no-reply@nextfig.dev",
        to: params.email,
        subject: "Password Reset",
        react: <Email url={params.url} />,
    });
}
