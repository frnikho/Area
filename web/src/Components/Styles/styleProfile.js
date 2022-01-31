// eslint-disable-next-line
import style from "../../Resources/CSS/Font.css";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    buttonMenu: {
        fontFamily: 'Dongle',
        fontSize: '60px',
        textTransform: "none",
        color: "black"
    },
    accountContainer: {
        marginLeft: "700px",
        fontFamily: "Dongle",
        fontSize: "85px",
    },
    little: {
        fontSize: "40px",
    },
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
        fontSize: "125px",
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
    title: {
        justifyContent: "justify",
        alignItems: "justify",
        display: "flex",
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
        margin: "150px",
    }
});

export default useStyles;