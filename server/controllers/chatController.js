import Chat from '../models/Chat.js';

const populateChat = (query) => query.populate('users', '-password').populate('groupAdmin', '-password').populate({ path: 'latestMessage', populate: { path: 'sender', select: 'name email avatar' } });

export const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'userId is required' });
  let chat = await populateChat(Chat.findOne({ isGroupChat: false, users: { $all: [req.user._id, userId], $size: 2 } }));
  if (!chat) chat = await populateChat(Chat.create({ chatName: 'Private chat', users: [req.user._id, userId] }).then((c) => Chat.findById(c._id)));
  res.json(chat);
};

export const createGroupChat = async (req, res) => {
  const { chatName, users = [] } = req.body;
  const uniqueUsers = [...new Set([req.user._id.toString(), ...users])];
  if (!chatName || uniqueUsers.length < 3) return res.status(400).json({ message: 'Group name and at least two other members are required' });
  const chat = await populateChat(Chat.create({ isGroupChat: true, chatName, users: uniqueUsers, groupAdmin: req.user._id }).then((c) => Chat.findById(c._id)));
  res.status(201).json(chat);
};

export const getChats = async (req, res) => {
  const chats = await populateChat(Chat.find({ users: req.user._id })).sort({ updatedAt: -1 });
  res.json(chats);
};
