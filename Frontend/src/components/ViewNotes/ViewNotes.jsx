import React from 'react'
import styles from './ViewNotes.module.css'
import headImage from "../../assets/frontImage.png"
import Lock from "../../assets/lock.png"

const ViewNotes = () => {
    return (
        <div className={styles.viewNotes}>
            <div className={styles.main_content}>
                <img src={headImage} alt="head image" className={styles.image} />
                <p className={styles.header}>Pocket Notes</p>
                <p>Send and receive messages without keeping your phone online.
                    Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                <div className={styles.footer}>
                    <img src={Lock} alt
                        ="lock" className={styles.lock} />
                    <p className={styles.footer_text}>end-to-end encrypted</p>
                </div>
            </div>
        </div>
    )
}

export default ViewNotes