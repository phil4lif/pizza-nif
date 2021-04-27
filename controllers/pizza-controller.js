const { Pizza } = require('../models');

const PizzaController = {
    getAllPizza(req, res) {
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            });
    },

    getPizzaById({ params }, res) {
        Pizza.findone({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No Pizza Found' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },
};

module.exports = pizzaController;