const express = require('express')
const sql = require("mssql")

const PORT = process.env.PORT || 8080

const app = express()

app.get('/api/articles', function (req, res) {

    // config database
    var config = {
        user: 'pa_nqt',
        password: '123456abc',
        server: 'localhost',
        database: 'Covid19',
        options: {
            enableArithAbort: true,
            encrypt: true
        }
    }

    // connect database
    sql.connect(config, function (err) {

        if (err) {
            console.log(err)
        }

        // create Request object
        var request = new sql.Request()

        // query to the database
        const query = 'SELECT * FROM Articles'

        request.query(query, function (err, recordDataSet) {

            if (err) {
                console.log(err)
            }

            // send records as a response
            res.send(recordDataSet)

        })
    })
})

var server = app.listen(PORT, () => console.log(`Server is starting at port ${PORT}`))