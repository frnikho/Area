import axios from 'axios';

type success = (data: any) => void;
type error = (error: string) => void;

export default class TwitterService {

    /**
     * Send Tweet
     *
     * @param userAccesToken - Given during OAuth
     * @param message - Tweet message
     * @param successFunc - success callback function
     * @param errorFunc - error callback function
     */
    public SendTweet(userAccesToken: string, message: string, successFunc: success, errorFunc: error) {
        const headers = {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + userAccesToken
            }
        };

        let body = {
            text: message
        }

        axios.post("https://api.twitter.com/2/tweets", body, headers).then((response) => {
            return successFunc("Tweet Sended");
        }).catch((err) => {
            return errorFunc(err);
        })

    }
}