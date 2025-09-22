module.exports = async function (context, req) {
    try {
      const input = (req.body && req.body.input) || req.query.input || "";
      // Normalize urlsafe -> standard
      const normalized = String(input).replace(/-/g, "+").replace(/_/g, "/");
      // pad
      const pad = normalized.length % 4;
      const padded = normalized + (pad ? "=".repeat(4 - pad) : "");
      const decoded = Buffer.from(padded, "base64").toString("utf8");
      context.res = { status: 200, body: { decoded, isValid: true } };
    } catch (err) {
      context.log.warn(err);
      context.res = { status: 400, body: { isValid: false, error: "invalid_input" } };
    }
  };
  