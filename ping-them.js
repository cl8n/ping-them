#!/usr/bin/env node

const config = require('./config.json');
const https = require('https');

/**
 * Gets the difference in days between two dates, rounded down.
 * @param {Date} begin Beginning date.
 * @param {Date} end Ending date.
 */
function getDayDifference(begin, end) {
    const beginUtc = Date.UTC(begin.getFullYear(), begin.getMonth(), begin.getDate());
    const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

    return Math.floor((endUtc - beginUtc) / getDayDifference.msPerDay);
}
getDayDifference.msPerDay = 1000 * 60 * 60 * 24;

/**
 * Formats Discord usernames into a message prefix.
 * @param {Array<string>} users Discord usernames to format.
 * @returns {string} Formatted message prefix.
 */
function formatPrefix(users) {
    if (!Array.isArray(users) || users.length === 0)
        return '';

    return users
        .reduce((message, current) => message + `<@${config.users[current]}>, `, '')
        .slice(0, -2)
        + ': ';
}

/**
 * Sends a message to a Discord webhook.
 * @param {string} url Endpoint of the webhook.
 * @param {string} message Message contents.
 * @param {string | undefined} name Name of the webhook.
 */
function sendMessage(url, message, name) {
    const data = { content: message };
    if (name !== undefined)
        data.username = name;

    const request = https.request(url, { method: 'POST' });
    request.on('error', err => { throw err; });
    request.write(JSON.stringify(data));
    request.end();
}

/**
 * Gets the first truthy argument.
 * @param {...any} args
 */
function falsyCoalesce(...args) {
    for (let arg of args)
        if (arg)
            return arg;
}

const now = new Date();

for (let [webhook, options] of Object.entries(config)) {
    const scheduleBegin = new Date(parseInt(options.begin) * 1000);
    const dayDifference = getDayDifference(now, scheduleBegin);
    const ping = options.pings[dayDifference % parseInt(options.every)];

    sendMessage(
        webhook,
        formatPrefix(ping.users) + ping.message,
        falsyCoalesce(ping.name, options.name)
    );
}
