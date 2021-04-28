const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');
//add pizzas prefix to pizzaRoutes
router.use('/pizzas', pizzaRoutes);

module.exports = router;