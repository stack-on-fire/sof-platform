const axios = require("axios");

export default async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const CONTACT_LIST = {
    "stack-on-fire": "a579f73a-bce8-4d72-b98f-7107d9e6d017",
  };
  const TOKEN = process.env.SG_API;
  const config = {
    headers: {
      Authorization: "bearer " + TOKEN,
      "content-type": "application/json",
    },
  };

  const bodyParameters = {
    list_ids: [CONTACT_LIST["stack-on-fire"]],
    contacts: [{ email }],
  };

  axios
    .put(
      "https://api.sendgrid.com/v3/marketing/contacts",
      bodyParameters,
      config
    )
    .then(() => {
      console.log(res);
      return res.status(201).end();
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).end();
    });
  console.log(123);
  return res.end();
};
