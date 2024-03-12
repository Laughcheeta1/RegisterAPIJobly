const { app }  = require('./app');
const connectDb = require('./db');

const port = 8081;

// connectDb();
app.listen(
    port,
    () => console.log(`Server is running on port ${port}`)
)