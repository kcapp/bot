const axios = require('axios');
const debug = require('debug')('kcapp-bot:replay-bot');
const sleep = require('./sleep');

/**
 * Create a new replay-bot which will replay a random leg for the given player
 * @param {int} - Skill level of the bot
 * @param {string} - Base URL of kcapp API
 */
exports.setup = (playerId, apiURL) => {
    debug(`Requesting leg to replay for ${playerId}`)
    axios.get(`${apiURL}/player/${playerId}/random/${301}`)
        .then(response => {
            const visits = response.data;
            this.visits = visits;
            debug(`Configured bot for leg ${visits[0].leg_id}`);
        }).catch(error => {
            debug(`Error when getting match: ${error}`);
        });
}

/**
 * Get the next visit to use for scoring
 */
exports.getVisit = () => {
    return this.visits.shift();
}

/**
 * Get the correct dart to throw
 * @param {object} - Visit
 * @param {int} - Number of darts thrown
 */
exports.attemptThrow = (visit, dartsThrown) => {
    let dart = { score: visit.first_dart.value, multiplier: visit.first_dart.multiplier };
    if (dartsThrown === 1) {
        dart = { score: visit.second_dart.value, multiplier: visit.second_dart.multiplier };
    } else if (dartsThrown == 2) {
        dart = { score: visit.third_dart.value, multiplier: visit.third_dart.multiplier };
    }
    debug(`Throw ${JSON.stringify(dart)}`);
    return dart;
}

/**
 * Score a visit
 * @param {object} - Socket for scoring
 */
exports.score = async (socket) => {
    const visit = this.getVisit();
    socket.emitThrow(this.attemptThrow(visit, 0));
    await sleep(100);
    socket.emitThrow(this.attemptThrow(visit, 1));
    await sleep(100);
    socket.emitThrow(this.attemptThrow(visit, 2));
    await sleep(100);
}

module.exports = (id, playerId, apiURL) => {
    this.id = id;
    this.setup(playerId, apiURL);
    this.visits = [];
    return this;
}
