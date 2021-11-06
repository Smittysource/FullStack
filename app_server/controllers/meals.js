const fs = require('fs');
const meal = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));

const meals = (req, res) => {
    pageTitle = process.env.npm_package_description + ' - Meals';
    res.render('meals', {
        title: pageTitle,
        meal,
        active_nav: {
            meals: true
        }});
};

module.exports = {
    meals
}