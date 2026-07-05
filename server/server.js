import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "agora-token";

dotenv.config();

const { RtcTokenBuilder, RtcRole, RtmTokenBuilder } = pkg;

const app = express();

app.use(cors());

const APP_ID = process.env.AGORA_APP_ID;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

if (!APP_ID || !APP_CERTIFICATE) {
  console.error(" Missing AGORA_APP_ID or AGORA_APP_CERTIFICATE in server/.env");
  process.exit(1);
}

app.get("/api/token", (req, res) => {
  try {
    const { channel, uid } = req.query;

    if (!channel || !uid) {
      return res.status(400).json({
        error: "Missing channel or uid"
      });
    }

    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs =
      currentTimestamp + expirationTimeInSeconds;

    const rtcToken = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERTIFICATE,
      channel,
      Number(uid),
      RtcRole.PUBLISHER,
      privilegeExpiredTs,
      privilegeExpiredTs
    );

    const rtmToken = RtmTokenBuilder.buildToken(
      APP_ID,
      APP_CERTIFICATE,
      uid,
      privilegeExpiredTs
    );

    res.json({
      rtcToken,
      rtmToken
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Token server running on http://localhost:${PORT}`);
});