
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try{
    const categoryData = Category.findAll({include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
     } catch (err){
      res.status(500).json(err);
    }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  try {
    const categoryData = Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  try {
    const categoryData = Category.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', (req, res) => {
  try {
    const categoryData = Category.update(req.body.id);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const categoryData = Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
