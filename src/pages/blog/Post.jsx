import { Col, Row } from "antd";
import {getRequest} from "../../api/requests";  
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from 'antd';


const { Title, Paragraph, Text, Link } = Typography;

export default function Post() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            getRequest(`http://api.localhost/post/${slug}/`)
            .then((data) => {
                if (!data) 
                    navigate("/");
                setPost(data);
                document.title = data.title;
            })
            .catch((error) => {
                console.error("Error:", error);
                navigate("/");
            });
        };
        fetchPost();
    }, []);

    return (
        <>
            {post && (
                <>
                <Row >
                    <Col span={24}>
                        <Title style={{ textAlign: 'center' }}>{post.heading}</Title>
                        <Title level={2}>{post.subheading}</Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Text>{post.content}</Text>
                    </Col>
                </Row>
                </>
            )}
        </>
    )
}