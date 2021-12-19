const index = (req, res) => {
    pageTitle = process.env.npm_package_description + ' - Main';
    res.render('index', {
        title: pageTitle,
        active_nav: {
            index: true
        }});
};

module.exports = {
    index
};