const express = require('express');
const app = express();
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


let posts = [
    {
        id: uuidv4(),
        username: "Rishabh27",
        content: "This is my first post Message"
    },
    {
        id: uuidv4(),
        username: "Rs27",
        content: "JUst created a new account pleasure meeting u all"
    },
    {
        id: uuidv4(),
        username: "harsh07",
        content: "aiming for sccucess"
    }
];
const port = 8080;



app.get("/posts", (req, res) => {
    res.render("index", { posts });
})





app.get("/posts/new", (req, res) => {
    res.render("new")
})

app.post("/posts", (req, res) => {
    let id = uuidv4();
    let username = req.body.username;
    let content = req.body.content;
    // console.log(`${username} content is ${content} and id is ${id}`)
    posts.push({ id, username, content });
    res.redirect("/posts")
})




app.get("/posts/:id", (req, res) => {

    // let { id } = req.params;
    let id = req.params.id;

    // console.log(id);
    let post = posts.find((p) => id == p.id);

    // console.log(post);

    res.render("show", { post });

})





app.get("/posts/:id/edit", (req, res) => {

    let id = req.params.id;
    let post = posts.find((p) => id == p.id);



    res.render("edit", { post });
})

app.patch("/posts/:id", (req, res) => {
    let id = req.params.id;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newContent;
    res.redirect("/posts")
})


app.delete("/posts/:id", (req, res) => {

    let id = req.params.id;

    posts = posts.filter((p) => id !== p.id);

    res.redirect("/posts")



})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})