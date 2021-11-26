const mongoose = require('mongoose');
const model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    model
        .find({})   // empty filter for all
        .exec((err, trips) => {
            // !trips wasn't working. Had to change to empty array.
            if(trips.length == 0) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            }
            else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindCode = async (req, res) => {
    model
        .find({'code': req.params.tripCode})   // find specific trip by code field
        .exec((err, trips) => {
            // !trips does not work. Had to change to empty array.
            if(trips.length == 0) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            }
            else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

module.exports = {
    tripsList,
    tripsFindCode
};