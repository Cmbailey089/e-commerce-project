const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({include: [{ model: Product, through:ProductTag}],
  })
  .then((tagData)=>res.status(200).json(tagData));
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {include: [{ model: Product, through:ProductTag}],
  })
  .then((tagData)=>res.status(200).json(tagData));
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tagData)=>
    res.status(200).json(tagData));
 
  
  // create a new tag
});

router.put('/:id', (req, res) => {
  
    Tag.update({
      id:req.body.id,
      tag_name:req.body.tag_name
    },
    {
      where:{id: req.params.id,
      },
    })
    .then((updatedTag)=>{
      res.status(200).json(updatedTag)
    })
    .catch((err)=>res.send(err));
  
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({where:{id: req.body.id}
  })
  .then((tagData)=>res.status(200).json(tagData))
  .catch((err)=> res.send(err));
  // delete on tag by its `id` value
});

module.exports = router;
