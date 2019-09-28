Sends messages via webhook to Discord channels on specified days.

### Usage

ping-them requires a `config.json` file to run. The properties here are URLs of Discord webhooks. Each one's value is an object with these properties:

- `begin` (number): The UNIX timestamp at which to start this schedule.
- `every` (number): How often this schedule repeats, in days.
- `name`* (string): The username of the webhook. This can be overridden for each message.
- `pings` (object): The messages to send. This is an object where each property is the 0-indexed number of the day in the repeating schedule. Those properties' values are objects with these properties:
  - `name`* (string): The username of the webhook.
  - `message` (string): The message to send.
  - `users` (array): Users to tag in the message.

There is also a `users` map where keys are names and values are user IDs. This is so that in `<webhook>.pings.users` you can refer to users by name instead of ID.

`node ping-them.js` should be run on a daily schedule.
