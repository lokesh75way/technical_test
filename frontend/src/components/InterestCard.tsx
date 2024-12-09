"use client";
import { Card, Typography, Row, Col, List } from "antd";

type Props = {
  recommendation: Recommendation;
};

function InterestCard({ recommendation }: Props) {
  return (
    <Card>
      <Row>
        <Col xs={24} md={4}>
          <Typography.Text strong>User Id:</Typography.Text>
        </Col>
        <Col>
          <Typography.Text>{recommendation?.userId}</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={4}>
          <Typography.Text strong>Recommendations:</Typography.Text>
        </Col>
        <Col>
          <List
            split={false}
            size="small"
            dataSource={recommendation?.recommendations || []}
            renderItem={(item) => (
              <List.Item style={{ paddingLeft: 0 }}>{item}</List.Item>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={4}>
          <Typography.Text strong>Preferences:</Typography.Text>
        </Col>
        <Col>
          <List
            split={false}
            size="small"
            dataSource={recommendation?.preferences || []}
            renderItem={(item) => (
              <List.Item style={{ paddingLeft: 0 }}>{item}</List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default InterestCard;
