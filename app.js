
const  express = require('express');
const  cors = require('cors');
const  db_connection = require('./utils/db.js');
const  dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes.js');
const preferenceRoutes = require('./routes/preferenceRoutes.js');
const newsRoutes = require('./routes/newsRoutes.js')



const port = process.env.PORT || 3000;

const app = express() // NOTE: Assigning all features of express to app variable;
db_connection()



app.use(express.urlencoded({ extended: true })); // Using HTML Forms (like <form method="POST">)
app.use(express.json()) // application/json 
app.use(cors())


app.get('/',(req,resp)=>{
    return resp.status(201).send('Welcome to NEWS Aggregator Api')
})
// Informing server about all routers
app.use('/api/v1/auth/users', authRoutes);
app.use('/api/v1/preferences', preferenceRoutes);
app.use('/api/v1/news', newsRoutes);

// app.use('/api', routers)

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



