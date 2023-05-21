const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try{
    const tagData = Tag.findAll({
      include: [{ model: ProductTag}],
    });
    res.status(200).json(tagData);
     } catch (err){
      res.status(500).json(err);
    }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  try{
    const tagData = Tag.findByPk(req.params.id, {
      include: [{ model: ProductTag}],
    });

    if(!tagData){
      res.status(404).json({message: 'Can not find tag with matching id.'});
    }
    res.status(200).json(tagData);
  } catch (err){
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  try {
    const tagData = Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', (req, res) => {
  try {
    const tagData = Tag.update(req.body.id);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const tagData = Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
