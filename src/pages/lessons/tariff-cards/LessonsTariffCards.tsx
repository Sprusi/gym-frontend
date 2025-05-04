import React from 'react';

import { Col, Row } from 'antd';

import { CardTemplate } from './cardTemplate/CardTemplate';

export const LessonsTariffCards = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col xs={24} sm={24} md={12} lg={12} xl={8}>
        <CardTemplate type="girl" />
      </Col>

      <Col xs={24} sm={24} md={12} lg={12} xl={8}>
        <CardTemplate type="boy" />
      </Col>

      <Col xs={24} sm={24} md={12} lg={12} xl={8}>
        <CardTemplate type="child" />
      </Col>
    </Row>
  );
};
