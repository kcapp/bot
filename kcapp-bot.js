const debug = require('debug')('kcapp-bot:main');
const decache = require('decache');
const sleep = require('./sleep');

class KcappBot {
    constructor(botId, sioURL, sioPort = 3000, apiURL = 'http://localhost:8001', protocol = 'http') {
        this.botId = botId;
        this.sioURL = sioURL;
        this.sioPort = sioPort;
        this.apiURL = apiURL;
        this.protocol = protocol;
        this.firstThrow = true;
    }

    async doScore(socket, bot) {
        const player = socket.currentPlayer;
        if (player.player_id === bot.id) {
            if (this.firstThrow) {
                debug(`Waiting because of first throw`);
                await sleep(5000); // wait for page to load
            }
            await sleep(500);
            await bot.score(socket);
            await sleep(1000);
            socket.emitVisit();
        }
        this.firstThrow = false;
    }

    async handleScoreUpdate(socket, data, bot) {
        const leg = data.leg;
        if (leg.is_finished) {
            return;
        } else if (leg.current_player_id !== bot.id) {
            debug(`[${leg.id}] Not our turn, waiting...`);
        } else if (data.is_undo) {
            debug(`[${leg.id}] Recevied undo visit, forwarding`);
            bot.undoVisit();
            socket.emit('undo_visit', {});
        } else {
            this.doScore(socket, bot);
        }
    }

    playLeg(legId, botSkill) {
        const SkillBot = require('./bot');
        const bot = new SkillBot(this.botId, botSkill);

        const kcapp = require('kcapp-sio-client/kcapp')(this.sioURL, this.sioPort, 'kcapp-bot', this.protocol);
         // Make sure we get a separate instance for each leg we connect to...
        decache('kcapp-sio-client/kcapp');
        kcapp.connectLegNamespace(legId, (socket) => {
            debug(`[${legId}] kcapp-bot connected to leg`);
            this.firstThrow = true;

            socket.on('score_update', (data) => {
                this.handleScoreUpdate(socket, data, bot);
            });
            socket.on('leg_finished', (data) => {
                debug(`[${legId}] Leg is finished`);
                socket.disconnect();
            });
            this.doScore(socket, bot);
        });
    }

    replayLeg(legId, playerId, startingScore = 301) {
        const ReplayBot = require('./replay-bot')
        const bot = new ReplayBot(this.botId, legId, playerId, this.apiURL, startingScore);

        const kcapp = require('kcapp-sio-client/kcapp')(this.sioURL, this.sioPort, 'kcapp-bot', this.protocol);
         // Make sure we get a separate instance for each leg we connect to...
        decache('kcapp-sio-client/kcapp');
        kcapp.connectLegNamespace(legId, (socket) => {
            debug(`[${legId}] replay-bot connected to leg`);
            this.firstThrow = true;

            socket.on('score_update', (data) => {
                this.handleScoreUpdate(socket, data, bot);
            });
            socket.on('leg_finished', (data) => {
                debug(`[${legId}] Leg is finished`);
                socket.disconnect();
            });
            this.doScore(socket, bot);
        });
    }
}

module.exports = KcappBot;
