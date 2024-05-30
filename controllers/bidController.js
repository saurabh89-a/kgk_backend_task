import Bid from '../models/Bid.js';
import Item from '../models/Item.js';
import Notification from '../models/Notification.js';

const getBids = async (req, res) => {
  const { itemId } = req.params;
  try {
    const bids = await Bid.findAll({ where: { itemId } });
    res.status(200).json(bids);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const placeBid = async (req, res) => {
  const { itemId } = req.params;
  const { bidAmount } = req.body;
  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    if (bidAmount <= item.currentPrice) {
      return res.status(400).json({ error: 'Bid amount must be higher than current price' });
    }
    const bid = await Bid.create({ itemId, userId: req.user.userId, bidAmount });
    await item.update({ currentPrice: bidAmount });
    
    // Notify the item owner
    await Notification.create({
      userId: item.userId,
      message: `Your item "${item.name}" has a new bid of ${bidAmount}`,
    });

    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getBids, placeBid };

