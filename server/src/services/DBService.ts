import mariadb = require('mariadb');
import Errors from "../utils/Errors";

export default class DBService {

    public static getConnection = () =>
        mariadb.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: 3306
        });

    public static query(query: string, callback: (response) => void, error = (console.log)) {
        this.getConnection().then((conn) => {
            conn.query(`${query}`).then((response) => {
                callback(response);
            }).then(async () => {
                await conn.end();
            }).catch((err) => {
                console.log(err);
                error(Errors.queryError(err.code));
            })
        }).catch((err) => {
            error(Errors.connectionError(err.code));
        });
    }

    public static queryValues(query: string, values: string[], callback: (response) => void, error = (console.log)) {
        this.getConnection().then((conn) => {
            conn.query(`${query}`, values).then((response) => {
                callback(response);
            }).then(async () => {
                await conn.end();
            }).catch((err) => {
                console.log(err);
                error(Errors.queryError(err.code));
            })
        }).catch((err) => {
            error(Errors.connectionError(err.code));
        });
    }

}
