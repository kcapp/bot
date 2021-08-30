var debug = require('debug')('kcapp-bot:main');
var decache = require('decache');
var sleep = require('./sleep');

async function doScore(socket, bot) {
    var player = socket.currentPlayer;
    if (player.player_id === bot.id) {
        await sleep(500);
        await bot.score(socket);
        await sleep(1000);
        socket.emitVisit();
    }
}

module.exports = (botId, sioURL, sioPort, apiURL = 'http://localhost:8001') => {
    return {
        playLeg: (legId, botSkill) => {
            var bot = require('./bot')(botId, botSkill);

            var kcapp = require('kcapp-sio-client/kcapp')(sioURL, sioPort, 'kcapp-bot', 'http');
             // Make sure we get a separate instance for each leg we connect to...
            decache('kcapp-sio-client/kcapp');
            kcapp.connectLegNamespace(legId, (socket) => {
                debug(`kcapp-bot connected to leg ${legId}`);

                socket.on('score_update', (data) => {
                    var leg = data.leg;
                    if (leg.is_finished) {
                        return;
                    } else if (leg.current_player_id !== botId) {
                        debug("Not our turn, waiting...");
                    } else {
                        doScore(socket, bot);
                    }
                });
                socket.on('leg_finished', (data) => {
                    debug('Leg is finished');
                    socket.disconnect();
                });
                doScore(socket, bot);
            });
        },
        replayLeg: (legId, playerId) => {
            var bot = require('./replay-bot')(botId, playerId, apiURL);

            var kcapp = require('kcapp-sio-client/kcapp')(sioURL, sioPort, 'kcapp-bot', 'http');
             // Make sure we get a separate instance for each leg we connect to...
            decache('kcapp-sio-client/kcapp');

            kcapp.connectLegNamespace(legId, (socket) => {
                debug(`replay-bot connected to leg ${legId}`);

                socket.on('score_update', (data) => {
                    var leg = data.leg;
                    if (leg.is_finished) {
                        return;
                    } else if (leg.current_player_id !== botId) {
                        debug("Not our turn, waiting...");
                    } else {
                        doScore(socket, bot);
                    }
                });
                socket.on('leg_finished', (data) => {
                    debug('Leg is finished');
                    socket.disconnect();
                });
                doScore(socket, bot);
            });
        }
     };
};

