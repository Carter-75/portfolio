import nodemailer from 'nodemailer';

interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail(data: EmailPayload) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        secure: process.env.EMAIL_SERVER_SECURE === 'true', // true for 465, false for other ports
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Portfolio Bot" <noreply@example.com>',
            to: data.to,
            subject: data.subject,
            html: data.html,
        });
        console.log('Email sent successfully to:', data.to);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
