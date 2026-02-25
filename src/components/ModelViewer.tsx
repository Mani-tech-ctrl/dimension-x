"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Bounds, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface ModelViewerProps {
    // We accept a direct image URL (Object URL or external link)
    imageUrl: string;
    isStudioLight?: boolean;
}

function ImagePlane({ url }: { url: string }) {
    // Load the uploaded image as a Three.js Texture
    const texture = useTexture(url);
    const [aspect, setAspect] = useState(1);

    useEffect(() => {
        // Calculate aspect ratio once image is loaded to scale the plane proportionally
        if (texture.image) {
            setAspect(texture.image.width / texture.image.height);
        }

        // Set color space to ensure colors look accurate
        texture.colorSpace = THREE.SRGBColorSpace;
    }, [texture]);

    // Base height of the plane in 3D units
    const baseHeight = 5;

    return (
        <mesh>
            {/* 
        WHY SUBDIVISIONS ARE NEEDED:
        A default PlaneGeometry only has 4 vertices (the corners). Displacement maps 
        push vertices up or down based on the image's light/dark pixel values. 
        To get a detailed surface that matches the image content, we need many 
        vertices. 128x128 provides a dense enough grid for the depth effect 
        while keeping mobile performance reasonable.
      */}
            <planeGeometry args={[baseHeight * aspect, baseHeight, 128, 128]} />

            {/* 
        WHY DISPLACEMENT WORKS AS FAKE DEPTH:
        We are using the exact same 2D image for both color (map) and structure 
        (displacementMap). Lighter pixels on the image push the vertex "out" 
        (closer to the camera), while darker pixels push it "in". This creates 
        a 2.5D parallax effect when rotating, giving the illusion of volume.

        HOW THIS DIFFERS FROM REAL 3D RECONSTRUCTION:
        This is essentially a heightmap applied to a flat plane. A real 3D mesh 
        (like from an AI engine) would have fully generated geometry on all sides 
        (X, Y, and Z), completely separate mesh topology, and could be viewed from 
        behind or top-down perfectly. This 2.5D plane only looks correct from 
        the front/slight-side angles.
      */}
            <meshStandardMaterial
                map={texture}
                displacementMap={texture}
                displacementScale={0.3} // Subtle fake depth
                side={THREE.DoubleSide}
                roughness={0.8}
                metalness={0.1}
            />
        </mesh>
    );
}

export function ModelViewer({ imageUrl, isStudioLight }: ModelViewerProps) {
    return (
        // Dark "Studio-style" background via Tailwind
        <div className="w-full h-full relative rounded-2xl overflow-hidden bg-[#0f172a] shadow-2xl flex items-center justify-center">

            {/* Render the plane inside a <Canvas> scene */}
            <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>

                {/* Simple Studio-Style Lighting (No HDR/Environment Maps) */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 7]} intensity={1.5} />
                <directionalLight position={[-5, 5, -5]} intensity={0.5} />

                <Suspense fallback={null}>
                    <Bounds fit clip observe margin={1.2}>
                        {/* Center ensures the plane is exactly in the middle of our view */}
                        <Center>
                            <ImagePlane url={imageUrl} />
                        </Center>
                    </Bounds>
                </Suspense>

                {/* OrbitControls allow Rotate (drag), Zoom (scroll/pinch), and Pan */}
                <OrbitControls
                    makeDefault
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={1}
                    maxDistance={30}
                    // Restrict the angle slightly so users don't see the completely flat/broken back as easily
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 4}
                />
            </Canvas>

            {/* UX Hint Overlay */}
            <div className="absolute top-4 left-4 bg-slate-900/50 backdrop-blur-md px-3 py-1 rounded text-xs text-slate-300 pointer-events-none z-10">
                Hover & Drag to rotate • Fake 2.5D Depth Enabled
            </div>
        </div>
    );
}
