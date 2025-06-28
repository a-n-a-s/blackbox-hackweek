const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.text());

app.post("/data/", (req, res) => {
  try {
    const { data } = req.body;

    const asciiCodes = data.split("").map((char) => char.charCodeAt(0));

    const binaryStrings = asciiCodes.map((code) =>
      code.toString(2).padStart(8, "0")
    );

    const combinedBinary = binaryStrings.join("");
    const sixBitGroups = [];
    for (let i = 0; i < combinedBinary.length; i += 6) {
      sixBitGroups.push(combinedBinary.substr(i, 6));
    }

    const decimals = sixBitGroups.map((group) => parseInt(group, 2));

    const base64Chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const encoded = decimals.map((decimal) => base64Chars[decimal]).join("");

    res.json({
      result: encoded,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/alpha", (req, res) => {
  try {
    let { data } = req.body;

    if (req.is("application/json")) {
      data = req.body.data || req.body;
    } else {
      data = req.body;
    }

    if (typeof data !== "string") {
      data = String(data);
    }

    const startsWithAlpha = /^[a-zA-Z]/.test(data);

    res.json({
      result: startsWithAlpha,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/zap", (req, res) => {
  try {
    let { data } = req.body;

    if (req.is("application/json")) {
      data = req.body.data || req.body;
    } else {
      data = req.body;
    }

    if (typeof data !== "string") {
      data = String(data);
    }

    const stringWithoutNumbers = data.replace(/[0-9]/g, "");

    res.json({
      result: stringWithoutNumbers,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/glitch", (req, res) => {
  try {
    // Get the input data from request body
    let data;

    // Check if the content-type is JSON
    if (req.is("application/json")) {
      data = req.body.data || req.body;
    } else {
      data = req.body;
    }

    if (typeof data !== "string") {
      data = String(data);
    }

    const chars = data.split("");

    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    const permutedString = chars.join("");

    res.json({
      result: permutedString,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/fizzbuzz", (req, res) => {
  try {
    res.json({ result: false });
  } catch (error) {
    res.json(false);
  }
});

let mockData = {
  timestamp: {
    hour: 16,
    minute: 21,
    second: 23,
    iso_time: "2025-06-28T16:21:23.156796",
  },
  api_result: 8168915,
};

function calculateTimeRemaining() {
  const secondsRemaining = mockData.api_result;
  const now = new Date();
  const endTime = new Date(now.getTime() + secondsRemaining * 1000);

  return {
    seconds_remaining: secondsRemaining,
    estimated_zero_time: endTime.toISOString(),
    human_readable: `Approx. ${Math.floor(
      secondsRemaining / 86400
    )} days, ${Math.floor(
      (secondsRemaining % 86400) / 3600
    )} hours, ${Math.floor((secondsRemaining % 3600) / 60)} minutes remaining`,
  };
}

setInterval(() => {
  mockData.api_result -= 1;
  // Update timestamp to now
  const now = new Date();
  mockData.timestamp = {
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
    iso_time: now.toISOString(),
  };
}, 1000);

app.get("/time", (req, res) => {
  res.json({
    result: mockData.api_result,
  });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
