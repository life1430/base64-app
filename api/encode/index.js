module.exports = async function (context, req) {
    try {
      const input = (req.body && req.body.input) || req.query.input || "";
      const variant = (req.body && req.body.variant) || "standard";
      const buf = Buffer.from(String(input), "utf8");
      let encoded = buf.toString("base64");
      if (variant === "urlsafe") encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      context.res = { status: 200, body: { encoded } };
    } catch (err) {
      context.log.error(err);
      context.res = { status: 500, body: { error: "server_error" } };
    }
  };
  