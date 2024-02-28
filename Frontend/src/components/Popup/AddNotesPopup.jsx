import React, { useRef, useState, useEffect } from 'react';
import styles from './AddNotesPopup.module.css';
import axios from 'axios';

const AddNotesPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        groupName: '',
        selectedColor: ''
    });
    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose();
        }
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            groupName: event.target.value
        });
    };

    const handleColorSelect = (color) => {
        setFormData({
            ...formData,
            selectedColor: color
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.post("https://modern-notes-app-urwh.onrender.com//create-group", {
                userId: userId,
                groupName: formData.groupName,
                groupColor: formData.selectedColor
            });
            alert(response.data.message);
            window.location.reload();
            onClose();
        }
        catch (error) {
            console.error(error);
            alert('Error creating group');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.backdrop}>
            <div ref={popupRef} className={styles.popup}>
                <span className={styles.heading}>Create New group</span>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.form_group}>
                        <label htmlFor="groupName">Group Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="groupName"
                            value={formData.groupName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label>Choose Colour</label>
                        <div className={styles.colors}>
                            <div
                                className={`${styles.color_circle} ${styles.violet} ${formData.selectedColor === '#b38bfa' ? styles.selected : ''}`}
                                style={{ borderColor: formData.selectedColor === '#b38bfa' ? '#333' : 'transparent' }}
                                onClick={() => handleColorSelect('#b38bfa')}
                            ></div>
                            <div
                                className={`${styles.color_circle} ${styles.pink} ${formData.selectedColor === '#ff79f2' ? styles.selected : ''}`}
                                style={{ borderColor: formData.selectedColor === '#ff79f2' ? '#333' : 'transparent' }}
                                onClick={() => handleColorSelect('#ff79f2')}
                            ></div>
                            <div
                                className={`${styles.color_circle} ${styles.cyan} ${formData.selectedColor === '#43e6fc' ? styles.selected : ''}`}
                                style={{ borderColor: formData.selectedColor === '#43e6fc' ? '#333' : 'transparent' }}
                                onClick={() => handleColorSelect('#43e6fc')}
                            ></div>
                            <div
                                className={`${styles.color_circle} ${styles.golden} ${formData.selectedColor === '#f19576' ? styles.selected : ''}`}
                                style={{ borderColor: formData.selectedColor === '#f19576' ? '#333' : 'transparent' }}
                                onClick={() => handleColorSelect('#f19576')}
                            ></div>
                            <div
                                className={`${styles.color_circle} ${styles.deep_blue} ${formData.selectedColor === '#0047ff' ? styles.selected : ''}`}
                                style={{ borderColor: formData.selectedColor === '#0047ff' ? '#333' : 'transparent' }}
                                onClick={() => handleColorSelect('#0047ff')}
                            ></div>
                            <div
                                className={`${styles.color_circle} ${styles.light_blue} ${formData.selectedColor === '#6591ff' ? styles.selected : ''}`}
                                style={{ borderColor: formData.selectedColor === '#6591ff' ? '#333' : 'transparent' }}
                                onClick={() => handleColorSelect('#6591ff')}
                            ></div>
                        </div>
                    </div>

                    <button type="submit" className={styles.button}>Create</button>
                </form>
                {/* <button onClick={onClose}>Close</button> */}
            </div>
        </div>
    );
};

export default AddNotesPopup;
