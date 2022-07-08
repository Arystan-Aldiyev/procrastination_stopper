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
    },
    {
      "key": 1234152,
      "task": "Read a few pages of a book",
      "time": 5
    },
    {
      "key": 1341,
      "task": "Review your calendar",
      "time": 5
    },
    {
      "key": 54146,
      "task": "Affirm your goals",
      "time": 5
    },
    {
      "key": 1255,
      "task": "Check your todo list",
      "time": 1
    },
    {
      "key": 124124,
      "task": "Clean your workspace",
      "time": 3
    },
    {
      "key": 124146,
      "task": "Slow down and catch your breath",
      "time": 2
    },
    {
      "key": 56325,
      "task": "Quick stretch",
      "time": 5
    },
    {
      "key": 67424,
      "task": "Delete apps you rarely use from your smartphone",
      "time": 7
    },
    {
      "key": 1252621,
      "task": "Some task to do",
      "time": 8
    },
    {
      "key": 1256521,
      "task": "Do this",
      "time": 9
    },
    {
      "key": 1215213621,
      "task": "Do that",
      "time": 10
    },
    {
      "key": 1125621,
      "task": "Or that",
      "time": 10
    },
    {
      "key": 1125612321,
      "task": "Something else",
      "time": 17
    },
    {
      "key": 11252612321,
      "task": "Why",
      "time": 25
    },
    {
      "key": 112512612321,
      "task": "are",
      "time": 25
    },
    {
      "key": 121,
      "task": "you",
      "time": 25
    },
    {
      "key": 112,
      "task": "still",
      "time": 25
    },
    {
      "key": 1321,
      "task": "scrolling?",
      "time": 25
    },
    {
      "key": 1321241,
      "task": "Stop",
      "time": 31
    },
    {
      "key": 13212241,
      "task": "it",
      "time": 31
    },
    {
      "key": 13121241,
      "task": "dude",
      "time": 31
    },
  ])
})

app.listen(5000, () => { console.log("Server started on port: 5000") })