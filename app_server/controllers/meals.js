const meals = (req, res) => {
    pageTitle = process.env.npm_package_description + ' - Meals';
    res.render('meals', {
        title: pageTitle,
        active_nav: {
            meals: true
        }});
};

module.exports = {
    meals
}