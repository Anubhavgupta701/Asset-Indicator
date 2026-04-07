import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import DalGrainFallback from "./DalGrainFallback";

function ThreeGrain() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 1.5);
    scene.add(ambientLight);
    const blueLight = new THREE.PointLight(0x0ea5e9, 8, 20);
    blueLight.position.set(-3, 2, 3);
    scene.add(blueLight);
    const greenLight = new THREE.PointLight(0x22c55e, 5, 20);
    greenLight.position.set(3, -1, 2);
    scene.add(greenLight);
    const fillLight = new THREE.PointLight(0xffffff, 2, 15);
    fillLight.position.set(0, 0, 5);
    scene.add(fillLight);

    const huskGeometry = new THREE.SphereGeometry(1, 64, 64);
    huskGeometry.scale(1.4, 1, 0.85);
    const huskMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc8a96e,
      roughness: 0.45,
      metalness: 0.05,
      clearcoat: 0.2,
      clearcoatRoughness: 0.3,
      transparent: true,
      opacity: 0.92,
    });
    const huskMesh = new THREE.Mesh(huskGeometry, huskMaterial);
    scene.add(huskMesh);

    const cotyledonGeometry = new THREE.SphereGeometry(0.85, 48, 48);
    cotyledonGeometry.scale(1.35, 0.95, 0.8);
    const cotyledonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf5d67a,
      roughness: 0.35,
      metalness: 0.0,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      emissive: 0x8b6914,
      emissiveIntensity: 0.1,
    });
    const cotyledonMesh = new THREE.Mesh(cotyledonGeometry, cotyledonMaterial);
    cotyledonMesh.visible = false;
    scene.add(cotyledonMesh);

    const particleGroup = new THREE.Group();
    scene.add(particleGroup);
    const particleCount = 60;
    const particles: THREE.Mesh[] = [];

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 0.04 + 0.02;
      const pGeo = new THREE.SphereGeometry(size, 8, 8);
      const pMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x0ea5e9 : 0x22c55e,
        transparent: true,
        opacity: 0,
      });
      const p = new THREE.Mesh(pGeo, pMat);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.1 + Math.random() * 0.3;
      p.position.set(
        r * Math.sin(phi) * Math.cos(theta) * 1.4,
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi) * 0.85
      );
      p.userData = {
        basePos: p.position.clone(),
        speed: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
        delay: Math.random() * 2,
        active: false,
      };
      particles.push(p);
      particleGroup.add(p);
    }

    const huskPieces: THREE.Mesh[] = [];
    const huskPieceCount = 8;
    for (let i = 0; i < huskPieceCount; i++) {
      const angle = (i / huskPieceCount) * Math.PI * 2;
      const pieceGeo = new THREE.SphereGeometry(0.3, 16, 8, angle, Math.PI * 2 / huskPieceCount);
      const pieceMat = new THREE.MeshPhysicalMaterial({
        color: 0xb8964e,
        roughness: 0.6,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const piece = new THREE.Mesh(pieceGeo, pieceMat);
      piece.scale.set(1.4, 1.0, 0.85);
      piece.userData = {
        angle,
        targetPos: new THREE.Vector3(
          Math.cos(angle) * 2.5,
          Math.sin(angle) * 1.8,
          (Math.random() - 0.5) * 1.5
        ),
      };
      huskPieces.push(piece);
      scene.add(piece);
    }

    let phase: "idle" | "enzymeActivation" | "separation" | "revealed" | "reset" = "idle";
    let phaseTimer = 0;
    const clock = new THREE.Clock();

    function activateParticles() {
      particles.forEach((p) => {
        setTimeout(() => { p.userData.active = true; }, p.userData.delay * 300);
      });
    }
    function deactivateParticles() {
      particles.forEach((p) => {
        p.userData.active = false;
        (p.material as THREE.MeshBasicMaterial).opacity = 0;
      });
    }
    function startSeparation() {
      huskPieces.forEach((piece) => {
        (piece.material as THREE.MeshPhysicalMaterial).opacity = 0.85;
      });
      huskMesh.visible = false;
    }
    function resetGrain() {
      huskMesh.visible = true;
      huskMesh.scale.set(1, 1, 1);
      huskMaterial.opacity = 0.92;
      cotyledonMesh.visible = false;
      huskPieces.forEach((p) => {
        p.position.set(0, 0, 0);
        (p.material as THREE.MeshPhysicalMaterial).opacity = 0;
      });
      deactivateParticles();
    }

    const animationId = { current: 0 };

    function animate() {
      animationId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      phaseTimer += delta;

      if (phase === "idle" && phaseTimer > 1.5) {
        phase = "enzymeActivation"; phaseTimer = 0; activateParticles();
      } else if (phase === "enzymeActivation" && phaseTimer > 2.5) {
        phase = "separation"; phaseTimer = 0; startSeparation(); cotyledonMesh.visible = true;
      } else if (phase === "separation" && phaseTimer > 2.0) {
        phase = "revealed"; phaseTimer = 0;
      } else if (phase === "revealed" && phaseTimer > 2.0) {
        phase = "reset"; phaseTimer = 0; resetGrain();
      } else if (phase === "reset" && phaseTimer > 0.8) {
        phase = "idle"; phaseTimer = 0;
      }

      huskMesh.rotation.y = elapsed * 0.4;
      huskMesh.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
      cotyledonMesh.rotation.y = elapsed * 0.4;
      cotyledonMesh.rotation.x = Math.sin(elapsed * 0.3) * 0.15;

      particles.forEach((p) => {
        const mat = p.material as THREE.MeshBasicMaterial;
        if (p.userData.active) {
          mat.opacity = Math.min(mat.opacity + delta * 2, 0.9);
          const base = p.userData.basePos as THREE.Vector3;
          const inwardFactor = Math.min(phaseTimer / 1.5, 1);
          p.position.lerp(
            new THREE.Vector3(
              base.x * (1 - inwardFactor * 0.4),
              base.y * (1 - inwardFactor * 0.4),
              base.z * (1 - inwardFactor * 0.4)
            ),
            0.05
          );
          p.position.x += Math.sin(elapsed * p.userData.speed + p.userData.phase) * 0.005;
          p.position.y += Math.cos(elapsed * p.userData.speed + p.userData.phase) * 0.003;
        } else {
          mat.opacity = Math.max(mat.opacity - delta * 3, 0);
          p.position.lerp(p.userData.basePos, 0.05);
        }
      });

      if (phase === "separation" || phase === "revealed") {
        huskPieces.forEach((piece) => {
          const target = piece.userData.targetPos as THREE.Vector3;
          piece.position.lerp(target, 0.04);
          const mat = piece.material as THREE.MeshPhysicalMaterial;
          const prog = Math.min(phaseTimer / 1.5, 1);
          mat.opacity = 0.85 * (1 - prog * 0.8);
        });
      }
      if (phase === "revealed") {
        cotyledonMaterial.emissiveIntensity = 0.1 + Math.sin(elapsed * 3) * 0.05;
        huskMaterial.opacity = Math.max(huskMaterial.opacity - delta * 0.5, 0);
      }

      blueLight.intensity = 8 + Math.sin(elapsed * 1.5) * 1.5;
      greenLight.intensity = 5 + Math.cos(elapsed * 1.2) * 1.0;
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId.current);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}

export default function DalGrain3D() {
  const [useWebGL, setUseWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setUseWebGL(!!gl);
    } catch {
      setUseWebGL(false);
    }
  }, []);

  if (useWebGL === null) return null;
  if (!useWebGL) return <DalGrainFallback />;
  return <ThreeGrain />;
}
