const mongoose = require("mongoose");

const querySchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", required: true },
    query: { type: "String", required: true },
    isResolved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);

const Query = mongoose.model("Query", querySchema);

module.exports = Query;
