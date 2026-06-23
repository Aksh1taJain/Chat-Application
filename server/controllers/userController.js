import User from '../models/User.js';

export const searchUsers = async (req, res) => {
  const q = req.query.q?.trim() || '';
  const filter = q ? { $or: [{ name: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }] } : {};
  const users = await User.find({ ...filter, _id: { $ne: req.user._id } }).limit(20);
  res.json(users);
};
