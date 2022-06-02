import React from 'react';
import styles from "./modal.module.css"
import {motion, AnimatePresence} from "framer-motion";
import {XIcon} from "@heroicons/react/solid";

const Modal = ({active, setActive, children}) => {

    const modalVariants = {
        hidden: {
            y: 200,
            opacity: 0,
            transition: {duration: 0.1}
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {duration: 0.1}

        },
        exit: {
            scale: 0,
            opacity: 0,
            transition: {duration: 0.3}
        }
    }

    return (
        <AnimatePresence onExitComplete={() => setActive(false)}>
            {
                active &&
                <motion.div className={styles.modal}
                            onClick={() => setActive(false)}
                            variants={modalVariants} initial='hidden' animate='visible' exit='exit'  >
                    <div
                        className={styles.modal_content}
                        onClick={e => e.stopPropagation()}
                    >
                        {children}
                    </div>

                </motion.div>
            }
        </AnimatePresence>
    );
}

export default Modal;