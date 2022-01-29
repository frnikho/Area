import axios from 'axios';

type success = (data: any) => void;
type error = (error: string) => void;

export default class TwitterService {

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
            console.log(response);
            return successFunc(response);
        }).catch((err) => {
            return errorFunc(err);
        })

    }
}