/**
 * This is for the controller functions that we are going to call in the routes, so that we don't have to write try catch block 
 * in every controller function
 * @param {*} controller This is the functions that we are going to call in the try catch block
 * @returns 
 */

module.exports = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        return next(error);
    }
}