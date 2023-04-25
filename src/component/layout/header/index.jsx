import { AutoCenter, Image, NavBar } from 'antd-mobile';
import React from 'react';
import styles from './header.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

export default function Header() {
 const { id } = useParams();
 const navigate = useNavigate();
 const onHome = () => {
  navigate('/');
 };
 return (
  <NavBar
   backArrow={id ? true : false}
   className={styles.pokedex__header}
   onBack={onHome}
  >
   <div className={styles.pokedex__header__image}>
    <AutoCenter>
     <Image src="/logo.svg" width={110} lazy={true} />
    </AutoCenter>
   </div>
  </NavBar>
 );
}
