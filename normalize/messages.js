const { schema, normalize, denormalize } = require("normalizr");
const { generatorAvatar } = require("../utils/generatorFaker");

function normalizeMessages(data) {
  const authorSchema = new schema.Entity("author", { idAttribute: "email" });

  const messageSchema = new schema.Entity("messages", {
    author: authorSchema,
  });

  const normalizedMessages = normalize(data, messageSchema);

  return normalizedMessages;
}

module.exports = { normalizeMessages };
