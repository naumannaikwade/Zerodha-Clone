const validateEnvironment = () => {
  const required = ["MONGO_URI", "JWT_SECRET"];
  const missing = required.filter((name) => !process.env[name]?.trim());

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  if (process.env.NODE_ENV === "production") {
    if (!process.env.CORS_ORIGINS?.trim()) {
      throw new Error("CORS_ORIGINS is required in production");
    }

    if (process.env.JWT_SECRET.length < 32) {
      throw new Error("JWT_SECRET must contain at least 32 characters in production");
    }
  }
};

module.exports = validateEnvironment;
