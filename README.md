Sends messages via webhook to Discord channels on specified days.

### Usage

ping-them requires a `config.json` file to run.

- `webhooks` (object): Webhooks to run on. Each property is a URL of a webhook, and their values are objects:
  - `begin` (number): UNIX timestamp at which to start this schedule
  - `every` (number): How often this schedule repeats, in days
  - `name`* (string): Username of the webhook. This can be overridden for each message.
  - `pings` (object): Messages to send. Each property is the 0-indexed number of the day in the repeating schedule. Those properties' values are objects:
    - `name`* (string): Username of the webhook
    - `message` (string): Message to send
    - `users` (array): Users to tag in the message
- `users` (object): Map of user names to user IDs. This is so that in `webhooks.<webhook>.pings.users` you can refer to users by name instead of ID.

`node ping-them.js` should be run on a daily schedule.
