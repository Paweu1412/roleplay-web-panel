import React from "react";

import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";

import "./Particles.scss";

export const ParticlesComponent = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      className="particles"
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: 'transparent',
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'canvas',
          events: {
            resize: false
          },
        },
        "particles": {
          "number": {
            "value": 40,
            "density": {
              "enable": true,
              "value_area": 400
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 1,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 10,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 200,
            "color": "#ffffff",
            "opacity": 0.05,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "retina_detect": true
      }}
    />  
  )
}