import { Modal, TabBar, Toast } from 'antd-mobile';
import {
 AntOutline,
 AppOutline,
 HeartOutline,
 InformationCircleOutline
} from 'antd-mobile-icons';
import React, { useState } from 'react';
import styles from './footer.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function Footer() {
 const { id } = useParams();
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
   key: `/pokemon/${id}`,
   title: 'Detail',
   icon: (
    <AntOutline
     onClick={
      id
       ? null
       : () => {
          Toast.show({
           content: 'Select pokemon first!',
           position: 'bottom'
          });
         }
     }
    />
   )
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
   <TabBar activeKey={activeMenu ? activeMenu : pathname} safeArea={true}>
    {tabs.map((item) => (
     <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
    ))}
   </TabBar>
   <Modal
    title="Credits"
    visible={visible}
    content={
     <div>
      <p>Author by</p>
      <p>Ryfan Aditya Indra</p>
      <p>Software Engineer Frontend</p>
      <br />
      <p>Restful API Pokédex by</p>
      <p>PokéAPI</p>
      <br />
      <p>
       Made with <HeartOutline /> at Bogor
      </p>
     </div>
    }
    onClose={hideModal}
    closeOnMaskClick={true}
   />
  </div>
 );
}
