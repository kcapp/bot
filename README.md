![kcapp logo](https://raw.githubusercontent.com/kcapp/frontend/master/public/images/logo.png)
# bot
Simple implementation of a bot for `kcapp`.

## Usage
```javascript
var skill = require('./bot-skill');

var bot = require('kcapp-bot/kcapp-bot')(<bot player id>, "<server ip>", <server port>);
bot.playLeg(<leg id>, skill.EASY);
```
