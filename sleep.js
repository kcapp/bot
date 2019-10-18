/**
 * Module to sleep for a given number of milliseconds
 * @param {int} - Milliseconds to sleep
 */
module.exports = (ms) => {
    return new Promise(resolve => { setTimeout(resolve, ms) });
};