import React, { Fragment, useEffect, useState } from 'react';
import Meta from '../../../utils/meta';
import Base from '../../../component/layout/base';
import { useNavigate, useParams } from 'react-router-dom';
import {
 readDetailPokemon,
 readEvolutionPokemon
} from '../../../services/fetch';
import {
 AutoCenter,
 Card,
 DotLoading,
 ErrorBlock,
 Grid,
 Image,
 ResultPage,
 Space,
 Steps,
 Tabs,
 Tag
} from 'antd-mobile';
import { background } from '../../../utils/variable';
import { capitalize } from '../../../utils/string';
import { map } from 'lodash';
import styles from './detail.module.scss';
import CardComponent from '../../../component/search/card';

const { Step } = Steps;
export default function Detail() {
 const { id } = useParams();
 const navigate = useNavigate();

 const [dataPokemon, setdataPokemon] = useState(null);
 const [listPokemonEvolution, setlistPokemonEvolution] = useState([]);
 const [Loading, setLoading] = useState(true);

 useEffect(() => {
  async function fetchData() {
   await onDetailPokemon(id);
  }
  fetchData();
 }, [id]);

 const onDetailPokemon = async (id) => {
  try {
   setLoading(true);
   const getDetailData = await readDetailPokemon(id);
   if (getDetailData) {
    setdataPokemon(getDetailData);
    const getEvolution = await readEvolutionPokemon(getDetailData.id);

    const evolutionData = [];
    let response = getEvolution.chain;

    do {
     const evolutionDetails = response['evolution_details'][0];
     evolutionData.push({
      species_name: response.species.name,
      min_level: !evolutionDetails ? 1 : evolutionDetails.min_level,
      trigger_name: !evolutionDetails ? null : evolutionDetails.trigger.name,
      item: !evolutionDetails ? null : evolutionDetails.item
     });

     response = response['evolves_to'][0];
    } while (!!response && response.hasOwnProperty('evolves_to'));
    const listDetailPokemon = [];
    map(evolutionData, async (dE) => {
     const getDetailData = await readDetailPokemon(dE.species_name);
     listDetailPokemon.push(getDetailData);
    });
    setlistPokemonEvolution(listDetailPokemon);
    setTimeout(() => {
     setLoading(false);
    }, 1000);
   }
  } catch (error) {
   console.log(error);
   setTimeout(() => {
    setLoading(false);
   }, 1000);
  }
 };

 return (
  <Base
   baseColor={
    dataPokemon ? background[dataPokemon.types[0].type.name] : undefined
   }
  >
   {Loading ? (
    <div style={{ padding: 12 }}>
     <Card style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
      <AutoCenter>
       <span>Loading</span>
       <DotLoading />
      </AutoCenter>
     </Card>
    </div>
   ) : dataPokemon ? (
    <Fragment>
     <Meta title={capitalize(dataPokemon.name)} />
     <div
      style={{
       '--adm-color-primary': background[dataPokemon.types[0].type.name]
      }}
     >
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
         <div style={{ width: 350 }}>
          <div style={{ position: 'relative', marginLeft: 20 }}>
           <p>{dataPokemon.name}</p>
          </div>
          <div
           style={{
            position: 'relative',
            fontSize: 20,
            color: 'rgba(240, 240, 240, 0.5)'
           }}
          >
           <p>#{String(dataPokemon.id).padStart(3, '0')}</p>
          </div>
         </div>
        </span>
       }
       description={
        <Space>
         {map(dataPokemon.types, (item, idx) => (
          <Tag
           key={idx}
           color="white"
           fill="outline"
           round
           className={styles.pokedex__detail__tag__name}
          >
           {item.type.name}
          </Tag>
         ))}
        </Space>
       }
      >
       <Grid columns={1} gap={8}>
        <Grid.Item>
         <div
          style={{
           marginTop: -15,
           zIndex: 2,
           display: 'flex'
          }}
         >
          <Image
           src={
            dataPokemon.sprites.other.dream_world.front_default ??
            '/no_image_available.svg'
           }
           alt={dataPokemon.name}
           width="100%"
           height="150px"
           lazy={true}
          />
         </div>
        </Grid.Item>
        <Grid.Item>
         <Card className={styles.pokedex__detail__card}>
          <Tabs defaultActiveKey="1">
           <Tabs.Tab title="About" key="1">
            Lorem Ipsum
           </Tabs.Tab>
           <Tabs.Tab title="Statistics" key="2">
            Lorem Ipsum
           </Tabs.Tab>
           <Tabs.Tab title="Evolution" key="3">
            <Steps current={1} direction="vertical">
             {map(listPokemonEvolution, (lPE, idx) => (
              <Step
               description={
                <CardComponent
                 id={String(lPE.id).padStart(3, '0')}
                 name={lPE.name}
                 types={lPE.types}
                 image={
                  lPE.sprites.other.dream_world.front_default ??
                  '/no_image_available.svg'
                 }
                 onclick={() => navigate(`/pokemon/${lPE.name}`)}
                />
               }
               key={idx}
               status="finish"
              />
             ))}
            </Steps>
           </Tabs.Tab>
           <Tabs.Tab title="Moves" key="4">
            Lorem Ipsum
           </Tabs.Tab>
          </Tabs>
         </Card>
        </Grid.Item>
       </Grid>
      </ResultPage>
     </div>
    </Fragment>
   ) : (
    <div style={{ padding: 12 }}>
     <Card style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
      <ErrorBlock
       title="404 Not Found"
       image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
       style={{
        '--image-height': '150px'
       }}
       description={<span>Your Destination Has Been Moved or Removed</span>}
      ></ErrorBlock>
     </Card>
    </div>
   )}
  </Base>
 );
}
