'use server'

export async function sendContactEmail(formData: FormData) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        console.error('CRITICAL: RESEND_API_KEY is missing.');
        return { error: "Configuration Error: RESEND_API_KEY is missing. Please add it to your Cloudflare Pages dashboard." };
    }

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const projectType = formData.get('project-type') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !phone || !address || !message) {
        return { error: "Please fill in all required fields." };
    }

    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: 'Just Peac Website <website@justpeachome.ca>',
                to: ['info@justpeachome.ca'],
                reply_to: email,
                subject: `New Project Inquiry from ${name}: ${projectType}`,
                text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nProject Type: ${projectType}\n\nMessage:\n${message}`,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: `Email service error: ${errorData.message || 'Failed to send'}` };
        }

        return { success: true };
    } catch (error: unknown) {
        console.error('Contact Action Exception:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return { error: `Server error: ${errorMessage}` };
    }
}
