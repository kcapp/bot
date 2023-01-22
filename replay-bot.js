const axios = require('axios');
const debug = require('debug')('kcapp-bot:replay-bot');
const sleep = require('./sleep');

/**
 * Create a new replay-bot which will replay a random leg for the given player
 * @param {int} - PlayerID of the given player
 * @param {string} - Base URL of kcapp API
 * @param {int} - Starting score of the leg
 */
exports.setup = (playerId, legId, apiURL, startingScore) => {
    debug(`[${legId}] Requesting leg to replay for ${playerId}`)
    axios.get(`${apiURL}/player/${playerId}/random/${startingScore}`)
        .then(response => {
            const visits = response.data;
            this.visits = visits;
            debug(`[${legId}] Configured bot for leg ${visits[0].leg_id}`);
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
    debug(`[${this.legId}] Throw ${JSON.stringify(dart)}`);
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

/**
 * @param {int} - Bot ID
 * @param {int} - Leg ID
 * @param {int} - Player ID
 * @param {string} - kcapp API URL
 * @param {int} - Starting score of leg
 */
module.exports = (id, legId, playerId, apiURL, startingScore) => {
    this.id = id;
    this.legId = legId;
    this.setup(playerId, legId, apiURL, startingScore);
    this.visits = [];
    return this;
}
