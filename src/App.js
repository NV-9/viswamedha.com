import React, { useState, useContext } from "react";
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
} from "grommet";
import { deepMerge } from "grommet/utils";
import { useCallback, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Typewriter from "./components/Typewriter";
import { ReactTyped } from "react-typed";

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
    return (
        <Grommet theme={theme} full>
            <Page>
				<PageContent 
				style={{
					zIndex: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
				>
                    <MyParticles />
                    <Box align="center">
						<Heading level={1} size="large" color="white" textAlign="center" margin={{ bottom: "small"}}><span className="color">V</span>iswamedha <span className="color">N</span>alabotu</Heading>
						<Heading level={2} size="small" color="white" textAlign="center" margin={{ top: "none", bottom: "small" }}>I'm a <span className="color"><ReactTyped strings={["Developer", "Blogger", "Freelancer"]} typeSpeed={100} backSpeed={50} loop /></span></Heading>
					</Box>
                </PageContent>
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
					box {
						font-family: Times New Roman;
					}
                    `}
                </style>
            </Page>
        </Grommet>
    );
};

export default App;

