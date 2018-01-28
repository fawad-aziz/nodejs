const sql = require('mssql');
const _ = require('lodash');

const run = function () {
    const config = {
        user: 'DBA',
        password: 'svhGY7L3$seDaSY',
        server: 'lab16001azdb01-ls.database.windows.net',
        database: 'lab16001Central001_FA',
        options: {
            encrypt: true
        }
    };

    process.on('unhandledRejection', (reason) => {
        console.log('Reason: ' + reason);
    });

    process.on('uncaughtException', (err) => {
        console.log('Error: ' + err);
    });

    sql.connect(config).then(pool => {
        return pool.request().query('select * from server');
    }).then(result => {
        var names = _(result.recordset).map('Name').value();
        var toBeExcluded = _.difference(names, ['lab16g006sng001']);
        //console.log(JSON.stringify(result));
        console.log('All:' + names);
        console.log('Excluded:' + toBeExcluded);
    }).catch(err => {
        console.log(err);
    });
    
    sql.on('error', err => {
        console.log('sql.on' + err);
    });
};

run();

console.log('end');