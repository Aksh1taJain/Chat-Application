import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import { encrypt } from '../utils/encryption.js';

export const getMessages = async (req, res) => {
  const chat = await Chat.findOne({ _id: req.params.chatId, users: req.user._id });
  if (!chat) return res.status(404).json({ message: 'Chat not found' });
  const messages = await Message.find({ chat: chat._id }).populate('sender', 'name email avatar').populate('readBy', 'name email avatar').sort('createdAt');
  res.json(messages);
};

export const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;
  const chat = await Chat.findOne({ _id: chatId, users: req.user._id });
  if (!chat || !content?.trim()) return res.status(400).json({ message: 'Valid chatId and content are required' });
  let message = await Message.create({ sender: req.user._id, chat: chat._id, content: encrypt(content.trim()), readBy: [req.user._id] });
  chat.latestMessage = message._id;
  await chat.save();
  message = await Message.findById(message._id).populate('sender', 'name email avatar').populate('readBy', 'name email avatar');
  res.status(201).json(message);
};

export const markRead = async (req, res) => {
  await Message.updateMany({ chat: req.params.chatId, readBy: { $ne: req.user._id } }, { $addToSet: { readBy: req.user._id } });
  const messages = await Message.find({ chat: req.params.chatId }).populate('readBy', 'name email avatar');
  res.json(messages);
};
