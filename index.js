const venom = require('venom-bot');
const fetch = require('node-fetch');

// ---------------- CONFIG ----------------
const numbers = [
  '+94XXXXXXXXX', // ඔබේ number
  '+94YYYYYYYYY', // friend 1 (must agree)
  '+94ZZZZZZZZZ'  // friend 2 (must agree)
];

const LINK_TO_SEND = 'https://example.com'; // share කරන්න යන link එක
// ---------------------------------------

venom.create('sessionName')
    .then(client => startBot(client))
    .catch(err => console.log(err));

async function startBot(client) {
    console.log('Bot started! Sending links...');

    // Shorten link
    const shortLink = await shortenLink(LINK_TO_SEND);

    // Send to all numbers
    numbers.forEach(number => {
        client.sendText(number, `Here is your link: ${shortLink}`);
        console.log(`Link sent to ${number}`);
    });
}

async function shortenLink(url) {
    try {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
        const data = await res.json();
        return data.result.full_short_link;
    } catch (err) {
        console.log('Link shortening failed, sending original link.');
        return url;
    }
}
