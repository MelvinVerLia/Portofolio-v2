const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const fs = require("fs");

const knowledgeBase = fs.readFileSync("./data.txt", "utf-8");

// Global conversation history (resets on server restart)
let conversationHistory = [];

// Rate limiting - track requests
let requestCount = 0;
let lastResetTime = Date.now();
const MAX_REQUESTS_PER_MINUTE = 12; // Keep it under 15 to be safe

// Reset counter every minute
const resetRateLimit = () => {
  const now = Date.now();
  if (now - lastResetTime >= 60000) {
    // 1 minute
    requestCount = 0;
    lastResetTime = now;
  }
};

// Sleep function for delays
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const chat = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    // Check rate limit
    resetRateLimit();
    if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
      const waitTime = Math.ceil((60000 - (Date.now() - lastResetTime)) / 1000);
      return res.status(429).json({
        error: `Rate limit exceeded. Please wait ${waitTime} seconds before trying again.`,
        retryAfter: waitTime,
      });
    }

    // Add user message to history
    conversationHistory.push({ role: "user", content: prompt });

    // Keep only last 20 messages (10 back and forth exchanges)
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    // Build context with knowledge base and conversation history
    let contextPrompt = `Only use this info to answer:\n${knowledgeBase}\n\n`;

    if (conversationHistory.length > 1) {
      contextPrompt += "Previous conversation:\n";
      // Include all history except the current message
      conversationHistory.slice(0, -1).forEach((msg) => {
        const roleLabel = msg.role === "user" ? "Human" : "Assistant";
        contextPrompt += `${roleLabel}: ${msg.content}\n`;
      });
      contextPrompt += "\n";
    }

    contextPrompt += `Current question: ${prompt}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Increment request count
    requestCount++;

    // Retry logic for API calls
    let retries = 3;
    let result;

    while (retries > 0) {
      try {
        result = await model.generateContent(contextPrompt);
        break; // Success, exit retry loop
      } catch (apiError) {
        if (apiError.status === 429) {
          retries--;
          if (retries > 0) {
            console.log(
              `Rate limited, retrying in 5 seconds... (${retries} retries left)`
            );
            await sleep(5000); // Wait 5 seconds before retry
          } else {
            // Remove the user message from history since we failed
            conversationHistory.pop();
            return res.status(429).json({
              error: "API rate limit exceeded. Please try again in a minute.",
              retryAfter: 60,
            });
          }
        } else {
          throw apiError; // Re-throw if it's not a rate limit error
        }
      }
    }

    const response = await result.response;
    const botReply = response.text();

    // Add bot response to history
    conversationHistory.push({ role: "assistant", content: botReply });

    res.status(200).json({ response: botReply });
  } catch (error) {
    console.log(error);
    // Remove the user message from history if we failed
    if (
      conversationHistory.length > 0 &&
      conversationHistory[conversationHistory.length - 1].role === "user"
    ) {
      conversationHistory.pop();
    }
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { chat };
