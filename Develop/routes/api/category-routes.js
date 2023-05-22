
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
    Category.findAll({include: [{ model: Product}],
    })
    .then((categoryData)=>res.status(200).json(categoryData));
  
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
   // find one category by its `id` value
  Tag.findByPk(req.params.id, {include: [{ model: Product}],
  })
  .then((categoryData)=>res.status(200).json(categoryData));
 
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
 Category.create({
      reader_id: req.body.reader_id,
    }).then((categoryData)=>
    res.status(200).json(categoryData));
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      id:req.body.id,
      category_name:req.body.category_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
 Category.destroy({where: {id: req.params.id,},
    }).then((categoryData)=>
    res.status(200).json(categoryData));
  // delete a category by its `id` value
});

module.exports = router;
