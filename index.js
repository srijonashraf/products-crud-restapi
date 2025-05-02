const app = require("./app");

// Backend server port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Backend API server running on http://localhost:${PORT}`);
});
