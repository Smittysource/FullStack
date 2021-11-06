const news = (req, res) => {
    pageTitle = process.env.npm_package_description + ' - News';
    res.render('news', {
        title: pageTitle,
        active_nav: {
            news: true
        }});
};

module.exports = {
    news
}