import { Modal, TabBar } from 'antd-mobile';
import { AppOutline, InformationCircleOutline } from 'antd-mobile-icons';
import React, { useState } from 'react';
import styles from './footer.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
 const [activeMenu, setactiveMenu] = useState(undefined);
 const [visible, setvisible] = useState(false);
 const navigate = useNavigate();
 const showModal = () => {
  setvisible(true);
  setactiveMenu('/about');
 };

 const hideModal = () => {
  setvisible(false);
  setactiveMenu('/');
 };

 const Home = () => {
  navigate('/');
 };

 const tabs = [
  {
   key: '/',
   title: 'Home',
   icon: <AppOutline onClick={Home} />
  },
  {
   key: '/about',
   title: 'About',
   icon: <InformationCircleOutline onClick={showModal} />
  }
 ];

 const location = useLocation();
 const { pathname } = location;

 return (
  <div className={styles.pokedex__footer}>
   <TabBar activeKey={activeMenu ? activeMenu : pathname}>
    {tabs.map((item) => (
     <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
    ))}
   </TabBar>
   <Modal
    visible={visible}
    content="人在天边月上明"
    onClose={hideModal}
    closeOnMaskClick={true}
   />
  </div>
 );
}