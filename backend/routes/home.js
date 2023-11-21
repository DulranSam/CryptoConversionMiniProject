const express = require("express");
const router = express.Router();
const Axios = require("axios");
require("dotenv").config();
const key = process.env.COINAPIKEY;

router.route("/").get(async (req, res) => {
  const { crypto = "BTC", currency = "USD" } = req.params;
  if (!crypto)
    return res.json({ Alert: "Currency or crypto values not filled" });
  try {
    const r = await Axios.get(
      `https://rest.coinapi.io/v1/exchangerate/${crypto}?/${currency}?`,
      {
        headers: {
          "X-CoinAPI-Key": key,
        },
      }
    )
      .then((r) => {
        res.json(r.data).status(r.status);
      })
      .catch((e) => {
        res.json(e.response.data).status(e.response.status);
      });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
