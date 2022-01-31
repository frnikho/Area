// eslint-disable-next-line
import style from "../../Resources/CSS/Font.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    font: {
        fontFamily: "Dongle",
    },
    background: {
        backgroundColor: "#8c8c8c",
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
    menuRight: {
        paddingLeft: "12px",
        paddingRight: "12px",
        fontFamily: "Dongle",
        color: "white",
        borderRadius: "30px",
        fontSize: "60px",
        position: "relative",
        textAlign: "right",
        justifyContent: "right",
        alignItems: "right",
        display: "flex",
        flex: "1",
    },
    titleLeft: {
        fontFamily: "Dongle",
        fontSize: "60px",
        position: "relative",
        textAlign: "left",
        justifyContent: "left",
        marginLeft: "30px",
        display: "flex",
        flex: "2",
    },
    title: {
        justifyContent: "justify",
        alignItems: "justify",
        display: "flex",
    },
    space: {
      margin: "150px",
    }
});

export default useStyles;