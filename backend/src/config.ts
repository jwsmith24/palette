import dotenv from "dotenv";
import fs from "fs";

const config = dotenv.config();

if (config.error) {
  // default .env file
  const defaultEnv = `
  SERVER_PORT=3000
  CANVAS_API_TOKEN=[enter your token] (remove braces)
  CANVAS_URL=https://canvas.asu.edu/api/v1
  `;

  // if a local .env file doesn't exist, write a default one
  if (!fs.existsSync(".env")) {
    fs.writeFileSync(".env", defaultEnv.trim());
    console.log(
      "Local .env file not found.. Created new one with default values.",
    );
  } else {
    console.log(
      "Failed to load local .env file but it exists. Check the file and try again.",
    );
  }
}

export default config.parsed;
