
module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'login',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    jwtSecret:'kcmksmcksmkcs',
    jwtExpiration:'1d'
}