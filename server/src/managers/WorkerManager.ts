import Worker from "../workers/Worker";
import IntraWorker from "../workers/IntraWorker";
import SpotifyWorker from "../workers/SpotifyWorker";
import {isProd} from "../utils/Node";
import Logger from "../utils/Logger";

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
        if (!isProd())
            Logger.d("WorkerManager => starting all workers");
        this.workers.forEach((worker) => worker.start());
    }

    public stopWorkers() {
        if (!isProd())
            Logger.d("WorkerManager => stopping all workers");
        this.workers.forEach((worker) => worker.stop());
    }

    public static get(): WorkerManager {
        if (WorkerManager.instance === null)
            WorkerManager.instance = new WorkerManager();
        return WorkerManager.instance;
    }


}
