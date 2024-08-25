import { Flex, Typography } from 'antd';
import { ReactTyped } from "react-typed";
import '../assets/css/home.css';
const { Title } = Typography;

export default function Home() {
    return (
        <Flex vertical='true' justify='center' align='center' style={{ height: "100vh"}}>
            <Title style={{ fontSize: '64px', margin: 0 }}>Viswamedha Nalabotu</Title>
            <Title level={2} style={{ margin: 0 }}>I'm a <ReactTyped strings={["Student", "Developer", "Blogger", "Freelancer", "Photographer", "Gamer"]} typeSpeed={100} backSpeed={50} loop /></Title>
        </Flex>
    );
}
