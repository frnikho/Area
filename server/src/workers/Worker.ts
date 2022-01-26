export default abstract class Worker {

    private timer: NodeJS.Timer;

    public start() {
        if (this.getTime() <= 0)
            throw "Invalid time for Worker ! (must be > 0)"
        this.timer = setInterval(() => this.run(), this.getTime() * 1000);
    }

    public stop() {
        clearInterval(this.timer);
    }

    public abstract getTime(): number;

    public abstract run();

}

