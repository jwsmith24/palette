import dotenv from "dotenv";

const config = dotenv.config();

if (config.error) {
  throw new Error("Failed to load .env file with Canvas configs");
}

export default config.parsed;
