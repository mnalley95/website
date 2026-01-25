'use client'

import React from 'react';
import { useCallback } from 'react';
import { loadSlim } from 'tsparticles-slim';
import Particles from 'react-particles';
import ParticlesConfig from '../../config/particles-config';
import type { Engine, Container } from 'tsparticles-engine';


const ParticleBackground = () => {

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log(container);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: -100, backgroundColor: "#727272" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={ParticlesConfig as any}
      >
      </Particles>
    </div>
  );
};

export default ParticleBackground;
