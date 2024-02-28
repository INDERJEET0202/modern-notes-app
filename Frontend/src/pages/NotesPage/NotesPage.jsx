import React, { useState, useEffect } from 'react';
import styles from "./NotesPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Note from "../../components/Notes/Note";
import SidebarPhone from '../../components/Sidebar/SidebarPhone';

const NotesPage = () => {
  const [mobileView, setMobileView] = useState(false);

  const userId = localStorage.getItem('userId');
  if (!userId) {
    window.location.href = '/signup';
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 430) {
        setMobileView(true);
      } else {
        setMobileView(false); 
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {!mobileView ? (
        <div className={styles.main_content}>
          {<Sidebar />}
          {<Note />}
        </div>
      ) : (
        <div className={styles.phone_content}>
          <SidebarPhone />
        </div>
      )
      }
    </>
  );
};

export default NotesPage;
