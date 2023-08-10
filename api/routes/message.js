import express from 'express';
import { messageModel } from '../schema/message.js';
const messageRoutes = express.Router();

messageRoutes.get("/messages", async (req, res) => {
    try {
        const messageResult = await messageModel.find({});
        return res.json(messageResult).status(200);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})
messageRoutes.post("/messages", async (req, res) => {
    try {
        const data = req.body;
        const newMessage = new messageModel({ name: data.name, message: data.message })
        const savedMessage = await newMessage.save();
        return res.json(savedMessage).status(200);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})

export default messageRoutes;