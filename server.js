const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

require("dotenv").config();

const express =
  require("express");

const mongoose =
  require("mongoose");

const passport =
  require("./config/passport");

const app =
  express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

// Initialize passport
app.use(
  passport.initialize()
);

// Routes
app.use(
  "/api/users",
  require(
    "./routes/api/userRoutes"
  )
);

app.use(
  "/api/bookmarks",
  require(
    "./routes/api/bookmarkRoutes"
  )
);

app.get("/", (req, res) => {

  res.json({
    message:
      "Server running"
  });

});

mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {

    console.log(
      "MongoDB Connected"
    );

    app.listen(
      process.env.PORT,
      () => {

        console.log(
          `Server running on ${process.env.PORT}`
        );

      });
  })
  .catch(console.error);