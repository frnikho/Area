export default abstract class YepHook {

    protected checkTime: number;

    protected constructor(checkTime: number) {
        this.checkTime = checkTime;
    }

    public abstract check(): void;

    public abstract onDataChanged(data: object): void;
}
