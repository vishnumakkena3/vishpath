import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const useThreeScene = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const scene = new THREE.Scene();
      
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 25;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      rendererRef.current = renderer;

      const container = canvasRef.current.parentElement;
      if (!container) {
        throw new Error('Canvas parent element not found');
      }
      
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Improved particle distribution
      const createParticles = () => {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000; // Reduced particle count
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i += 3) {
          // Create a more uniform distribution
          const radius = 10 + Math.random() * 20; // Minimum radius of 10 to avoid center clustering
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          
          // Spherical to Cartesian coordinates with better distribution
          posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
          posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
          posArray[i + 2] = radius * Math.cos(phi);

          // Add slight random variation to prevent perfect spherical shell
          posArray[i] += (Math.random() - 0.5) * 5;
          posArray[i + 1] += (Math.random() - 0.5) * 5;
          posArray[i + 2] += (Math.random() - 0.5) * 5;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const colors = new Float32Array(particlesCount * 3);
        const colorPalette = [
          [0.1, 0.8, 0.6],    // Emerald
          [1.0, 0.3, 0.6],    // Pink
          [0.7, 0.4, 1.0]     // Purple
        ];

        for (let i = 0; i < particlesCount * 3; i += 3) {
          const colorSet = colorPalette[Math.floor(Math.random() * colorPalette.length)];
          colors[i] = colorSet[0];
          colors[i + 1] = colorSet[1];
          colors[i + 2] = colorSet[2];
        }

        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.1,          // Slightly larger particles to compensate for fewer particles
          transparent: true,
          blending: THREE.AdditiveBlending,
          vertexColors: true,
          sizeAttenuation: true,
          opacity: 0.6        // Reduced opacity for better visibility
        });

        return new THREE.Points(particlesGeometry, particlesMaterial);
      };

      const particlesMesh = createParticles();
      scene.add(particlesMesh);

      const clock = new THREE.Clock();
      const mouse = { x: 0, y: 0 };
      let animationFrameId;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        if (particlesMesh) {
          // Slower rotation for better visibility
          particlesMesh.rotation.y = elapsedTime * 0.1;
          particlesMesh.rotation.x = elapsedTime * 0.05;

          // Gentler mouse interaction
          const mouseX = mouse.x * 0.5;
          const mouseY = mouse.y * 0.5;
          particlesMesh.rotation.x += (mouseY - particlesMesh.rotation.x) * 0.03;
          particlesMesh.rotation.y += (mouseX - particlesMesh.rotation.y) * 0.03;

          // Very subtle pulsing
          const scale = 1 + Math.sin(elapsedTime * 0.3) * 0.05;
          particlesMesh.scale.set(scale, scale, scale);
        }

        renderer.render(scene, camera);
      };

      const onMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      const handleResize = () => {
        if (!container) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', handleResize);
      
      animate();

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(animationFrameId);

        if (particlesMesh) {
          particlesMesh.geometry.dispose();
          particlesMesh.material.dispose();
        }

        renderer.dispose();
        scene.clear();
      };

    } catch (error) {
      console.error('Error setting up Three.js scene:', error);
    }
  }, []);

  return canvasRef;
};

export default useThreeScene;