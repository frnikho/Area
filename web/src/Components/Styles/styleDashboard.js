// eslint-disable-next-line
import style from "../../Resources/CSS/Font.css";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    font: {
        fontFamily: "Dongle",
    },
    background: {
        backgroundColor: "#8c8c8c",
    },
    container: {
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "Dongle",
        fontSize: "60px",
    },
    menuRight: {
        paddingLeft: "12px",
        paddingRight: "12px",
        fontFamily: "Dongle",
        color: "white",
        borderRadius: "30px",
        fontSize: "60px",
        position: "absolute",
        top: "0",
        right: "0",
        textAlign: "center",
        justifyContent: "center",
        marginRight: "30px",
        // marginTop: "10px",
    },
    titleRight: {
        fontFamily: "Dongle",
        fontSize: "60px",
        position: "absolute",
        top: "0",
        right: "0",
        textAlign: "center",
        justifyContent: "center",
        marginRight: "30px",
    },
    titleLeft: {
        fontFamily: "Dongle",
        fontSize: "60px",
        position: "absolute",
        top: "0",
        left: "0",
        textAlign: "center",
        justifyContent: "center",
        marginLeft: "30px",
    },
    space: {
        margin: "125px",
    }
});

export default useStyles;