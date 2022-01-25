import style from "../../Resources/CSS/Font.css";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
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
    green: {
        background: "green",
    },
    red: {
        background: "red",
    },
    blue: {
        background: "blue",
    },
    orange: {
        background: "orange",
    },
    orangeRed: {
        background: "orangered",
    },
    yellow: {
        background: "yellow",
    },
    description: {
        color: "white",
        fontSize: "50px",
    }
});

export default useStyles;