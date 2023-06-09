import React, { Fragment, useEffect, useState } from 'react';
import Meta from '../../utils/meta';
import Base from '../../component/layout/base';
import CardComponent from '../../component/search/card';
import {
 AutoCenter,
 Button,
 Card,
 DotLoading,
 Grid,
 Picker,
 Space
} from 'antd-mobile';
import { readDetailPokemon, readListPokemon } from '../../services/fetch';
import { map, orderBy } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { capitalize, lowercase } from '../../utils/string';
import styles from './search.module.scss';
import { UndoOutline } from 'antd-mobile-icons';
import { background } from '../../utils/variable';

export default function Search() {
 const [listPokemon, setlistPokemon] = useState([]);
 const navigate = useNavigate();

 const onClickPokemon = (id) => {
  navigate(`/pokemon/${id}`);
 };

 const [visible, setVisible] = useState(false);
 const [searchPokemon, setsearchPokemon] = useState([]);
 const [value, setValue] = useState(undefined);
 const [loadingList, setloadingList] = useState(false);
 const fetchlistSearchPokemon = async () => {
  try {
   setLoading(true);
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

 const [loading, setLoading] = useState(true);
 useEffect(() => {
  async function fetchData() {
   if (value) {
    setLoading(true);
    const listDetailPokemon = [];
    const getDetailData = await readDetailPokemon(lowercase(value));
    listDetailPokemon.push(getDetailData);
    setlistPokemon(listDetailPokemon);
    setLoading(false);
   } else {
    await fetchlistSearchPokemon();
   }
  }
  fetchData();
 }, [value]);

 return (
  <Fragment>
   <Meta title="Search" />
   <Base
    searchPokemon={fetchlistSearchPokemon}
    baseColor={
     listPokemon.length > 0
      ? background[listPokemon[0].types[0].type.name]
      : undefined
    }
   >
    <div
     className={styles.pokedex__search}
     style={{
      '--adm-color-primary':
       listPokemon.length > 0
        ? background[listPokemon[0].types[0].type.name]
        : undefined
     }}
    >
     <Grid columns={1}>
      <Grid.Item>
       <Card
        title="Here's your Pokémon"
        className={styles.pokedex__search__card}
        extra={
         <Button
          onClick={fetchlistSearchPokemon}
          fill="solid"
          color="primary"
          loading={loading}
          size="mini"
         >
          <Space wrap>
           <UndoOutline />
           Reset
          </Space>
         </Button>
        }
       >
        {loading ? (
         <AutoCenter>
          <span>Loading</span>
          <DotLoading />
         </AutoCenter>
        ) : (
         <Grid columns={1} gap={8}>
          {map(orderBy(listPokemon, ['id'], ['asc']), (lP, idx) => (
           <Grid.Item key={idx}>
            <CardComponent
             id={String(lP.id).padStart(3, '0')}
             name={lP.name}
             types={lP.types}
             image={
              lP.sprites.other.dream_world.front_default ??
              '/no_image_available.svg'
             }
             onclick={onClickPokemon}
            />
           </Grid.Item>
          ))}
          {listPokemon.length === 0 ? (
           <AutoCenter>
            <span>Click button "Reset" for search your Pokemon</span>
           </AutoCenter>
          ) : null}
         </Grid>
        )}
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
         onCancel={() => {
          setLoading(false);
         }}
        />
       </Card>
      </Grid.Item>
     </Grid>
    </div>
   </Base>
  </Fragment>
 );
}
