import cors from "cors";

const corsOptions = {
  origin: "*", // You can specify domains instead of '*' to restrict origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Methods allowed
  allowedHeaders: ["Content-Type", "Authorization"], // Headers allowed
};

const corsMiddleware = cors(corsOptions);

export { corsMiddleware };
