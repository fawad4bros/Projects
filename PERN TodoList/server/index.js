const express = require("express");
const cors = require("cors");
const pool = require("./db")
const app = express();
const path = require("path")
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.Node+ENV => production or undefined  |  this env variable is provided by heroku
app.use(cors()); /* => middleware: This will allow us to intreact between our servers (localhost 5000 and 3000) */
app.use(express.json()) /* => if we are getting data from client-side, the only way to access that data we have to req.body and we can get Json data as well */

// app.use(express.static(path.join(__dirname,"client/build")));
// app.use(express.static("client/build"));
// The static files will come from the build folder.

if(process.env.NODE_ENV === "production"){
    //server static content
    // All the react application is static and contain in build folder | Built folder is build by | npm run build | we will target the index.html file
    app.use(express.static(path.join(__dirname,"client/build")));
}

//ROUTES//

//Get all Todos
app.get("/todos", async (req,res) =>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//Get a Todo
app.get("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message)
        
    }
});

//Post a Todo
app.post("/todos", async (req,res)=>{
    try {
        // Destructuring : res.json(req.body);
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);
        res.json(newTodo.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
});
//Put a Todo
app.put("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }

});
//Delete a todo

app.delete("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const todoDelete = await pool.query("Delete FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was Deleted")
    } catch (err) {
        console.error(err.message);
        
    }
});
app.listen(PORT, () =>{
    console.log(`Server is starting on ${PORT}`)
});