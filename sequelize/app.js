const express = require('express')
const { sequelize, User, Post } = require('./models')
const app = express()
app.use(express.json())
// Creating User
app.post('/users', async(req, res) => {
    const {name, email, role} = req.body
    try{
        const user = await User.create({name, email, role})
        return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

// Getting all the users
app.get('/users', async(req, res) =>{
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Something Went Wrong'})
    }
})

// Getting a a user by uuid
app.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({where : {uuid}, include: 'posts'})
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
        
    }
})

// Creating a post against the user uuid
app.post('/posts', async(req, res) => {
    const {userUuid, body} = req.body
    console.log(req.body)
    try{
        const user = await User.findOne({where: {uuid: userUuid}})
        const post = await Post.create({body, userId: user.id})
        return res.json(post)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
// Getting all the posts 
app.get('/posts', async(req, res) => {
    try{
        const posts = await Post.findAll({include:'user'})
        //{include:[User]} : Getting posts with the user
        //{include:[{model: User, as: 'user'}]} : Making a alies of User as user
        //Benifits of making alies we can just pass the alies 'user' insted of [{model: User, as: 'user'}] 
        return res.json(posts)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
// Deleting a user
app.delete('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({where: {uuid}})
        await user.destory()
        return res.json({message: 'User Deleted !'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
})

// Updating a user
app.put('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const {name, email, role} = req.body
    try {
        const user = await User.findOne({where: {uuid}})
        user.name = name
        user.email = email
        user.role = role
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
})

app.listen({port:5000}, async () => {
    console.log('SERVER is up at localhost:5000')
    await sequelize.authenticate()
    // await sequelize.sync({force: true})
    // {alter or force : true} will allow to the tables if they already exists.
    // sequelize.sync({force: true}) Drops the table data every time it runs
    // in production we will use the migrations.
    console.log('Database Synced !')
})
