import bcrypt = require('bcrypt');

export default class EncryptService {

    private readonly data: string;

    constructor(data: string) {
        this.data = data;
    }

    public hash(result: (hash) => void): void {
        bcrypt.genSalt(10, (err, salt) => {
            if (err)
                return result(undefined);
           bcrypt.hash(this.data, salt, (err, hash) => {
               if (err)
                   return result(undefined);
               result(hash);
           })
        });
    }

    public compare(hash: string, result: (result: boolean) => void): void {
        bcrypt.compare(this.data, hash, (err, same) => {
            if (err)
                result(false);
            result(same);
        })
    }

}
