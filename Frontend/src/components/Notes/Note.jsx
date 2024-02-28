import React, { useState, useEffect } from 'react';
import styles from './Note.module.css';
import { useLocation } from 'react-router-dom';
import ViewNotes from '../ViewNotes/ViewNotes';
import DeleteIcon from '../../assets/bin.png';

const Note = () => {
  const location = useLocation();
  const currentGroupId = location.state?.groupId || null;
  const [groupState, setGroupState] = useState({
    notes: [],
    groupDetails: {},
    error: null,
    fetchError: null,
    addNoteError: null
  });
  const { notes, groupDetails, error, fetchError, addNoteError } = groupState;
  const [newNote, setNewNote] = useState('');

  const fetchGroupNotes = async (groupId) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`https://modern-notes-app-urwh.onrender.com/get-group-notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupId: groupId, userId: userId }),
      });
      const data = await response.json();
      console.log(data);
      setGroupState({
        ...groupState,
        groupDetails: data.groupDetails,
        notes: data.groupDetails.notes,
        fetchError: null,
      });
    } catch (error) {
      console.error('Error fetching group notes:', error);
      setGroupState({
        ...groupState,
        fetchError: 'Error fetching group notes. Please try again.',
      });
    }
  };

  useEffect(() => {
    if (currentGroupId) {
      fetchGroupNotes(currentGroupId);
    }
  }, [currentGroupId]);

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    return words.map((word) => word[0]).join('').toUpperCase();
  };

  const handleAddNote = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('https://modern-notes-app-urwh.onrender.com/add-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, groupId: currentGroupId, note: newNote }),
      });
      const data = await response.json();
      console.log(data);
      setGroupState({
        ...groupState,
        notes: [...notes, newNote],
        addNoteError: null,
      });
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
      setGroupState({
        ...groupState,
        addNoteError: 'Error adding note. Please try again.',
      });
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('https://modern-notes-app-urwh.onrender.com/delete-group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, groupId: currentGroupId }),
      });
      const data = await response.json();
      console.log(data);
      setGroupState({
        ...groupState,
        notes: [],
        groupDetails: {},
        fetchError: null,
      });
    } catch (error) {
      console.error('Error deleting group:', error);
      setGroupState({
        ...groupState,
        fetchError: 'Error deleting group. Please try again.',
      });
    }
  }


  return (
    <>
      {currentGroupId ? (
        <div className={styles.main_content}>
          <div className={styles.header}>
            <div>
              <div>
                <div className={styles.avatar} style={{ backgroundColor: groupDetails.color, font: "bold", fontWeight: "600" }}>
                  {getInitials(groupDetails.name)}
                </div>
                <div>
                </div>
              </div>
            </div>
            <p className={styles.heading_text}>{groupDetails.name}</p>
            {/* <div className={styles.deleteBtn}>
              <img className={styles.deleteIcon}  src={DeleteIcon} alt="" />
            </div> */}
          </div>

          <div className={styles.all_notes}>
            {fetchError && <p className={styles.error}>{fetchError}</p>}
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <div key={index} className={styles.note}>
                  <p>{note}</p>
                </div>
              ))
            ) : (
              <p style={{ color: "#cd5d00" }}>No notes available 😢 Add your first note below</p>
            )}
            {newNote && (
              <div className={styles.note}>
                <p>{newNote}</p>
              </div>
            )}
          </div>
          <div className={styles.input_area}>
            <textarea
              className={styles.textBox}
              type="text"
              placeholder="Type your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button className={styles.submitButton} onClick={handleAddNote} disabled={!newNote.trim()}>
              Add Note
            </button>
            {addNoteError && <p className={styles.error}>{addNoteError}</p>}
          </div>
        </div>
      ) : (
        <ViewNotes />
      )}
    </>
  );
};

export default Note;
