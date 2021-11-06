const rooms = (req, res) => {
    pageTitle = process.env.npm_package_description + ' - Rooms';
    res.render('rooms', {
        title: pageTitle,
        active_nav: {
            rooms: true
        }});
};

module.exports = {
    rooms
}