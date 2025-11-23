const PORT = process.env.PORT || 8000;
const { default: axios } = require("axios");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const Vercel_DOMAIN = 'https://react-travel-8vqfsecjp-taha0998s-projects.vercel.app/'; // REPLACE WITH YOUR ACTUAL VERCEL URL

const corsOptions = {
  origin: [
    'http://localhost:3000',    // Local development
    Vercel_DOMAIN,              // Your Vercel frontend
    `www.${Vercel_DOMAIN.replace('https://', '')}` // WWW version
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));



app.get("/", (req, res) => {
  res.status(200).json("Welcome to Traventure App");
});

app.get("/posts", async (req, res) => {
  const url = `${process.env.ASTRA_URL}?page-size=20`;
  const options = {
    method: "GET",
    headers: {
      "X-Cassandra-Token": process.env.TOKEN,
    },
  };
  try {
    const response = await axios(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

app.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const url = `${process.env.ASTRA_URL}/${postId}`;
  const options = {
    method: "GET",
    headers: {
      "X-Cassandra-Token": process.env.TOKEN,
    },
  };
  try {
    const response = await axios(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});
//Add post
app.post("/create", async (req, res) => {
  const data = req.body.data;

  const url = process.env.ASTRA_URL;
  const options = {
    method: "POST",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.TOKEN,
    },
    data,
  };

  try {
    const response = await axios(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

//Update post
app.put("/edit/:postId", async (req, res) => {
  const id = req.params.postId;
  const url = `${process.env.ASTRA_URL}/${id}`;
  const data = req.body.data;

  const options = {
    method: "PUT",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.TOKEN,
    },
    data,
  };
  try {
    const response = await axios(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

//Delete post
app.delete("/delete/:postId", async (req, res) => {
  const id = req.params.postId;
  const url = `${process.env.ASTRA_URL}/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "X-Cassandra-Token": process.env.TOKEN,
    },
  };
  try {
    const response = await axios(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🚀 Server URL: http://localhost:${PORT}`);
});


