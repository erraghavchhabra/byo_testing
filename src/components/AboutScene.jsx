
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, Box, OrbitControls } from "@react-three/drei";

const AboutScene = () => {
  return (
    <div className="about-scene-wrapper">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />

        <Float floatIntensity={2} rotationIntensity={2}>
          <Sphere args={[0.6, 32, 32]} position={[-1.5, 0.2, 0]}>
            <meshStandardMaterial color="#ff6f61" metalness={0.3} roughness={0.4} />
          </Sphere>
        </Float>

        <Float floatIntensity={1.5} rotationIntensity={1.2}>
          <Box args={[0.7, 0.7, 0.7]} position={[1.5, -0.4, 0]}>
            <meshStandardMaterial color="#637695" metalness={0.2} roughness={0.6} />
          </Box>
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
};

export default AboutScene;
