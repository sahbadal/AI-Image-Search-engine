import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import FormData from "form-data";

dotenv.config();
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from Stability AI!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "png");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "application/json",
          ...formData.getHeaders(),
        },
        body: formData,
      }
    );

    // console.log("Prompt Received:", prompt);
    // console.log("Stability API Response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      return res.status(500).json({ error });
    }

    const result = await response.json();

    res.status(200).json({ photo: result.image_base64 || result });
  } catch (err) {
    console.error("Image generation failed:", err);
    res.status(500).json({ error: "Image generation failed" });
  }
});

export default router;
