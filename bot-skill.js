exports.EASY = { skill: 1, name: 'easy' };
exports.MEDIUM = { skill: 2, name: 'medium' };
exports.HARD = { skill: 3, name: 'hard' };
exports.PERFECT = { skill: 4, name: 'perfect' };

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