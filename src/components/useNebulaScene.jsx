import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const useNebulaScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Particle setup for snowfall effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount);

    // Initialize particles in a way that creates a continuous snowfall effect
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Spread particles across the width and height, with varied depth
      posArray[i] = (Math.random() - 0.5) * 20;      // X
      posArray[i + 1] = (Math.random() - 0.5) * 20;  // Y
      posArray[i + 2] = (Math.random() - 0.5) * 10;  // Z
      
      // Random falling speed for each particle
      velocities[i / 3] = Math.random() * 0.02 + 0.01;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create material with smaller, softer particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color(0x00ff9d),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      const positions = particlesGeometry.attributes.position.array;

      // Update particle positions for snowfall effect
      for (let i = 0; i < positions.length; i += 3) {
        // Move particles downward
        positions[i + 1] -= velocities[i / 3];

        // Add subtle horizontal drift
        positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.002;

        // Reset particle to top when it falls below view
        if (positions[i + 1] < -10) {
          positions[i + 1] = 10;
          positions[i] = (Math.random() - 0.5) * 20;
          positions[i + 2] = (Math.random() - 0.5) * 10;
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true;

      // Subtle rotation of the entire scene
      particlesMesh.rotation.z += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return canvasRef;
};

export default useNebulaScene;