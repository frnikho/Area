import {SystemDialog} from "../SystemDialog";
import {AuthContext} from "../../../Contexts/AuthContext";
import {Box, Button} from "@mui/material";
import {FaGithub} from "react-icons/fa";

export default class GithubRepositoryDeletedDialog extends SystemDialog {

    static contextType = AuthContext;

    constructor() {
        super();
        this.state = {
            isLogged: false,
        }
    }

    componentDidMount() {
        this.auth = this.context;
    }

    loginToGithub() {

    }

    renderDialogContent() {
        return (
            <Box sx={{my: 2}}>
                <Button variant={"outlined"} endIcon={<FaGithub/>}>Login to github</Button>
            </Box>
        )
    }
}
