import React from 'react'
import { ListItem } from '../Atoms/list'
import styles from './navbar.module.css'
const Navbar = () => {
  return (
    <div className={styles.parent}>
      
      <ul>
        {
            ListItem.map((elem)=>{
                return <li>{elem}</li>
            })
        }
      </ul>
    </div>
  )
}

export default Navbar
