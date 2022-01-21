import jsonwebtoken = require('jsonwebtoken');

export default class JWTService {

    private readonly payload: string | object | Buffer;

    constructor(payload: string | object | Buffer) {
        this.payload = payload;
    }

    public sign(): string {
        return jsonwebtoken.sign(this.payload, process.env.JWT_SECRET);
    }

    public static verify(token: string) {
        return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    }

}
