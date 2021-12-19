const fs = require('fs');
const room = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

const rooms = (req, res) => {
    pageTitle = process.env.npm_package_description + ' - Rooms';
    res.render('rooms', {
        title: pageTitle,
        room,
        active_nav: {
            rooms: true
        }});
};

module.exports = {
    rooms
}