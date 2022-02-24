import {Applet} from "../models/Applet";

export default abstract class SpotifyYepHook {

    private readonly applet: Applet;
    private countdown: NodeJS.Timer;
    private readonly timeBetweenCheck: number;

    protected constructor(timeBetweenCheck: number, applet: Applet) {
        this.applet = applet;
        this.timeBetweenCheck = timeBetweenCheck;
    }

    public getApplet(): Applet {
        return this.applet;
    }

    public getTimeBetweenCheck(): number {
        return this.timeBetweenCheck;
    }

    public start() {
        this.checkDataChanged(true);
        this.countdown = setInterval(() => this.checkDataChanged(false), this.getTimeBetweenCheck() * 1000);
    }

    public stop() {
        if (this.countdown !== undefined)
            clearInterval(this.countdown);
    }

    public abstract checkDataChanged(first: boolean);

}
