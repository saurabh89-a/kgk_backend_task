import Item from '../models/Item.js';

const getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createItem = async (req, res) => {
  const { name, description, startingPrice, endTime } = req.body;
  const imageUrl = req.file ? req.file.path : null;
  try {
    const item = await Item.create({ name, description, startingPrice, currentPrice: startingPrice, imageUrl, endTime });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, startingPrice, currentPrice, endTime } = req.body;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    if (req.user.userId !== item.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    await item.update({ name, description, startingPrice, currentPrice, endTime });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    if (req.user.userId !== item.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getItems, getItemById, createItem, updateItem, deleteItem };
