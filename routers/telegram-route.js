const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const axios = require("axios");

const telegramBotToken = "7481705628:AAGEYZj5XVgCL8aTfYRXJTxwHkvNU0AJCXw";
const chatId = "-1002635914628";

// IMPORTANT: This must be the same key used on the client side
const secretKey = "Psycho#G0d$Averion2077";

router.use(express.json());

router.post("/info-post", async (req, res) => {
  try {
    const { encryptedData, formId } = req.body;
    if (!encryptedData) {
      return res.status(400).json({ message: "Encrypted data is missing!" });
    }

    try {
      // Decrypt using the correct secret key
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);

      let decryptedMessage;
      try {
        decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);

        // If empty, try alternative approach
        if (!decryptedMessage) {
          decryptedMessage = CryptoJS.enc.Utf8.stringify(bytes);
        }
      } catch (error) {
        return res.status(400).json({ message: "Decryption failed - check encryption key" });
      }

      if (!decryptedMessage) {
        return res.status(400).json({ message: "Decryption resulted in empty data" });
      }

      // Determine which thread_id to use based on formId

      // Send to Telegram with the correct thread_id
      await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        chat_id: chatId,
        message_thread_id: 2, // Use message_thread_id instead of thread_id
        text: decryptedMessage,
      });

      res.status(200).json({ message: "Message sent successfully!" });
    } catch (decryptError) {
      return res.status(400).json({
        message: "Decryption failed",
        error: decryptError.toString(),
      });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred!" });
  }
});

module.exports = router;
