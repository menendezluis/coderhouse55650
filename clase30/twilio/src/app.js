import express from "express";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const TWILIO_ACCOUNT_SID = "xxxxxx";
const TWILIO_AUTH_TOKEN = "xxxxx";
const TWILIO_PHONE_NUMBER = "+xxxxx";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.post("/sms", async (req, res) => {
  const { message } = req.body;
  //      messagingServiceSid: "MG44e2ce559674cf3abacaae351f2ac3e8",

  try {
    let result = await client.messages.create({
      from: TWILIO_PHONE_NUMBER,
      to: "+5491160000000",
      body: message,
    });
    console.log(result);
    res.json({ status: "success", result });
  } catch (error) {
    res.json({ status: "error", error });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
