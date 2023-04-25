import React, { Fragment, useEffect, useState } from 'react';
import Meta from '../../utils/meta';
import Base from '../../component/layout/base';
import CardComponent from '../../component/main/card';
import { AutoCenter, Card, DotLoading, Grid, Picker } from 'antd-mobile';
import { readDetailPokemon, readListPokemon } from '../../services/fetch';
import { map, orderBy } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { capitalize, lowercase } from '../../utils/string';
import styles from './main.module.scss';

export default function Main() {
 const [listPokemon, setlistPokemon] = useState([]);
 const [Loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const fetchlistPokemon = async () => {
  try {
   setLoading(true);
   const params = {
    limit: 20,
    offset: 0
   };
   const getListData = await readListPokemon(params);
   const listDetailPokemon = [];
   map(getListData.results, async (lP) => {
    const getDetailData = await readDetailPokemon(lP.name);
    listDetailPokemon.push(getDetailData);
   });
   setlistPokemon(listDetailPokemon);
   setTimeout(() => {
    setLoading(false);
   }, 1000);
  } catch (error) {
   console.log(error);
  }
 };

 const onClickPokemon = (id) => {
  navigate(`/pokemon/${id}`);
 };

 const [visible, setVisible] = useState(false);
 const [searchPokemon, setsearchPokemon] = useState([]);
 const [value, setValue] = useState(undefined);
 const [loadingList, setloadingList] = useState(false);
 const fetchlistSearchPokemon = async () => {
  try {
   setVisible(true);
   setloadingList(true);
   const params = {
    limit: 100000,
    offset: 0
   };
   const getListData = await readListPokemon(params);
   map(getListData.results, (item) => {
    item.label = capitalize(item.name);
    item.value = capitalize(item.name);
    delete item.name;
    delete item.url;
   });
   setsearchPokemon([getListData.results]);
   setTimeout(() => {
    setloadingList(false);
   }, 1000);
  } catch (error) {
   console.log(error);
   setTimeout(() => {
    setloadingList(false);
   }, 1000);
  }
 };

 useEffect(() => {
  async function fetchData() {
   if (value) {
    const listDetailPokemon = [];
    const getDetailData = await readDetailPokemon(lowercase(value));
    listDetailPokemon.push(getDetailData);
    setlistPokemon(listDetailPokemon);
   } else {
    await fetchlistPokemon();
   }
  }
  fetchData();
 }, [value]);

 return (
  <Fragment>
   <Meta title="Home" />
   <Base searchPokemon={fetchlistSearchPokemon}>
    <div className={styles.pokedex__main}>
     <Grid columns={1} gap={12}>
      <Grid.Item>
       <Card title="Here's your Pokémon" className={styles.pokedex__main__card}>
        {Loading ? (
         <Grid columns={1}>
          <Grid.Item>
           <AutoCenter>
            <span>Loading</span>
            <DotLoading />
           </AutoCenter>
          </Grid.Item>
         </Grid>
        ) : (
         <Grid columns={2} gap={12}>
          {map(orderBy(listPokemon, ['id'], ['asc']), (lP, idx) => (
           <Grid.Item key={idx}>
            <CardComponent
             id={String(lP.id).padStart(3, '0')}
             name={lP.name}
             types={lP.types}
             image={lP.sprites.other.dream_world.front_default}
             onclick={onClickPokemon}
            />
           </Grid.Item>
          ))}
          <Grid.Item>
           <Picker
            columns={searchPokemon}
            visible={visible}
            onClose={() => {
             setVisible(false);
            }}
            value={value}
            onConfirm={(v) => {
             setValue(v);
            }}
            loading={loadingList}
            destroyOnClose={true}
            confirmText="Select"
            cancelText="Cancel"
           />
          </Grid.Item>
         </Grid>
        )}
       </Card>
      </Grid.Item>
     </Grid>
    </div>
   </Base>
  </Fragment>
 );
}
