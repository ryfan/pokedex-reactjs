import { Modal, TabBar, Toast } from 'antd-mobile';
import {
 AntOutline,
 AppOutline,
 HeartOutline,
 InformationCircleOutline,
 SearchOutline
} from 'antd-mobile-icons';
import React, { useState } from 'react';
import styles from './footer.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function Footer({ baseColor }) {
 const { id } = useParams();
 const location = useLocation();
 const { pathname } = location;
 const [activeMenu, setactiveMenu] = useState(undefined);
 const [visible, setvisible] = useState(false);
 const navigate = useNavigate();
 const showModal = () => {
  setvisible(true);
  setactiveMenu('/about');
 };

 const hideModal = () => {
  setvisible(false);
  id ? setactiveMenu(`/pokemon/${id}`) : setactiveMenu(pathname);
 };

 const Home = () => {
  navigate('/');
 };

 const Search = () => {
  navigate('/search');
 };

 const tabs = [
  {
   key: '/',
   title: 'Home',
   icon: <AppOutline onClick={Home} />
  },
  {
   key: '/search',
   title: 'Search',
   icon: <SearchOutline onClick={Search} />
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
           content: 'Select pokemon first 👋',
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

 return (
  <div
   className={styles.pokedex__footer}
   style={baseColor ? { '--adm-color-primary': baseColor } : undefined}
  >
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
