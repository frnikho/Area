// eslint-disable-next-line
import style from "../CSS/Font.css";

const useStyles = {
    font: {
        fontFamily: "Dongle",
    },
    background: {
        backgroundColor: "#8c8c8c",
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        display: "flex",
        fontFamily: "Anton",
        color: "white",
        fontSize: "40px",
    },
    roundButtonFull: {
        paddingTop: "6px",
        background: "black",
        height: "50%",
        borderRadius: '50px',
        borderColor: 'white',
        fontFamily: 'Dongle',
        fontSize: '35px',
        textTransform: "none",
        color: "white"
    },
    roundButtonEmpty: {
        paddingLeft: "30px",
        paddingRight: "30px",
        paddingTop: "6px",
        background: "transparent",
        borderRadius: '40px',
        borderColor: "black",
        fontFamily: 'Dongle',
        fontSize: '25px',
        textTransform: "none",
        color: "black",
    },
    space: {
        margin: "125px",
    },
    bar: {
        justifyContent: "justify",
        alignItems: "justify",
        whiteSpace: "nowrap",
        display: "flex",
    },
    menuRight: {
        justifyContent: "right",
        alignItems: "right",
        display: "flex",
        flex: "1",
        position: "relative",
        whiteSpace: "nowrap",
        textAlign: "right",
    },
    menuLeft: {
        whiteSpace: "nowrap",
        justifyContent: "left",
        alignItems: "left",
        display: "flex",
        flex: "1",
        position: "relative",
        textAlign: "left",
    },
    edit: {
        fontSize: "20px",
        fontFamily: "Anton",
        color: "white",
        textDecoration: "underline",
        textTransform: "none",
    },
};

export default useStyles;