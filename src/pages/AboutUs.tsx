import type React from "react"
import { Layout, Typography, Timeline, Card, Row, Col, Image } from "antd"
import { ShopOutlined, HeartOutlined, TeamOutlined, RocketOutlined } from "@ant-design/icons"
import store from '../assets/store.jpg'
const { Content } = Layout
const { Title, Paragraph } = Typography

const AboutUs: React.FC = () => {
  return (
    <Layout>
      
      <Content style={{ padding: "50px" }}>
        <Title level={1}>About Bike Store</Title>

        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <Paragraph>
              Welcome to EcoShop, your one-stop destination for eco-friendly and sustainable products. Our mission is to
              make sustainable living accessible and enjoyable for everyone.
            </Paragraph>
            <Paragraph>
              Founded in 2020, we've been on a journey to curate the best eco-friendly products from around the world
              and bring them to your doorstep.
            </Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Image
              src={store}
              alt="EcoShop storefront"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
        </Row>

        <Title level={2} style={{ marginTop: "40px" }}>
          Our Journey
        </Title>
        <Timeline
          items={[
            {
              children: "EcoShop founded with a vision for sustainable shopping",
              color: "green",
            },
            {
              children: "Launched our first collection of reusable products",
              color: "green",
            },
            {
              children: "Expanded to offer a wide range of eco-friendly home goods",
              color: "green",
            },
            {
              children: "Partnered with local artisans to offer unique, handmade items",
              color: "green",
            },
            {
              children: "Introduced our own line of biodegradable packaging",
              color: "green",
            },
            {
              children: "Continuing to grow and innovate in the world of sustainable retail",
              color: "blue",
            },
          ]}
        />

        <Title level={2} style={{ marginTop: "40px" }}>
          What Sets Us Apart
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <ShopOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
              <Title level={4}>Curated Selection</Title>
              <Paragraph>We handpick every product to ensure quality and sustainability.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <HeartOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
              <Title level={4}>Eco-Friendly</Title>
              <Paragraph>All our products are environmentally conscious and sustainable.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <TeamOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
              <Title level={4}>Community Focus</Title>
              <Paragraph>We support local artisans and eco-friendly initiatives.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <RocketOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
              <Title level={4}>Innovation</Title>
              <Paragraph>We're always seeking new ways to make sustainable living easier.</Paragraph>
            </Card>
          </Col>
        </Row>

        <Title level={2} style={{ marginTop: "40px" }}>
          Our Commitment
        </Title>
        <Paragraph>
          At EcoShop, we're committed to more than just selling products. We're dedicated to promoting a sustainable
          lifestyle, reducing waste, and supporting eco-friendly initiatives. Every purchase you make with us
          contributes to a greener future.
        </Paragraph>
        <Paragraph>Join us in our mission to make the world a little bit greener, one product at a time.</Paragraph>
      </Content>
    </Layout>
  )
}

export default AboutUs

