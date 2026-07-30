const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());


app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


let blogs = [];


app.get("/blogs", (req, res) => {
  res.json(blogs);
});


app.get("/blogs/:id", (req, res) => {
  const id = Number(req.params.id);

  const blog = blogs.find((item) => item.id === id);

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  res.json(blog);
});


app.post("/blogs", (req, res) => {
  const blog = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
  };

  blogs.push(blog);

  res.status(201).json({
    message: "Blog added successfully",
    data: blog,
  });
});


app.put("/blogs/:id", (req, res) => {
  const id = Number(req.params.id);

  const blog = blogs.find((item) => item.id === id);

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  blog.title = req.body.title;
  blog.content = req.body.content;

  res.json({
    message: "Blog updated",
    data: blog,
  });
});


app.delete("/blogs/:id", (req, res) => {
  const id = Number(req.params.id);

  const blogExists = blogs.find((item) => item.id === id);

  if (!blogExists) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  blogs = blogs.filter((item) => item.id !== id);

  res.json({
    message: "Blog deleted successfully",
  });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  res.json({
    message: "Login successful",
    token: "mock-jwt-token-12345",
  });
});


app.get("/", (req, res) => {
  res.json({
    message: "Welcome to The Data Hub API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});