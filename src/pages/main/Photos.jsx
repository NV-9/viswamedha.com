import { Row, Col, Image, Typography } from 'antd';

const { Title } = Typography;

export default function Photos() {

    const imageNames = [];

    return (
        <>
        <Row>
            <Col span={24}>
                <Title level={1} style={{ textAlign: 'center' }}>Photos</Title>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Image.PreviewGroup>
                {imageNames.map((imageSrc, index) => (
                    <Col key={index} span={6}>
                        <Image
                            width='100%'
                            src={imageSrc}
                            style={{ borderRadius: '20px' }}
                        />
                    </Col>
                ))}
            </Image.PreviewGroup>
        </Row>
        </>
    )
}