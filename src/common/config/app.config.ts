export const EnviromentsConfig = () => ({
    enviroment : process.env.NODE_ENV || 'dev',
    mongodb : process.env.MONGO_DB,
    port : process.env.PORT || 3001,
    defaultlimit: +process.env.DEFAULT_LIMIT || 7
})