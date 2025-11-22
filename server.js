const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
const path = require("path");

dotenv.config();

const { SENDGRID_API_KEY, MAIL_TO = "info@carlotechnologies.com", MAIL_FROM } = process.env;

if (!SENDGRID_API_KEY) {
  console.warn("⚠️  SENDGRID_API_KEY is not set. Emails cannot be sent until it is configured.");
}

if (!MAIL_FROM) {
  console.warn("⚠️  MAIL_FROM is not set. Defaulting to MAIL_TO for the sender address.");
}

sgMail.setApiKey(SENDGRID_API_KEY || "");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "Carlo Technologies email API" });
});

app.post("/api/contact", async (req, res) => {
  const { name, company, email, phone, message } = req.body || {};

  if (!name || !company || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields (name, company, email, phone, message) are required." });
  }

  if (!SENDGRID_API_KEY) {
    return res.status(500).json({ error: "Email service is not configured on the server." });
  }

  const mail = {
    to: MAIL_TO,
    from: MAIL_FROM || MAIL_TO,
    subject: `New Inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Requested Service / Comments:",
      message,
    ].join("\n"),
  };

  try {
    await sgMail.send(mail);
    res.json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("SendGrid error:", error);
    const errorMessage = error.response?.body?.errors?.[0]?.message || "Failed to send email.";
    res.status(500).json({ error: errorMessage });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`📬 Email API running on http://localhost:${PORT}`);
});

