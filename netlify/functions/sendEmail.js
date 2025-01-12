const nodemailer = require('nodemailer');
// require('dotenv').config();

exports.handler = async (event) => {
    console.log('Received event body:', event.body);  // Add this for logging

    // Check if the event body exists before parsing
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Request body is missing' }),
        };
    }

    let parsedBody;
    try {
        parsedBody = JSON.parse(event.body);  // Try to parse JSON
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid JSON body', error: error.message }),
        };
    }

    const { name, email, subject, message } = parsedBody;

    // Validate fields
    if (!name || !email || !subject || !message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing required fields' }),
        };
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'udaychopade27@gmail.com',
            pass: 'mzrsasraasmoueeq',
        },
    });

    try {
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: 'udaychopade27@gmail.com',
            subject: subject,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br />${message}</p>
            `,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Email sending failed', error: error.message }),
        };
    }
};
