import { Typography, Row, Col, Card } from "antd";
import React from 'react';
import { useState, useEffect } from 'react';
import { getRequest } from "../../api/requests";
import { useNavigate } from "react-router-dom";

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
            <Title level={1} style={{textAlign: 'center'}}>Courses</Title>
            <Paragraph style={{textAlign: 'center'}}>
                Explore the various courses I offer and feel free to request other courses, only popular courses have been listed.
            </Paragraph>
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
        </>
    )
}
