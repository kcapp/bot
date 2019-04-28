var debug = require('debug')('kcapp-bot:main');
var decache = require('decache');

function doScore(socket, bot) {
    var player = socket.currentPlayer;
    if (player.player_id === bot.id) {
        setTimeout(() => {
            var thrown = 0;
            while (thrown < 3&& player.current_score > 0) {
                if (player.current_score > 170 || [169, 168, 166, 165, 163, 162, 159].includes(player.current_score)) {
                    var dart = bot.attemptThrow(20, 3);
                    socket.emitThrow(dart);
                    thrown++;
                } else {
                    var darts = bot.attemptCheckout(player.current_score, thrown);
                    for (var i = 0; i < darts.length; i++) {
                        var dart = darts[i];
                        player.current_score -= dart.score * dart.multiplier;
                        socket.emitThrow(dart);
                        if (player.current_score <= 1) {
                            break;
                        }
                    }
                    thrown += darts.length;
                }
            }
            setTimeout(() => { socket.emitVisit(); }, 1500);
        }, 700);
    }
}

module.exports = (botId, sioURL, sioPort) => {
    var bot = bot = require('./bot')(botId);
    bot.new(bot.MEDIUM);

    return {
        playLeg: (legId) => {
            var kcapp = require('kcapp-sio-client/kcapp')(sioURL, sioPort, 'kcapp-bot');
             // Make sure we get a separate instance for each leg we connect to...
            decache('kcapp-sio-client/kcapp');
            kcapp.connectLegNamespace(legId, (socket) => {
                debug(`kcapp-bot connected to leg ${legId}`);

                socket.on('score_update', (data) => {
                    var leg = data.leg;
                    if (leg.is_finished) {
                        debug("Leg is finished");
                        return;
                    }
                    doScore(socket, bot);
                });
                doScore(socket, bot);
            });
        }
     };
};