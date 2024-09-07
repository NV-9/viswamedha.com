import { Button, Typography, Row, Col } from "antd";
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../utils/requests";

const { Title, Paragraph } = Typography;

export default function Tutoring() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState(null);
    
    useEffect(() => {
        const fetchReviews = async () => {
            getRequest(`http://api.localhost/review/`)
            .then((data) => {
                if (!data) 
                    navigate("/");
                setReviews(data);
                document.title = "Tutoring";
            })
            .catch((error) => {
                console.error("Error:", error);
                navigate("/");
            });
        };
        fetchReviews();
    }, []);

    return (
        <>
            <Title level={1} style={{textAlign: 'center'}}>Welcome</Title>
            <Row>
                <Col span={16} offset={4}>
                        <Paragraph>
                            Hey there, welcome to my tutoring page. I'm a tutor with over 4 years of experience in teaching students from various backgrounds. 
                            I specialize in teaching Mathematics, Physics, and Computer Science for various exam boards, with some additional courses, listed in the courses page.
                            I am current undertaking a Bachelor's degree in Artificial Intelligence and Computer Science. 
                            I have taught over 15 students and helped them achieve their academic goals. I believe that every student has the potential to succeed and I'm here 
                            to help you unlock your full potential. I offer personalized tutoring sessions tailored to your needs. Whether you need help with homework, test 
                            preparation, or understanding complex concepts, I'm here to help you succeed. I look forward to working with you and helping you achieve your academic goals.
                    </Paragraph>
                </Col>
            </Row>
            <Row>
                <Col span={16} offset={4}>
                    <Button type="primary" onClick={() => navigate("/courses")}>View Courses</Button>
                </Col>
            </Row>
            { reviews && (
                <Row>
                    <Col span={16} offset={4}>
                        <Title level={2}>Reviews:</Title>
                    </Col>
                </Row>
            )}
            { reviews && reviews.map(review => (
                <Row >
                    <Col span={16} offset={4}>
                        <Title level={3}>{review.initials}</Title>
                        <Paragraph>
                            {review.review}
                        </Paragraph>
                    </Col>
                </Row>
            ))}           
        </>
    )
}
