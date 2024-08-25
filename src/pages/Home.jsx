import { Typography } from 'antd';
import { ReactTyped } from "react-typed";

const { Title } = Typography;

export default function Home() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
            <Title style={{ fontSize: '64px', margin: 0 }}>Viswamedha Nalabotu</Title>
            <Title level={2} style={{ margin: 0 }}>I'm a <ReactTyped strings={["Student", "Developer", "Blogger", "Freelancer", "Photographer", "Gamer"]} typeSpeed={100} backSpeed={50} loop /></Title>
        </div>
    );
}
