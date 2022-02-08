import {SystemDialog} from "../SystemDialog";
import {AuthContext} from "../../../Contexts/AuthContext";

export default class GithubRepositoryDeletedDialog extends SystemDialog {

    static contextType = AuthContext;

    constructor() {
        super();
    }

    componentDidMount() {
        this.auth = this.context;
    }

    renderDialogContent() {
        return (
            <h1>
                ABCDEF
            </h1>
        )
    }
}
