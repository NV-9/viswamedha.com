import React, { useState, useEffect, useMemo } from "react";
import {
	Box,
	grommet,
	Grommet,
	Header,
	Heading,
	Page,
	PageContent,
	PageHeader,
	Paragraph,
	ResponsiveContext,
	Text,
	Layer,
} from "grommet";
import { deepMerge } from "grommet/utils";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { FaBars } from "@react-icons/all-files/fa/FaBars"; 
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { ReactTyped } from "react-typed";
import { Facebook, Instagram, Github, Linkedin, Send, Phone } from "grommet-icons";
import { Anchor } from 'grommet';

const theme = deepMerge(grommet, {
	global: {
		colors: {
			brand: "#228BE6",
		},
		font: {
			family: "Allura",
			size: "14px",
			height: "20px",
		},
	},
});

const MyParticles = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };
    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            style={{ position: "relative", width: "100%", height: "100%", zIndex: -1 }}
            options={{
                background: {
                    color: {
                        value: "#101010",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "repulse",
                        },
                        onclick: {
                            enable: true,
                            mode: "push",
                        },
                        resize: true,
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1,
                            },
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                        push: {
                            particles_nb: 4,
                        },
                        remove: {
                            particles_nb: 2,
                        },
                    },
                },
                particles: {
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    color: {
                        value: "#ffffff",
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000",
                        },
                        polygon: {
                            nb_sides: 5,
                        },
                        image: {
                            src: "img/github.svg",
                            width: 100,
                            height: 100,
                        },
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false,
                        },
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false,
                        },
                    },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200,
                        },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

const App = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [logoIsHovered, setLogoIsHovered] = useState(false);

    const memoizedParticles = useMemo(() => <MyParticles />, []);

    return (
        <Grommet theme={theme} full>
            <Page>

                {/* Top */}
                <Header pad="small" style={{ width: "100%", position: "relative" }}>
                    <Box direction="row" align="center" justify="start" fill="horizontal" style={{ marginLeft: "2%", zIndex: 10 }}>
                        <img
                            src="/favicon.png"
                            alt="Logo"
                            style={{
                                height: "80px",
                                marginRight: "10px",
                                opacity: logoIsHovered ? 1 : 0.8,
                                transform: logoIsHovered ? "rotate(-45deg)" : "rotate(0deg)",
                                transition: "opacity 0.4s ease, transform 0.4s ease",
                            }}
                            onMouseEnter={() => setLogoIsHovered(true)}
                            onMouseLeave={() => setLogoIsHovered(false)}
                        />
                    </Box>
                    <Box direction="row" align="center" justify="end" fill="horizontal" style={{ marginRight: "4%", zIndex: 10 }}>
                        <FaBars color="white" size="24px" onClick={() => setShowMenu(true)} />
                    </Box>
                </Header>

                {/* Middle */}
				<PageContent style={{ zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "absolute", minHeight: "100vh" }}>
                    {memoizedParticles}
                    <Box align="center">
						<Heading level={1} size="large" color="white" textAlign="center" style={{fontFamily: "Times New Roman, serif"}} margin={{ bottom: "small"}}><span className="color">V</span>iswamedha <span className="color">N</span>alabotu</Heading>
						<Heading level={2} size="small" color="white" textAlign="center" style={{fontFamily: "Times New Roman, serif"}} margin={{ top: "none", bottom: "small" }}>I'm a <span className="color"><ReactTyped strings={["Developer", "Blogger", "Freelancer"]} typeSpeed={100} backSpeed={50} loop /></span></Heading>
                    </Box>
                </PageContent>
                
                {/* Left */}
                <Box
                    direction="column"
                    align="center"
                    justify="center"
                    style={{ position: "absolute", left: "4%", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                >
                    <Anchor href="" target="_blank" style={{ marginBottom: "20px" }}>
                        <Facebook color="#808080" size="24px" />
                    </Anchor>
                    <Anchor href="" target="_blank" style={{ marginBottom: "20px" }}>
                        <Instagram color="#808080" size="24px" />
                    </Anchor>
                    <Anchor href="" target="_blank">
                        <Linkedin color="#808080" size="24px" />
                    </Anchor>
                </Box>

                {/* Right */} 
                <Box
                    direction="column"
                    align="center"
                    justify="center"
                    style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                >
                    <Anchor href="" target="_blank" style={{ marginBottom: "20px" }}>
                        <Github color="#808080" size="24px" />
                    </Anchor>
                    <Anchor href="" target="_blank" style={{ marginBottom: "20px" }}>
                        <Send color="#808080" size="24px" />
                    </Anchor>
                    <Anchor href="" target="_blank">
                        <Phone color="#808080" size="24px" />
                    </Anchor>
                </Box>
                
                {/* Menu */}
                {showMenu && (
                    <Layer
                        onEsc={() => setShowMenu(false)}
                        onClickOutside={() => setShowMenu(false)}
                    >
                        <Box
                            fill="vertical"
                            align="center"
                            justify="center"
                            background="#020202"
                            gap="medium"
                            pad="large"
                        >
                            <FaTimes size="24px" onClick={() => setShowMenu(false)} />
                            <Text size="large" color="white">Home</Text>
                            <Text size="large" color="white">About</Text>
                            <Text size="large" color="white">Blog</Text>
                            <Text size="large" color="white">Portfolio</Text>
                            <Text size="large" color="white">Contact</Text>
                            <Text size="large" color="white">Privacy</Text>
                        </Box>
                    </Layer>
                )}
                
                <style>
                    {`
                    canvas {
                        display: block;
                        position: absolute; 
                        z-index: -1;
                    }
					.color {
						color: #c70039;
					}
				
                    `}
                </style>
            </Page>
        </Grommet>
    );
};

export default App;
