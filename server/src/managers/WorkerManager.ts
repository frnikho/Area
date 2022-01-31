import Worker from "../workers/Worker";
import IntraWorker from "../workers/IntraWorker";
import SpotifyWorker from "../workers/SpotifyWorker";

export default class WorkerManager {

    private static instance: WorkerManager = null;
    private workers: Worker[];

    protected constructor() {
        this.workers = [];
        this.register();
    }

    private register() {
        this.workers.push(new IntraWorker());
        this.workers.push(new SpotifyWorker());
    }

    public startWorkers() {
        this.workers.forEach((worker) => worker.start());
    }

    public stopWorkers() {
        this.workers.forEach((worker) => worker.stop());
    }

    public static get(): WorkerManager {
        if (WorkerManager.instance === null)
            WorkerManager.instance = new WorkerManager();
        return WorkerManager.instance;
    }


}
