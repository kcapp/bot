/**
 * Each bot contains a object of hitrates, for each multiplier like
 *   hitrates: { 1: <single_hitrate>, 2: <doubles_hitrate>, 3: <triples_hitrate>, 0: <miss_chance>  }
 *      single_hitrate : Percentage chance of hitting a single
 *      doubles_hitrate: Percentage chance of hitting a double
 *      triples_hitrate: Percentage chance of hitting a triple
 *      miss_chance:     Percentage chance of hitting a Miss when missing a Double
 * 
 * As well as a miss range, which is how far off the given target the bot will miss. 
 *   For example, if the bot is going for 20, and miss range is 3, it could hit 20, 1, 18, 4, 5, 12 or 9
 */

/** First Timer bot */
exports.FIRSTTIME = { skill: 5, name: 'first time', hitrates: { 1: 0.1, 2: 0.02, 3: 0.005, 0: 0.8 }, miss_range: 10 };
/** Very Easy bot */
exports.VERYEASY = { skill: 6, name: 'very easy', hitrates: { 1: 0.25, 2: 0.035, 3: 0.03, 0: 0.5 }, miss_range: 5 };
/** Easy bot */
exports.EASY = { skill: 1, name: 'easy', hitrates: { 1: 0.40, 2: 0.05, 3: 0.03, 0: 0.5 }, miss_range: 3 };
/** Medium bot */
exports.MEDIUM = { skill: 2, name: 'medium', hitrates: { 1: 0.70, 2: 0.13, 3: 0.10, 0: 0.25 }, miss_range: 2 };
/** Challenging bot */
exports.CHALLENGING = { skill: 8, name: 'challenging', hitrates: { 1: 0.70, 2: 0.18, 3: 0.14, 0: 0.25 }, miss_range: 2 };
/** Hard bot */
exports.HARD = { skill: 3, name: 'hard', hitrates: { 1: 0.85, 2: 0.20, 3: 0.30, 0: 0.10 }, miss_range: 1  };
/** MvG bot, data from https://app.dartsorakel.com/player/stats/3 */
exports.MVG = { skill: 7, name: 'MvG', hitrates: { 1: 0.95, 2: 0.4028, 3: 0.4386, 0: 0.10 }, miss_range: 1  };
/** Perfect bot */
exports.PERFECT = { skill: 4, name: 'perfect', hitrates: { 1: 1.0, 2: 1.0, 3: 1.0, 0: 0.0 }, miss_range: 1 };

/** Bot type 'skill' */
exports.TYPE_SKILL = 1;
/** Bot type 'mock' */
exports.TYPE_MOCK = 2;

/**
 * Convert the given skill level into a bot
 * @param {int} - Skill level
 */
exports.fromInt = (skill) => {
    switch (skill) {
        case module.exports.FIRSTTIME.skill:
            return module.exports.FIRSTTIME;
        case module.exports.VERYEASY.skill:
            return module.exports.VERYEASY;
        case module.exports.EASY.skill:
            return module.exports.EASY;
        case module.exports.MEDIUM.skill:
            return module.exports.MEDIUM
        case module.exports.CHALLENGING.skill:
            return module.exports.CHALLENGING;
        case module.exports.HARD.skill:
            return module.exports.HARD;
        case module.exports.MVG.skill:
            return module.exports.MVG;
        case module.exports.PERFECT.skill:
            return module.exports.PERFECT;
        default:
            return module.exports.EASY;
    }
}
/**
 * Get all configured skills
 */
exports.all = () => {
    return [module.exports.FIRSTTIME, module.exports.VERYEASY, module.exports.EASY, module.exports.MEDIUM,
        module.exports.CHALLENGING, module.exports.HARD, module.exports.MVG, module.exports.PERFECT];
}