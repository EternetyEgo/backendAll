const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const axios = require("axios");

// Function to send message to Telegram using axios
async function sendToTelegram(message, botToken, chatId) {
  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
      message_thread_id: 4,
      parse_mode: "HTML",
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

// Format the message for Telegram
function formatMessage(formData) {
  return `
<b>📝 New Contact Form Submission</b>

<b>Name:</b> ${formData.name || "Not provided"}
<b>Job:</b> ${formData.job || "Not provided"}
<b>Email:</b> ${formData.email}
<b>Phone:</b> ${formData.phoneNumber}

<b>Message:</b>
${formData.message}

<i>Submitted on: ${new Date().toLocaleString()}</i>
`;
}

router.post("/form", async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.email || !formData.phoneNumber || !formData.message) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Get bot token and chat ID from environment variables
    const botToken = "7481705628:AAGEYZj5XVgCL8aTfYRXJTxwHkvNU0AJCXw";
    const chatId = "-1002635914628";

    if (!botToken || !chatId) {
      return res.status(500).json({
        success: false,
        message: "Telegram configuration is missing",
      });
    }

    // Format message for Telegram
    const message = formatMessage(formData);

    // Send to Telegram
    const telegramResponse = await sendToTelegram(message, botToken, chatId);

    if (!telegramResponse.ok) {
      return res.status(500).json({
        success: false,
        message: "Failed to send message to Telegram",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Message sent to Telegram successfully",
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
