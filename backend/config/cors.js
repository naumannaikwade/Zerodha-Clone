const normalizeOrigin = (origin) => origin.trim().replace(/\/$/, "");

const getAllowedOrigins = () => {
  const configuredOrigins = process.env.CORS_ORIGINS
    ?.split(",")
    .map(normalizeOrigin)
    .filter(Boolean);

  if (configuredOrigins?.length) return new Set(configuredOrigins);

  if (process.env.NODE_ENV !== "production") {
    return new Set(["http://localhost:3000", "http://localhost:3001"]);
  }

  return new Set();
};

const createCorsOptions = () => {
  const allowedOrigins = getAllowedOrigins();

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
        callback(null, true);
        return;
      }

      const error = new Error("Origin is not allowed by CORS");
      error.status = 403;
      callback(error);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  };
};

module.exports = { createCorsOptions, getAllowedOrigins };
