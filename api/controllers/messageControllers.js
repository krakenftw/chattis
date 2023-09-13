import { messageModel } from "../schema/message.js";


export const handleGetMessages = async (req, res) => {
    const user = req.user;
    try {
        const messages = await messageModel.find({ chat: req.params.chatId });
        res.json(messages);

    } catch (err) {
        res.status(301).json({ err });
        console.log(err);
    }
}
export const handleMessageSend = async (req, res) => {
    console.log("aya")
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        return res.status(402).json({ error: "all fields required." })
    }
    try {
        const stored = new messageModel({ content, sender: req.user, chat: chatId });
        const result = await stored.save();
        const populatedResult = await result.populate("chat");
        res.json(populatedResult);
    } catch (err) {
        console.log(err)
        res.status(402).json({ "error": err });
    }
}
