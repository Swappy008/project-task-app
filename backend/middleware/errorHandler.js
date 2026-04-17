// Global error handler - catches any unexpected errors
function errorHandler(err, req, res, next) {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error." });
}

module.exports = { errorHandler };
