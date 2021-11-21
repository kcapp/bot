![kcapp logo](https://raw.githubusercontent.com/wiki/kcapp/frontend/images/logo/kcapp_plus_bot.png)
# bot
Simple implementation of a bot for `kcapp`.

## Usage
```js
const skill = require('./bot-skill');

const bot = require('kcapp-bot/kcapp-bot')(<bot player id>, "<server ip>", <server port> /*, <api url> */);
bot.playLeg(<leg id>, skill.EASY);
```

There are two types of bots
### Skill
Skill based will use one of the given skills defined in [bot-skill](https://github.com/kcapp/bot/blob/master/bot-skill.js) and throw based on random.

### Mock / Replay
Mock / Replay based will grab a random leg played by the configured player, and use those throws as it's own for the given leg. This will work best for players with a lot of legs played
