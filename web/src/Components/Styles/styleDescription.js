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
    },
    buttonRight: {
        fontFamily: "Dongle",
        background: "black",
        color: "white",
        borderRadius: "30px",
        fontSize: "60px",
        position: "absolute",
        top: "0",
        right: "0",
        textAlign: "center",
        justifyContent: "center",
        marginRight: "30px",
        marginTop: "10px",
    },
    description: {
        paddingRight: "20px",
        paddingLeft: "20px",
        fontSize: "30px",
        fontFamily: "Mochiy Pop P One",
    },
    rect: {
        display: "flex",
        alignItems: "center",
        margin: "auto auto",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: "30px",
        width: "800px",
        height: "800px",
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
        margin: "200px",
    },
    littleSpace: {
        margin: "20px",
    }
});

export default useStyles;