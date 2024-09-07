import { Button, Card, Col, Row, Space, Typography } from "antd";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../utils/requests";

const { Title, Paragraph } = Typography;

export default function Courses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            getRequest(`http://api.localhost/course/`)
            .then((data) => {
                if (!data) 
                    navigate("/");
                setCourses(data);
                document.title = "My Courses";
            })
            .catch((error) => {
                console.error("Error:", error);
                navigate("/");
            });
        };
        fetchCourses();
    }, []);

    return (
        <>
            <Title level={1} style={{textAlign: 'center'}}>
                Courses
            </Title>
            <Paragraph style={{textAlign: 'center'}}>
                Explore the various courses I offer and feel free to request other courses, only popular courses have been listed.
            </Paragraph>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Row>
                    <Col span={16} offset={4} style={{textAlign: 'center'}}>
                        <Button type="default" onClick={() => navigate("/")}>Back</Button>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} justify="start">
                    {courses && courses.map(course => (
                        <Col span={6} key={course.id}>
                            <Card title={course.name}>
                                <Paragraph  ellipsis={{ rows: 2, expandable: false, symbol: '...' }}>
                                    {course.desc}
                                </Paragraph>
                                <Paragraph>
                                    Cost per lesson per hour: £{course.cost}
                                </Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Space>
        </>
    )
}
