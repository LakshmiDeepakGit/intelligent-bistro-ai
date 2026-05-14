import express from "express";
import { processOrderMessage } from "../services/aiOrderService";

const router = express.Router();

function handleOrder(req: express.Request, res: express.Response) {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        message: "Please provide a valid message.",
        actions: [],
      });
    }

    const response = processOrderMessage(message);
    return res.json(response);
  } catch (error) {
    console.error("AI route error:", error);

    return res.status(500).json({
      message: "AI processing failed.",
      actions: [],
    });
  }
}

router.post("/order", handleOrder);
router.post("/chat", handleOrder);

export default router;