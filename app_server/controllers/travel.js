const travel = (req, res) => {
    pageTitle = process.env.npm_package_description + ' - Travel';
    res.render('travel', {
        title: pageTitle,
        active_nav: {
            travel: true
        }});
};

module.exports = {
    travel
}