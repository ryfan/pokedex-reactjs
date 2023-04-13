import React, { Fragment } from 'react';
import Meta from '../../utils/meta';
import { Button, Card, Space } from 'antd-mobile';
import Base from '../../component/layout/base';

export default function Main() {
 return (
  <Fragment>
   <Meta title="Home" />
   <Base>
    <Card
     title="Here's your pokemon"
     style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 15px' }}
    >
     <Space wrap>
      <Button color="primary" fill="solid">
       Solid
      </Button>
      <Button color="primary" fill="outline">
       Outline
      </Button>
      <Button color="primary" fill="none">
       None
      </Button>
     </Space>
    </Card>
   </Base>
  </Fragment>
 );
}
