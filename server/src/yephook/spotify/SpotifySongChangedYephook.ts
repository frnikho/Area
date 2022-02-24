import {Action, ActionType, Applet} from "../../models/Applet";
import AppletController from "../../controllers/AppletController";
import {ingredientsHook} from "../../utils/Ingredients";
import ContextController from "../../controllers/ContextController";
import {Services} from "../../models/Services";
import SpotifyService from "../../services/external/SpotifyService";
import SpotifyYepHook from "../SpotifyYepHook";
import Logger from "../../utils/Logger";

export default class SpotifySongChangedYephook extends SpotifyYepHook {

    private lastPlayedSong: string = "";

    constructor(applet: Applet) {
        super(45, applet);
        Logger.d(`new spotify song changed yephook for applet '${applet.uuid}'`);
        this.onDataChanged = this.onDataChanged.bind(this);
    }

    checkDataChanged(first: boolean) {
        const action: Action = this.getApplet().action;
        const contextUuid = action.parameters.find((parameters) => parameters['name'] === 'context_uuid')['value'];
        const userUuid = action.parameters.find((parameters) => parameters['name'] === 'user_uuid')['value'];
        new ContextController().getContextByUuid(userUuid, Services.SPOTIFY, contextUuid, ((context, error) => {
            if (error)
                return Logger.e(error);
            new SpotifyService().getCurrentPlayingSong(context, userUuid, ((data, spotifyError) => {
                if (spotifyError)
                    return Logger.e(spotifyError)
                if (data === undefined || data === null || data['item'] === undefined)
                    return;
                if (this.lastPlayedSong !== data['item']['id']) {
                    this.onDataChanged(first, data['item'])
                }
            }));
        }));
    }

    onDataChanged(first, track) {
        if (first) {
            this.lastPlayedSong = track['id'];
        } else {
            this.lastPlayedSong = track['id'];
            new AppletController().callReactions(this.getApplet(), ingredientsHook(track, ActionType.spotify_song_changed), (error) => {
                if (error)
                    console.log(error);
            })
        }
    }
}
