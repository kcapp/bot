/** Easy bot */
exports.EASY = { skill: 1, name: 'easy', hitrates: { 1: 0.40, 2: 0.05, 3: 0.03 }, miss_range: 3 };
/** Medium bot */
exports.MEDIUM = { skill: 2, name: 'medium', hitrates: { 1: 0.70, 2: 0.13, 3: 0.10 }, miss_range: 2 };
/** Hard bot */
exports.HARD = { skill: 3, name: 'hard', hitrates: { 1: 0.85, 2: 0.20, 3: 0.30 }, miss_range: 1  };
/** Perfect bot */
exports.PERFECT = { skill: 4, name: 'perfect', hitrates: { 1: 1.0, 2: 1.0, 3: 1.0 }, miss_range: 1 };

/** Bot type 'skill' */
exports.TYPE_SKILL = 1;
/** Bot type 'mock' */
exports.TYPE_MOCK = 2;

/**
 * Convert the given skill level into a bot
 * @param {int} - Skill leve
 */
exports.fromInt = (skill) => {
    switch (skill) {
        case this.EASY.skill:
            return this.EASY;
        case this.MEDIUM.skill:
            return this.MEDIUM
        case this.HARD.skill:
            return this.HARD;
        case this.PERFECT.skill:
            return this.PERFECT;
        default:
            return this.EASY;
    }
}

/**
 * Get all configured skills
 */
exports.all = () => {
    return [module.exports.EASY, module.exports.MEDIUM, module.exports.HARD, module.exports.PERFECT];
}