var debug = require('debug')('kcapp-bot:bot');

exports.EASY = 1;
exports.MEDIUM = 2;
exports.HARD = 3;
exports.PERFECT = 4;

const SINGLE = 1;
const DOUBLE = 2;
const TRIPLE = 3;

const BULLSEYE = 25;

/** Array holding all values of the dart board in a circular order */
const BOARD = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

/** Array holding multiplier values of the dart board in a circular order */
const BOARD_MULTIPLIERS = [SINGLE, TRIPLE, SINGLE, DOUBLE];

/** Preferred checkouts for different numbers */
const CHECKOUT_GUIDE = {
    170: [{ score: 20, multiplier: TRIPLE }, { score: 20, multiplier: TRIPLE }, { score: BULLSEYE, multiplier: DOUBLE }],
    167: [{ score: 20, multiplier: TRIPLE }, { score: 19, multiplier: TRIPLE }, { score: BULLSEYE, multiplier: DOUBLE }],
    164: [{ score: 19, multiplier: TRIPLE }, { score: 19, multiplier: TRIPLE }, { score: BULLSEYE, multiplier: DOUBLE }],
    161: [{ score: 20, multiplier: TRIPLE }, { score: 17, multiplier: TRIPLE }, { score: BULLSEYE, multiplier: DOUBLE }],
    160: [{ score: 20, multiplier: TRIPLE }, { score: 20, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    158: [{ score: 20, multiplier: TRIPLE }, { score: 20, multiplier: TRIPLE }, { score: 19, multiplier: DOUBLE }],
    157: [{ score: 19, multiplier: TRIPLE }, { score: 20, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    156: [{ score: 20, multiplier: TRIPLE }, { score: 20, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    155: [{ score: 20, multiplier: TRIPLE }, { score: 19, multiplier: TRIPLE }, { score: 19, multiplier: DOUBLE }],
    154: [{ score: 20, multiplier: TRIPLE }, { score: 18, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    153: [{ score: 20, multiplier: TRIPLE }, { score: 19, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    152: [{ score: 20, multiplier: TRIPLE }, { score: 20, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    151: [{ score: 20, multiplier: TRIPLE }, { score: 17, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    150: [{ score: 20, multiplier: TRIPLE }, { score: 18, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    149: [{ score: 20, multiplier: TRIPLE }, { score: 19, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    148: [{ score: 20, multiplier: TRIPLE }, { score: 20, multiplier: TRIPLE }, { score: 14, multiplier: DOUBLE }],
    147: [{ score: 20, multiplier: TRIPLE }, { score: 17, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    146: [{ score: 20, multiplier: TRIPLE }, { score: 18, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    145: [{ score: 20, multiplier: TRIPLE }, { score: 15, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    144: [{ score: 20, multiplier: TRIPLE }, { score: 20, multiplier: TRIPLE }, { score: 12, multiplier: DOUBLE }],
    143: [{ score: 20, multiplier: TRIPLE }, { score: 17, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    142: [{ score: 20, multiplier: TRIPLE }, { score: 14, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    141: [{ score: 20, multiplier: TRIPLE }, { score: 15, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    140: [{ score: 20, multiplier: TRIPLE }, { score: 16, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    139: [{ score: 20, multiplier: TRIPLE }, { score: 13, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    138: [{ score: 20, multiplier: TRIPLE }, { score: 16, multiplier: TRIPLE }, { score: 15, multiplier: DOUBLE }],
    137: [{ score: 18, multiplier: TRIPLE }, { score: 17, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    136: [{ score: 20, multiplier: TRIPLE }, { score: 20, multiplier: TRIPLE }, { score: 8, multiplier: DOUBLE }],
    135: [{ score: 20, multiplier: TRIPLE }, { score: 13, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    134: [{ score: 20, multiplier: TRIPLE }, { score: 14, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    133: [{ score: 20, multiplier: TRIPLE }, { score: 19, multiplier: TRIPLE }, { score: 8, multiplier: DOUBLE }],
    132: [{ score: 20, multiplier: TRIPLE }, { score: 16, multiplier: TRIPLE }, { score: 12, multiplier: DOUBLE }],
    131: [{ score: 20, multiplier: TRIPLE }, { score: 13, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    130: [{ score: 20, multiplier: TRIPLE }, { score: 18, multiplier: TRIPLE }, { score: 8, multiplier: DOUBLE }],
    129: [{ score: 19, multiplier: TRIPLE }, { score: 16, multiplier: TRIPLE }, { score: 12, multiplier: DOUBLE }],
    128: [{ score: 20, multiplier: TRIPLE }, { score: 20, multiplier: TRIPLE }, { score: 4, multiplier: DOUBLE }],
    127: [{ score: 20, multiplier: TRIPLE }, { score: 17, multiplier: TRIPLE }, { score: 8, multiplier: DOUBLE }],
    126: [{ score: 19, multiplier: TRIPLE }, { score: 19, multiplier: SINGLE }, { score: BULLSEYE, multiplier: DOUBLE }],
    125: [{ score: 20, multiplier: TRIPLE }, { score: 19, multiplier: TRIPLE }, { score: 4, multiplier: DOUBLE }],
    124: [{ score: 20, multiplier: TRIPLE }, { score: 16, multiplier: TRIPLE }, { score: 8, multiplier: DOUBLE }],
    123: [{ score: 20, multiplier: TRIPLE }, { score: 13, multiplier: TRIPLE }, { score: 12, multiplier: DOUBLE }],
    122: [{ score: 18, multiplier: TRIPLE }, { score: 18, multiplier: SINGLE }, { score: BULLSEYE, multiplier: DOUBLE }],
    121: [{ score: 19, multiplier: TRIPLE }, { score: 14, multiplier: SINGLE }, { score: BULLSEYE, multiplier: DOUBLE }],
    120: [{ score: 20, multiplier: TRIPLE }, { score: 20, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    119: [{ score: 20, multiplier: TRIPLE }, { score: 19, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    118: [{ score: 20, multiplier: TRIPLE }, { score: 18, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    117: [{ score: 20, multiplier: TRIPLE }, { score: 17, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    116: [{ score: 20, multiplier: TRIPLE }, { score: 16, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    115: [{ score: 20, multiplier: TRIPLE }, { score: 15, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    114: [{ score: 20, multiplier: TRIPLE }, { score: 14, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    113: [{ score: 20, multiplier: TRIPLE }, { score: 13, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    112: [{ score: 20, multiplier: TRIPLE }, { score: 12, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    111: [{ score: 20, multiplier: TRIPLE }, { score: 19, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    110: [{ score: 20, multiplier: TRIPLE }, { score: 10, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    109: [{ score: 19, multiplier: TRIPLE }, { score: 12, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    108: [{ score: 20, multiplier: TRIPLE }, { score: 16, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    107: [{ score: 19, multiplier: TRIPLE }, { score: 10, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    106: [{ score: 20, multiplier: TRIPLE }, { score: 10, multiplier: SINGLE }, { score: 18, multiplier: DOUBLE }],
    105: [{ score: 20, multiplier: TRIPLE }, { score: 13, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    104: [{ score: 20, multiplier: TRIPLE }, { score: 12, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    103: [{ score: 19, multiplier: TRIPLE }, { score: 10, multiplier: SINGLE }, { score: 18, multiplier: DOUBLE }],
    102: [{ score: 20, multiplier: TRIPLE }, { score: 10, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    101: [{ score: 17, multiplier: TRIPLE }, { score: 10, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    100: [{ score: 20, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    99: [{ score: 19, multiplier: TRIPLE }, { score: 10, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    98: [{ score: 20, multiplier: TRIPLE }, { score: 19, multiplier: DOUBLE }],
    97: [{ score: 19, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    96: [{ score: 20, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    95: [{ score: 19, multiplier: TRIPLE }, { score: 19, multiplier: DOUBLE }],
    94: [{ score: 18, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    93: [{ score: 19, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    92: [{ score: 20, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    91: [{ score: 17, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    90: [{ score: 18, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    89: [{ score: 19, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    88: [{ score: 16, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    87: [{ score: 17, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    86: [{ score: 18, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    85: [{ score: 15, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    84: [{ score: 16, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    83: [{ score: 17, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    82: [{ score: 14, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    81: [{ score: 15, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    80: [{ score: 16, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    79: [{ score: 13, multiplier: TRIPLE }, { score: 20, multiplier: DOUBLE }],
    78: [{ score: 18, multiplier: TRIPLE }, { score: 12, multiplier: DOUBLE }],
    77: [{ score: 15, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    76: [{ score: 20, multiplier: TRIPLE }, { score: 8, multiplier: DOUBLE }],
    75: [{ score: 13, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    74: [{ score: 14, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    73: [{ score: 19, multiplier: TRIPLE }, { score: 8, multiplier: DOUBLE }],
    72: [{ score: 16, multiplier: TRIPLE }, { score: 12, multiplier: DOUBLE }],
    71: [{ score: 13, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    70: [{ score: 18, multiplier: TRIPLE }, { score: 8, multiplier: DOUBLE }],
    69: [{ score: 19, multiplier: SINGLE }, { score: BULLSEYE, multiplier: DOUBLE }],
    68: [{ score: 20, multiplier: TRIPLE }, { score: 4, multiplier: DOUBLE }],
    67: [{ score: 17, multiplier: TRIPLE }, { score: 8, multiplier: DOUBLE }],
    66: [{ score: 10, multiplier: TRIPLE }, { score: 18, multiplier: DOUBLE }],
    65: [{ score: 19, multiplier: TRIPLE }, { score: 4, multiplier: DOUBLE }],
    64: [{ score: 16, multiplier: TRIPLE }, { score: 8, multiplier: DOUBLE }],
    63: [{ score: 13, multiplier: TRIPLE }, { score: 12, multiplier: DOUBLE }],
    62: [{ score: 10, multiplier: TRIPLE }, { score: 16, multiplier: DOUBLE }],
    61: [{ score: 15, multiplier: TRIPLE }, { score: 8, multiplier: DOUBLE }],
    60: [{ score: 20, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    59: [{ score: 19, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    58: [{ score: 18, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    57: [{ score: 17, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    56: [{ score: 16, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    55: [{ score: 15, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    54: [{ score: 14, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    53: [{ score: 13, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    52: [{ score: 12, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    51: [{ score: 19, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    50: [{ score: 10, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    49: [{ score: 17, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    48: [{ score: 16, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    47: [{ score: 15, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    46: [{ score: 6, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    45: [{ score: 13, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    44: [{ score: 12, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    43: [{ score: 3, multiplier: SINGLE }, { score: 20, multiplier: DOUBLE }],
    42: [{ score: 10, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }],
    41: [{ score: 9, multiplier: SINGLE }, { score: 16, multiplier: DOUBLE }]
}

/**
 * Get a random value from the given array
 * @param {array} list - List of values
 */
function getRandom(list) {
    return parseInt(list[Math.floor(Math.random() * list.length)]);
}

function isEqual(dart1, dart2) {
    return dart1.score === dart2.score && dart1.multiplier === dart2.multiplier;
}

/**
 * Get adjacent elements from the list of the given idx
 * @param {array} list - List of get adjecent elements from
 * @param {int} idx - Index of element to get adjecent of
 * @param {int} number - Number of adjecent elements to get
 */
function getAdjacent(list, idx, number) {
    var newList = [];

    for (var i = 1; i <= number; i++) {
        if (idx - i < 0) {
            newList.push(list[list.length + idx - i]);
        } else {
            newList.push(list[idx - i]);
        }
        if (idx + i >= list.length) {
            newList.push(list[list.length - idx - i]);
        } else {
            newList.push(list[idx + i]);
        }
    }
    return newList;
}

function isSuccessful(targetPercentage) {
    return Math.random() < targetPercentage;
}

/**
 * Attempt a throw at the given number
 *
 * @param {int} number - Number we are aiming for
 * @param {int} multiplier - Multiplier we are aiming for
 */
exports.attemptThrow = (number, multiplier) => {
    this.dartsThrown++;

    var score = number;
    var multiplier = multiplier;

    var hitrate = this.hitrates[multiplier];
    if (!isSuccessful(hitrate)) {
        if (multiplier == TRIPLE) {
            // We either hit single, or adjacent
            if (isSuccessful(this.hitrates[SINGLE])) {
                multiplier = SINGLE;
            } else {
                score = getRandom(getAdjacent(BOARD, BOARD.indexOf(score), this.hitrates.missRange));
                multiplier = SINGLE;
            }
        } else if (multiplier === DOUBLE) {
            // We either hit miss, or single
            if (isSuccessful(1.0 - this.hitrates[DOUBLE])) {
                score = 0;
                multiplier = SINGLE;
            } else {
                multiplier = SINGLE;
            }
        } else {
            // We hit adajcent
            score = getRandom(getAdjacent(BOARD, BOARD.indexOf(score), this.hitrates.missRange));
            multiplier = getRandom(getAdjacent(BOARD_MULTIPLIERS, BOARD_MULTIPLIERS.indexOf(multiplier), 1));
        }
    }
    return { score: score, multiplier: multiplier };
}

exports.attemptCheckout = (currentScore, thrown) => {
    var darts = [];
    if (currentScore > 40) {
        var checkout = CHECKOUT_GUIDE[currentScore];
        if (3 - thrown >= checkout.length) {
            debug("Trying for a big checkout: " + currentScore);
            for (var i = thrown; i < checkout.length; i++) {
                var dart = this.attemptThrow(checkout[i].score, checkout[i].multiplier);
                darts.push(dart);
                if (!isEqual(dart, checkout[i])) {
                    break;
                }
                currentScore -= dart.score * dart.multiplier;
                if (currentScore <= 0) {
                    break;
                }
            }
        } else {
            debug("We don't have enough darts, just score");
            // We cannot complete a perfect checkout, so lets just score some points
            // TODO improve
            for (var i = thrown; i < 3; i++) {
                var dart = this.attemptThrow(20, 1);
                darts.push(dart);
                currentScore -= dart.score * dart.multiplier;
                if (currentScore <= 1) {
                    break;
                }
            }
        }
    } else {
        // TODO Only attempt checkout if we have an even number
        debug(`Score is ${currentScore}, trying to checkout`);
        for (var i = thrown; i < 3; i++) {
            var dart = this.attemptThrow(currentScore / 2, 2);
            darts.push(dart);
            currentScore -= dart.score * dart.multiplier;
            if (currentScore <= 0) {
                break;
            }
        }
    }
    return darts;
}

exports.new = (skill) => {
    var hitrateSingle = 0.70;
    var hitrateDouble = 0.13;
    var hitrateTriple = 0.10;
    var missRange = 1;

    switch (skill) {
        case this.MEDIUM:
            hitrateSingle = 0.70;
            hitrateDouble = 0.13;
            hitrateTriple = 0.10;
            missRange = 2;
            break;
        case this.HARD:
            hitrateSingle = 0.70;
            hitrateDouble = 0.13;
            hitrateTriple = 0.10;
            missRange = 2;
            break;
        case this.PERFECT:
            hitrateSingle = 1.00;
            hitrateDouble = 1.0;
            hitrateTriple = 1.0;
            missRange = 1;
            break;
        case this.EASY:
        default:
            hitrateSingle = 0.40;
            hitrateDouble = 0.05;
            hitrateTriple = 0.03;
            missRange = 3;
            break;
    }

    this.hitrates = {
        1: hitrateSingle,
        2: hitrateDouble,
        3: hitrateTriple,
        missRange: missRange
    }
}

module.exports = (id) => {
    this.id = id;
    this.dartsThrown = 0;
    return this;
}
