const express = require('express')
const app = express()

app.get("/api", (req, res) => {
  res.json([
    {
      "key": 1234231,
      "task": "Do 20 pushups",
      "time": 1
    },
    {
      "key": 145343,
      "task": "Plan your next day",
      "time": 2
    },
    {
      "key": 1251245,
      "task": "Drink a glass of water",
      "time": 1
    }])
})

app.listen(5000, () => { console.log("Server started on port: 5000") })