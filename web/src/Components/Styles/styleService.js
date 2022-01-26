import style from "../../Resources/CSS/Font.css";
import { makeStyles } from "@material-ui/core/styles"

export default function useStyles(color) {
    return makeStyles({
        rect: {
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            textAlign: "center",
            borderRadius: "30px",
            width: "500px",
            height: "100px",
        },
        font: {
            fontFamily: "Dongle",
        },
        color: {
            background: "green",
        },
        description: {
            color: "white",
            fontSize: "50px",
        }
    });
}