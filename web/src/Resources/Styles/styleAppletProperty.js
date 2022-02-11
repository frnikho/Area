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
        fontSize: '45px',
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
    }
};

export default useStyles;