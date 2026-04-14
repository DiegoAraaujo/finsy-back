import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    await app.ready();
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
