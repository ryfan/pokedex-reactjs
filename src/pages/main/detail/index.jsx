import React, { Fragment, useEffect, useState } from 'react';
import Meta from '../../../utils/meta';
import Base from '../../../component/layout/base';
import { useParams } from 'react-router-dom';
import { readDetailPokemon } from '../../../services/fetch';
import { DotLoading, Image, ResultPage } from 'antd-mobile';
import { background } from '../../../utils/variable';

export default function Detail() {
 const [dataPokemon, setdataPokemon] = useState(null);
 const [Loading, setLoading] = useState(true);
 const { id } = useParams();

 useEffect(() => {
  async function fetchData() {
   await onDetailPokemon(id);
  }
  fetchData();
 }, [id]);

 const onDetailPokemon = async (id) => {
  try {
   const getDetailData = await readDetailPokemon(id);
   if (getDetailData) {
    setdataPokemon(getDetailData);
    setTimeout(() => {
     setLoading(false);
    }, 1000);
   }
  } catch (error) {
   console.log(error);
  }
 };

 console.log(dataPokemon);

 return (
  <Fragment>
   <Meta title="Detail" />
   <Base>
    {Loading ? (
     <DotLoading />
    ) : (
     <ResultPage
      style={{
       '--background-color': background[dataPokemon.types[0].type.name]
      }}
      title={
       <span
        style={{
         textTransform: 'capitalize',
         fontSize: 30,
         fontWeight: 'bold'
        }}
       >
        {dataPokemon.name}
       </span>
      }
      description={
       <Image
        src={dataPokemon.sprites.other.dream_world.front_default}
        alt={dataPokemon.name}
        width="100%"
        height="100px"
       />
      }
     />
    )}
   </Base>
  </Fragment>
 );
}
