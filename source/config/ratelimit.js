const RL_TIME = process.env.FSJS_RATELIMIT_TIMEWINDOW;
const RL_MAXR = process.env.FSJS_RATELIMIT_MAX_REQUESTS;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes in ms
const MAX_REQUESTS = 30; // 30 requests/5 min

module.exports = { RL_TIME, RL_MAXR, WINDOW_MS, MAX_REQUESTS };
