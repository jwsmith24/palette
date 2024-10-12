const {Client} = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'xTe&7?57tY9CDf@i',
    database: 'palette'

})

client.connect();
client.query(`Select * from rubrics`, (error, result) => {
    if(!error){
        console.log(result.rows);
    } else {
        console.log(error.message);
    }
    client.end
})