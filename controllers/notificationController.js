import Notification from '../models/Notification.js';

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { userId: req.user.userId } });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const markRead = async (req, res) => {
  try {
    await Notification.update({ isRead: true }, { where: { userId: req.user.userId, isRead: false } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getNotifications, markRead };
