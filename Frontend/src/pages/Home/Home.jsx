import React from 'react'
import styles from './home.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
// import ViewNotes from '../../components/ViewNotes/ViewNotes'
import Notes from "../../components/Notes/Note"

const Home = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    window.location.href = '/signup';
  }
  return (
    <div className={styles.main_content}>
      <Sidebar/>
      {/* <ViewNotes /> */}
      <Notes />
    </div>
  )
}

export default Home