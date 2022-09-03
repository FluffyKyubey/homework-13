const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product')

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(allCategories)
  } catch (err) {
    res.status(500).json('something brokeded')
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!singleCategory) {
      res.status(404).json({ message: 'that doesmt exist' });
      return;
    }
    res.status(200).json(singleCategory)
  } catch (err) {
    res.status(500).json('something broke', err)
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(400).json('something broke', err)
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
const checkID = await Category.findByPk(req.params.id)
const updateCategory = await Category.update(req.body, {
  where: {
    id: req.params.id
  },
})
if (!checkID){
  res.status(404).json('doesnt exist');
  return;
}
res.status(200).json({ message: 'category updated'})
  } catch (err) {
    res.status(500).json('something broke', err)
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
const delCategory = await Category.destroy({ 
  where: {
    id: req.params.id
  },
})
if (!delCategory){
  res.status(404).json({message: 'doesnt exist'});
  return;
}
  } catch (err) {
    res.status(500).json('something broke', err)
  }
});

module.exports = router;
