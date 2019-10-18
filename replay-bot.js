var axios = require('axios');
var debug = require('debug')('kcapp-bot:replay-bot');
var sleep = require('./sleep');

/**
 * Create a new replay-bot which will replay a random leg for the given player
 * @param {int} - Skill level of the bot
 * @param {string} - Base URL of kcapp API
 */
exports.setup = (playerId, apiURL) => {
    debug(`Requesting leg to replay for ${playerId}`)
    axios.get(apiURL + '/player/' + playerId + '/random/' + 301)
        .then(response => {
            var visits = response.data;
            this.visits = visits;
            debug(`Configured bot for leg ${visits[0].leg_id}`);
        }).catch(error => {
            debug('Error when getting match: ' + error);
        });
}

/**
 * Get the next visit to use for scoring
 */
exports.getVisit = () => {
    return this.visits.shift();
}

/**
 * Score a visit
 * @param {object} - Socket for scoring
 */
exports.score = async (socket) => {
    var visit = this.getVisit();
    socket.emitThrow({ score: visit.first_dart.value, multiplier: visit.first_dart.multiplier });
    await sleep(100);
    socket.emitThrow({ score: visit.second_dart.value, multiplier: visit.second_dart.multiplier });
    await sleep(100);
    socket.emitThrow({ score: visit.third_dart.value, multiplier: visit.third_dart.multiplier });
    await sleep(100);
}

module.exports = (id, playerId, apiURL) => {
    this.id = id;
    this.setup(playerId, apiURL);
    this.visits = [];
    return this;
}
