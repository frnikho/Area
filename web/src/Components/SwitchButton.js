import React from "react";
import { motion } from "framer-motion";
import "../Resources/Styles/SwitchButton.css"

export default function SwitchButton({ isOn, ...props }) {
    const className = `switch ${isOn ? "on" : "off"}`;

    return (
        <motion.div animate className={className} {...props}>
            <motion.div animate />
        </motion.div>
    );
}