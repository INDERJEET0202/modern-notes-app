import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import Avatar from "../../assets/avatar.png";
import AddIcon from "../../assets/add.svg";
import AddNotesPopup from "../Popup/AddNotesPopup";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NotePhone from '../../components/Notes/NotePhone';

const Sidebar = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        const fetchNotes = async () => {
            try {
                const response = await fetch(`https://modern-notes-app-urwh.onrender.com/get-groups`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });
                const data = await response.json();
                setNotes(data.groups);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching notes:', error);
                setIsLoading(false);
            }
        };

        fetchNotes();
    }, []);

    const getInitials = (name) => {
        const words = name.split(' ');
        return words.map(word => word[0]).join('').toUpperCase();
    };

    const goToNotesPage = (groupId) => {
        setClicked(true);
        navigate('/notes', { state: { groupId: groupId } });
    };

    const handleBackClick = () => {
        setClicked(false);
    };

    return (
        <>
            {!clicked && (
                <div className={styles.sidebar}>
                    <div className={styles.header}>
                        <Link to={"/"} style={{ textDecoration: "none" }}>Pocket Notes</Link>
                    </div>
                    <div className={styles.all_notes_title}>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : !notes ? (
                            <div>No notes created</div>
                        ) : (
                            notes.map((note, index) => (
                                <div key={index} className={styles.menu} onClick={() => goToNotesPage(note._id)}>
                                    <div className={styles.avatar} style={{ backgroundColor: note.color, fontWeight: "600" }}>{getInitials(note.name).toUpperCase()}</div>
                                    <div className={styles.title}>
                                        <p>{note.name}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={styles.addNotesBtnContainer}>
                        <img
                            className={styles.addNotesBtn}
                            src={AddIcon}
                            alt="add icon"
                            onClick={() => setShowPopup(true)}
                        />
                    </div>
                    {showPopup && <AddNotesPopup onClose={() => setShowPopup(false)} />}
                </div>
            )}
            {clicked && <NotePhone onBackClick={handleBackClick} />}
        </>
    );
};

export default Sidebar;
