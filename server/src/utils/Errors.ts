export default class Errors {

    public static queryError(code: string): String {
        if (code === 'ER_NO_SUCH_TABLE') {
            console.error('DB Error:', code);
            return 'Database query error, contact service admin !';
        }
        return code;
    }

    public static connectionError(code: string): String {
        if (code === 'ECONNREFUSED')
            return 'Database connection error, contact service admin !'
        return "";
    }

}
