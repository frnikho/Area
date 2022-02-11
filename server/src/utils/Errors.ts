export default class Errors {

    public static queryError(code: string): string {
        if (code === 'ER_NO_SUCH_TABLE') {
            console.error('DB Error:', code);
            return 'Database query error, contact service admin !';
        }
        return code;
    }

    public static connectionError(code: string): string {
        if (code === 'ECONNREFUSED')
            return 'Database connection error, contact service admin !'
        return "";
    }

}
