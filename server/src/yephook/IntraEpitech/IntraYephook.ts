import axios from 'axios';

interface Changed {
    userEmail: string,
    data?
}

export default abstract class IntraYephook {

    private timer: NodeJS.Timer;
    private authUrl: string;
    private dataToCheck: string;
    private registry: Changed[] = [];
    private readonly checkTimeInSeconds;
    private readonly userEmail: string;

    protected constructor(checkTimeInSeconds: number, userEmail: string, authUrl: string, dataToCheck: string) {
        this.checkTimeInSeconds = checkTimeInSeconds;
        this.userEmail = userEmail;
        this.authUrl = authUrl;
        this.dataToCheck = dataToCheck;
    }

    public startChecking(): void {
        this.check(true);
        this.timer = setInterval(() => this.check(false), this.checkTimeInSeconds * 1000);
    }

    private check(first) {
        axios.get(this.authUrl).then((response) => {
            let data = response.data[this.dataToCheck.split('.')[0]];

            this.dataToCheck.split('.').forEach((key, index) => {
                if (index === 0)
                    return;
                data = key === '{key}' ? data[0] : data[key];
            });
            if (first)
                this.registry.push({
                    userEmail: this.userEmail,
                    data: data
                })
            else
                this.checkDataHasChanged(data, response.data);
        }).catch((ex) => {
            console.log(ex);
        })
    }

    private checkDataHasChanged(data, responseData) {
        this.registry.map((entry) => {
            if (entry.userEmail === this.userEmail) {
                if (data !== entry.data) {
                    entry.data = data;
                    this.onDataChanged(data, responseData);
                } else {
                    this.onDataNotChanged(data)
                }
            }
        })
    }

    public abstract onDataChanged(oldData, responseData): void;


    public abstract onDataNotChanged(data);

    public stopCheck(): void {
        clearInterval(this.timer);
    }

}
