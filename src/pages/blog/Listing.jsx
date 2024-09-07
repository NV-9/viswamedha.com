import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getRequest } from "../../utils/requests";
import { Card, Col, Row, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;


export default function Listing() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            getRequest(`http://api.localhost/post/`)
            .then((data) => {
                if (!data) 
                    navigate("/");
                setPosts(data);
                document.title = "My Blog";
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
            <Row style={{ textAlign: 'center' }}>
                <Col span={24}>
                    <Title level={1}>My Blog</Title>
                </Col>
            </Row>
            <Row gutter={16}>
                {posts && posts.map(post => (
                    <Col span={8} key={post.slug}>
                        <Link to={`/${post.slug}/`}>
                            <Card title={post.title} bordered={false}>
                                <Text ellipsis={true}>
                                    {post.content}
                                </Text>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}