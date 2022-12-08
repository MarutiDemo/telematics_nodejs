const Sequelize = require('sequelize');

var sequelizeInstance = new Sequelize('test', 'root', "", {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false
    },
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelizeInstance.authenticate()
    .then(() => {
        logger.info('Connection has been established successfully.');
        global.DBConnection = sequelizeInstance;
    })
    .catch(err => {
        logger.error('Unable to connect to the database:', err);
    });
