import style from "../CSS/Font.css";
import { makeStyles } from "@material-ui/core/styles"


const Style = {
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
};

// export default function useStyles(color) {
//     return makeStyles({
//         rect: {
//             alignItems: "center",
//             justifyContent: "center",
//             display: "flex",
//             textAlign: "center",
//             borderRadius: "30px",
//             width: "500px",
//             height: "100px",
//         },
//         font: {
//             fontFamily: "Dongle",
//         },
//         color: {
//             background: "green",
//         },
//         description: {
//             color: "white",
//             fontSize: "50px",
//         }
//     });
// }