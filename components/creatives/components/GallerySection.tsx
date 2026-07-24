import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioManager } from '../lib/audioManager';
import './GallerySection.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  color: string;
  desc: string;
}

interface GallerySectionProps {
  isPlaying: boolean;
  toggleAudio: (e: any) => void;
}

const PROJECTS: Project[] = [
  { id: 'p1', title: 'AI Compass', client: 'Google', year: '2024', tags: ['3D', 'MOTION', 'WEBSITE'], color: '#b86a28', desc: 'A cutting-edge digital experience for the AI Compass project, navigating the future of artificial intelligence with immersive 3D storytelling and bold visual design.' },
  { id: 'p2', title: 'Free Spirits', client: 'Netflix', year: '2024', tags: ['EXPERIENCE', 'BRAND'], color: '#6b1010', desc: 'An ethereal brand experience blending cinematic visuals with interactive digital art, created for a landmark Netflix campaign.' },
  { id: 'p3', title: 'Visitor Guide', client: 'Google', year: '2025', tags: ['3D', 'WEBSITE', 'EVENT'], color: '#1e3d7a', desc: 'A transformative visitor experience guide that reimagines how people discover and navigate a creative campus through digital-first design.' },
  { id: 'p4', title: 'Pixel 9 Pro', client: 'Google', year: '2024', tags: ['PRODUCT', '3D', 'CAMPAIGN'], color: '#d0d0d0', desc: 'A photorealistic 3D product showcase for the Google Pixel 9 Pro, featuring smooth interactive storytelling and premium visual language.' },
  { id: 'p5', title: 'Petra', client: 'Google', year: '2024', tags: ['MUSIC', 'MOTION', 'BRAND'], color: '#2a0808', desc: 'A bold visual identity blending cultural heritage with modern digital aesthetics for an award-winning brand experience.' },
  { id: 'p6', title: 'Blue Spirits', client: 'DIAGEO', year: '2025', tags: ['PRODUCT', '3D', 'BRAND'], color: '#0e2a38', desc: 'An immersive digital campaign featuring liquid simulations and cinematic storytelling for a premium spirits range.' },
  { id: 'p7', title: 'Alocasia', client: 'DIAGEO', year: '2024', tags: ['MOTION', 'BRAND', 'CAMPAIGN'], color: '#152508', desc: 'A nature-inspired campaign blending organic motion with premium brand aesthetics for a botanical spirits collection.' },
  { id: 'p8', title: 'Judas Priest', client: 'Live Nation', year: '2024', tags: ['MUSIC', 'EXPERIENCE', '3D'], color: '#160018', desc: 'A legendary tribute digital experience celebrating 50 years of heavy metal with immersive visual storytelling and dynamic 3D.' },
  { id: 'p9', title: 'New Way to Cloud', client: 'Google Cloud', year: '2025', tags: ['BRAND', 'MOTION', 'CAMPAIGN'], color: '#051222', desc: 'The New Way to Cloud campaign reimagined with bold typography and kinetic motion design for a global audience.' },
  { id: 'p10', title: 'The Ambos', client: 'DIAGEO', year: '2025', tags: ['PRODUCT', 'BRAND', '3D'], color: '#221408', desc: 'A premium digital experience featuring immersive product visualization for a distinguished spirits range.' },
  { id: 'p11', title: 'SOUND:AI', client: 'Phantom', year: '2025', tags: ['AUDIO', 'AI', 'EXPERIENCE'], color: '#2a0030', desc: 'An experimental audio-visual installation powered by AI, creating unique soundscapes responding to user behavior in real time.' },
  { id: 'p12', title: 'Stellar Maps', client: 'ESA', year: '2024', tags: ['3D', 'DATA', 'SCIENCE'], color: '#00051a', desc: 'An interactive star map visualization letting users explore millions of celestial objects across the observable universe.' },
  { id: 'p13', title: 'Motion Type', client: 'Pentagram', year: '2025', tags: ['TYPE', 'MOTION', 'BRAND'], color: '#080808', desc: 'A typographic motion study exploring the relationship between letterforms, time, and digital space.' },
  { id: 'p14', title: 'Synthetic Nature', client: 'Adidas', year: '2025', tags: ['PRODUCT', '3D', 'SUSTAIN'], color: '#082008', desc: 'A sustainable materials campaign blending organic aesthetics with cutting-edge 3D craft for a new collection.' },
  { id: 'p15', title: 'Neural Canvas', client: 'Adobe', year: '2024', tags: ['AI', 'CREATIVE', 'TOOLS'], color: '#200808', desc: 'A creative AI toolset showcase demonstrating the future of AI-assisted creative work with beautiful interactive demos.' },
  { id: 'p16', title: 'Depth Charge', client: 'Red Bull', year: '2025', tags: ['EXPERIENCE', 'SPORT', '3D'], color: '#130800', desc: 'An extreme sports digital experience plunging viewers into the depths of underwater action and high-performance culture.' },
  { id: 'p17', title: 'Chromatic Dream', client: 'Spotify', year: '2024', tags: ['MUSIC', 'VISUAL', 'BRAND'], color: '#001800', desc: 'A visual music experience translating audio frequencies into a mesmerizing chromatic journey through sound and light.' },
  { id: 'p18', title: 'Phantom World', client: 'Internal', year: '2025', tags: ['IDENTITY', 'BRAND', 'WEB'], color: '#0d0d0d', desc: 'A self-initiated exploration of identity, space, and the boundaries of digital experience design.' },
];

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  return [r, g, b];
}

function darken(hex: string, f: number): string {
  const rgb = hexToRgb(hex);
  return `rgb(${Math.round(rgb[0] * (1 - f))},${Math.round(rgb[1] * (1 - f))},${Math.round(rgb[2] * (1 - f))})`;
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function makeTexture(proj: Project): THREE.CanvasTexture {
  const W = 800;
  const H = 560;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);

  const c = proj.color || '#111';

  // bg gradient
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, darken(c, 0.25));
  g.addColorStop(0.55, c);
  g.addColorStop(1, darken(c, 0.55));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // subtle film grain
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.035})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
  }

  // center glow
  ctx.save();
  const rg = ctx.createRadialGradient(W * 0.5, H * 0.46, 0, W * 0.5, H * 0.46, H * 0.52);
  rg.addColorStop(0, 'rgba(255,255,255,0.18)');
  rg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();

  // top separator line
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(0, 42);
  ctx.lineTo(W, 42);
  ctx.stroke();
  ctx.restore();

  // year (top-left)
  ctx.save();
  ctx.font = '400 10px "Space Mono",monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.fillText(proj.year, 18, 28);
  ctx.restore();

  // client (top-right)
  ctx.save();
  ctx.font = '400 10px "Space Mono",monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.textAlign = 'right';
  ctx.fillText(proj.client.toUpperCase(), W - 18, 28);
  ctx.restore();

  // title
  const fs = Math.max(24, Math.min(46, Math.round(700 / Math.max(proj.title.length, 5))));
  ctx.save();
  ctx.font = `300 ${fs}px "Inter",Helvetica,sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(proj.title, W / 2, H / 2);
  ctx.restore();

  // tags
  let tx = 18;
  proj.tags.forEach((tag) => {
    ctx.save();
    ctx.font = '400 8px "Space Mono",monospace';
    const tw = ctx.measureText(tag).width + 20;
    rrect(ctx, tx, H - 36, tw, 18, 9);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 0.7;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.textBaseline = 'middle';
    ctx.fillText(tag, tx + 10, H - 27);
    ctx.restore();
    tx += tw + 7;
  });

  return new THREE.CanvasTexture(cv);
}

export default function GallerySection({ isPlaying, toggleAudio }: GallerySectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Trigger loading and WebGL compiler when scrolled into view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        setHasStarted(true);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);
  const [viewMode, setViewMode] = useState<'sphere' | 'grid'>('sphere');
  const [activeTab, setActiveTab] = useState<'work' | 'about' | 'careers'>('work');
  const [detailProject, setDetailProject] = useState<Project | null>(null);
  const [detailImgUrl, setDetailImgUrl] = useState<string>('');

  // Tooltip state
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState({ title: '', sub: '' });
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Refs for animating meshes / updates inside RAF loop
  const viewModeRef = useRef(viewMode);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const cardTransformsRef = useRef<Array<{
    spherePos: THREE.Vector3;
    sphereQuat: THREE.Quaternion;
    gridPos: THREE.Vector3;
    gridQuat: THREE.Quaternion;
  }>>([]);

  const isDragRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  const tgtRotationRef = useRef({ x: 0, y: 0 });
  const curRotationRef = useRef({ x: 0, y: 0 });
  const hovMeshRef = useRef<THREE.Mesh | null>(null);

  // Sync state refs to let RAF loop read them
  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  // Set up detail view hero image
  useEffect(() => {
    if (!hasStarted || !detailProject) return;

    // Generate detail image from canvas
    const dc = document.createElement('canvas');
    dc.width = 1200;
    dc.height = 675;
    const dx = dc.getContext('2d');
    if (dx) {
      const gg = dx.createLinearGradient(0, 0, 1200, 675);
      gg.addColorStop(0, darken(detailProject.color || '#111', 0.15));
      gg.addColorStop(1, detailProject.color || '#111');
      dx.fillStyle = gg;
      dx.fillRect(0, 0, 1200, 675);

      const rg2 = dx.createRadialGradient(600, 338, 0, 600, 338, 480);
      rg2.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      rg2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      dx.fillStyle = rg2;
      dx.fillRect(0, 0, 1200, 675);

      const fs2 = Math.max(60, Math.min(88, Math.round(1050 / Math.max(detailProject.title.length, 5))));
      dx.font = `300 ${fs2}px "Inter",Helvetica,sans-serif`;
      dx.fillStyle = 'rgba(255,255,255,0.82)';
      dx.textAlign = 'center';
      dx.textBaseline = 'middle';
      dx.fillText(detailProject.title, 600, 338);
      setDetailImgUrl(dc.toDataURL());
    }

    gsap.fromTo('.gallery-detail', { opacity: 0 }, { opacity: 1, duration: 0.55, ease: 'power2.inOut' });
    gsap.fromTo('.d-body > *', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out', delay: 0.18 });
  }, [detailProject]);

  const handleCloseDetail = () => {
    gsap.to('.gallery-detail', {
      opacity: 0,
      duration: 0.38,
      ease: 'power2.in',
      onComplete: () => {
        setDetailProject(null);
        setDetailImgUrl('');
      },
    });
  };

  // Switch View Mode Transition
  const handleViewModeChange = (mode: 'sphere' | 'grid') => {
    if (mode === viewMode) return;
    setViewMode(mode);
  };

  useEffect(() => {
    if (!hasStarted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // THREE.JS SETUP
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.032);

    const camera = new THREE.PerspectiveCamera(72, canvas.clientWidth / canvas.clientHeight, 0.05, 200);
    camera.position.set(0, 0, 0.001); // inside sphere looking out
    cameraRef.current = camera;

    const RADIUS = 11.5;
    const CW = 3.0;
    const CH = 2.1;
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const meshes: THREE.Mesh[] = [];
    const N = PROJECTS.length;
    const GA = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    // Calculate layouts
    const cardTransforms = PROJECTS.map((proj, i) => {
      // 1. Sphere position
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = GA * i;
      const spherePos = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS);

      const dummy = new THREE.Object3D();
      dummy.position.copy(spherePos);
      dummy.lookAt(0, 0, 0);
      const sphereQuat = dummy.quaternion.clone();

      // 2. Grid position
      const col = i % 6;
      const row = Math.floor(i / 6);
      const gridX = (col - 2.5) * 3.6;
      const gridY = (1 - row) * 2.5;
      const gridPos = new THREE.Vector3(gridX, gridY, 0);
      const gridQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, (Math.random() - 0.5) * 0.05));

      return { spherePos, sphereQuat, gridPos, gridQuat };
    });

    cardTransformsRef.current = cardTransforms;

    // Create Mesh Cards
    PROJECTS.forEach((proj, i) => {
      const transform = cardTransforms[i];
      const geo = new THREE.PlaneGeometry(CW, CH);
      const tex = makeTexture(proj);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0,
        side: THREE.FrontSide,
      });

      const mesh = new THREE.Mesh(geo, mat);

      // Start in sphere mode position
      mesh.position.copy(transform.spherePos);
      mesh.quaternion.copy(transform.sphereQuat);
      mesh.userData = proj;

      cardGroup.add(mesh);
      meshes.push(mesh);
    });

    meshesRef.current = meshes;

    // Stagger card scales in immediately upon load
    meshes.forEach((m, i) => {
      m.scale.set(0.6, 0.6, 0.6);
      const mat = m.material as THREE.MeshBasicMaterial;
      gsap.to(mat, { opacity: 1, duration: 0.9, delay: 0.1 + i * 0.045, ease: 'power2.out' });
      gsap.to(m.scale, { x: 1, y: 1, z: 1, duration: 1.0, delay: 0.1 + i * 0.045, ease: 'back.out(1.5)' });
    });

    // Add Stars
    const starCount = 700;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const rr = 28 + Math.random() * 35;
      starPos[i * 3] = rr * Math.sin(p) * Math.cos(t);
      starPos[i * 3 + 1] = rr * Math.sin(p) * Math.sin(t);
      starPos[i * 3 + 2] = rr * Math.cos(p);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.055,
      transparent: true,
      opacity: 0.45,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Rotation & Interactivity
    const SENS = 0.0028;
    const FRIC = 0.91;
    const LERP = 0.07;
    let autoRot = true;
    let autoRotTimer: any = null;

    // Raycasting for hovers
    const raycaster = new THREE.Raycaster();
    const tempMouse = new THREE.Vector2();

    const checkHover = () => {
      if (detailProject) return;
      tempMouse.x = mouseRef.current.x;
      tempMouse.y = mouseRef.current.y;
      raycaster.setFromCamera(tempMouse, camera);
      const hits = raycaster.intersectObjects(meshes);

      if (hits.length) {
        const m = hits[0].object as THREE.Mesh;
        if (m !== hovMeshRef.current) {
          if (hovMeshRef.current) {
            gsap.to(hovMeshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.28, ease: 'power2.out' });
          }
          hovMeshRef.current = m;
          gsap.to(m.scale, { x: 1.06, y: 1.06, z: 1.06, duration: 0.32, ease: 'power2.out' });
          audioManager.playHover(); // Play hover sound on card hover
        }
        const p = m.userData as Project;
        setTooltipText({ title: p.title, sub: `${p.client} — ${p.year}` });
        setShowTooltip(true);
        canvas.style.cursor = 'pointer';
      } else {
        if (hovMeshRef.current) {
          gsap.to(hovMeshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.28, ease: 'power2.out' });
          hovMeshRef.current = null;
        }
        setShowTooltip(false);
        canvas.style.cursor = isDragRef.current ? 'grabbing' : 'grab';
      }
    };

    // Events
    const handleMouseDown = (e: MouseEvent) => {
      if (detailProject) return;
      isDragRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      autoRot = false;
      canvas.classList.add('grabbing');
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Update tooltip pos
      setTooltipPos({ x: e.clientX + 16, y: e.clientY - 36 });

      if (isDragRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;

        // Detect drag direction and play whoosh SFX with cooldown filter
        const dragThreshold = 2.0;
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > dragThreshold) {
            audioManager.playWhoosh('right');
          } else if (dx < -dragThreshold) {
            audioManager.playWhoosh('left');
          }
        } else {
          if (dy > dragThreshold) {
            audioManager.playWhoosh('down');
          } else if (dy < -dragThreshold) {
            audioManager.playWhoosh('up');
          }
        }

        if (viewModeRef.current === 'sphere') {
          // Sphere rotates fully
          const velX = dy * SENS;
          const velY = dx * SENS;
          tgtRotationRef.current.x += velX;
          tgtRotationRef.current.y += velY;
          tgtRotationRef.current.x = Math.max(-1.15, Math.min(1.15, tgtRotationRef.current.x));
        } else {
          // Grid mode: Drag moves grid slightly (panning)
          cardGroup.position.x += dx * 0.008;
          cardGroup.position.y -= dy * 0.008;
          // Clamp grid position to keep it in view
          cardGroup.position.x = Math.max(-6, Math.min(6, cardGroup.position.x));
          cardGroup.position.y = Math.max(-3, Math.min(3, cardGroup.position.y));
        }

        dragStartRef.current = { x: e.clientX, y: e.clientY };
      }

      checkHover();
    };

    const handleMouseUp = () => {
      isDragRef.current = false;
      canvas.classList.remove('grabbing');
      clearTimeout(autoRotTimer);
      autoRotTimer = setTimeout(() => {
        if (!detailProject) autoRot = true;
      }, 4200);
    };

    const handleWheel = (e: WheelEvent) => {
      if (detailProject) return;
      autoRot = false;

      if (viewModeRef.current === 'sphere') {
        tgtRotationRef.current.y += e.deltaX * 0.0018;
        tgtRotationRef.current.x += e.deltaY * 0.0018;
        tgtRotationRef.current.x = Math.max(-1.15, Math.min(1.15, tgtRotationRef.current.x));
      } else {
        // Zoom/tilt grid on scroll
        cardGroup.position.z -= e.deltaY * 0.01;
        cardGroup.position.z = Math.max(-5, Math.min(3, cardGroup.position.z));
      }

      clearTimeout(autoRotTimer);
      autoRotTimer = setTimeout(() => {
        if (!detailProject) autoRot = true;
      }, 3200);
    };

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (detailProject) return;
      isDragRef.current = true;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      autoRot = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragRef.current) return;
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;

      // Detect touch drag direction and play whoosh SFX
      const dragThreshold = 2.0;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > dragThreshold) {
          audioManager.playWhoosh('right');
        } else if (dx < -dragThreshold) {
          audioManager.playWhoosh('left');
        }
      } else {
        if (dy > dragThreshold) {
          audioManager.playWhoosh('down');
        } else if (dy < -dragThreshold) {
          audioManager.playWhoosh('up');
        }
      }

      if (viewModeRef.current === 'sphere') {
        const velX = dy * SENS;
        const velY = dx * SENS;
        tgtRotationRef.current.x += velX;
        tgtRotationRef.current.y += velY;
        tgtRotationRef.current.x = Math.max(-1.15, Math.min(1.15, tgtRotationRef.current.x));
      } else {
        cardGroup.position.x += dx * 0.008;
        cardGroup.position.y -= dy * 0.008;
        cardGroup.position.x = Math.max(-6, Math.min(6, cardGroup.position.x));
        cardGroup.position.y = Math.max(-3, Math.min(3, cardGroup.position.y));
      }

      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragRef.current = false;
      clearTimeout(autoRotTimer);
      autoRotTimer = setTimeout(() => {
        if (!detailProject) autoRot = true;
      }, 4200);
    };

    // Click to open detail
    const handleCanvasClick = (e: MouseEvent) => {
      if (detailProject) return;
      tempMouse.x = mouseRef.current.x;
      tempMouse.y = mouseRef.current.y;
      raycaster.setFromCamera(tempMouse, camera);
      const hits = raycaster.intersectObjects(meshes);
      if (hits.length) {
        const proj = hits[0].object.userData as Project;
        setDetailProject(proj);
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('click', handleCanvasClick);

    // RAF Loop
    let animationFrameId: number;
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    const quat = new THREE.Quaternion();
    const AUTO_SPEED = 0.00022;

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);

      if (viewModeRef.current === 'sphere') {
        // Reset cardGroup layout position to center if it was panned in grid mode
        cardGroup.position.lerp(new THREE.Vector3(0, 0, 0), LERP);

        if (!isDragRef.current) {
          tgtRotationRef.current.x *= FRIC;
          tgtRotationRef.current.y *= FRIC;
          tgtRotationRef.current.x += tgtRotationRef.current.x * (1 - FRIC); // drift damping
          
          if (autoRot) {
            tgtRotationRef.current.y += AUTO_SPEED;
          }
        }
        curRotationRef.current.x += (tgtRotationRef.current.x - curRotationRef.current.x) * LERP;
        curRotationRef.current.y += (tgtRotationRef.current.y - curRotationRef.current.y) * LERP;

        euler.set(curRotationRef.current.x, curRotationRef.current.y, 0, 'YXZ');
        quat.setFromEuler(euler);
        cardGroup.quaternion.copy(quat);
      } else {
        // Grid View Mode
        // Slow return to zero rotation for cardGroup, but tilt on mouse move
        const targetTiltX = -mouseRef.current.y * 0.15;
        const targetTiltY = mouseRef.current.x * 0.15;
        
        curRotationRef.current.x += (targetTiltX - curRotationRef.current.x) * LERP;
        curRotationRef.current.y += (targetTiltY - curRotationRef.current.y) * LERP;

        euler.set(curRotationRef.current.x, curRotationRef.current.y, 0, 'YXZ');
        quat.setFromEuler(euler);
        cardGroup.quaternion.copy(quat);
      }

      renderer.render(scene, camera);
    };

    tick();

    // Resize Handler
    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('click', handleCanvasClick);
      clearTimeout(autoRotTimer);

      meshes.forEach((m) => {
        m.geometry.dispose();
        if (m.material instanceof THREE.MeshBasicMaterial) {
          if (m.material.map) m.material.map.dispose();
          m.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [hasStarted]);

  // Animate layouts when viewMode changes
  useEffect(() => {
    if (!hasStarted) return;
    const meshes = meshesRef.current;
    const cardTransforms = cardTransformsRef.current;
    if (!meshes.length || !cardTransforms.length) return;

    if (cameraRef.current) {
      const targetCamZ = viewMode === 'sphere' ? 0.001 : 12;
      gsap.to(cameraRef.current.position, {
        z: targetCamZ,
        duration: 1.4,
        ease: 'power3.inOut'
      });
    }

    // Switch view animations using GSAP
    if (viewMode === 'sphere') {
      // 1. Zoom camera to center
      gsap.to('.gallery-canvas', { duration: 1.2 }); // dummy
      meshes.forEach((mesh, idx) => {
        const transform = cardTransforms[idx];
        gsap.to(mesh.position, {
          x: transform.spherePos.x,
          y: transform.spherePos.y,
          z: transform.spherePos.z,
          duration: 1.4,
          delay: idx * 0.01,
          ease: 'power3.inOut',
        });

        const startQuat = mesh.quaternion.clone();
        const animObj = { t: 0 };
        gsap.to(animObj, {
          t: 1,
          duration: 1.4,
          delay: idx * 0.01,
          ease: 'power3.inOut',
          onUpdate: () => {
            mesh.quaternion.slerpQuaternions(startQuat, transform.sphereQuat, animObj.t);
          },
        });
      });
    } else {
      // Grid mode
      meshes.forEach((mesh, idx) => {
        const transform = cardTransforms[idx];
        gsap.to(mesh.position, {
          x: transform.gridPos.x,
          y: transform.gridPos.y,
          z: transform.gridPos.z,
          duration: 1.4,
          delay: idx * 0.01,
          ease: 'power3.inOut',
        });

        const startQuat = mesh.quaternion.clone();
        const animObj = { t: 0 };
        gsap.to(animObj, {
          t: 1,
          duration: 1.4,
          delay: idx * 0.01,
          ease: 'power3.inOut',
          onUpdate: () => {
            mesh.quaternion.slerpQuaternions(startQuat, transform.gridQuat, animObj.t);
          },
        });
      });
    }
  }, [viewMode, hasStarted]);

  return (
    <div className="gallery-section select-none" ref={containerRef}>
      {loading && (
        <div className="gallery-loader">
          <h1>Sphere Gallery</h1>
          <p>Loading Experience</p>
          <div className="lbar-wrap">
            <div className="lbar" style={{ width: `${loadPercent}%` }} />
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="gallery-canvas" />

      {/* Top Nav Overlay */}
      <nav className="gallery-nav">
        <a className="gallery-logo" href="#work">
          <div className="logo-ring">
            <svg viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#fff" strokeWidth="1.1" />
              <ellipse cx="7" cy="7" rx="2.5" ry="5.5" stroke="#fff" strokeWidth="1.1" />
              <line x1="1.5" y1="7" x2="12.5" y2="7" stroke="#fff" strokeWidth="1.1" />
            </svg>
          </div>
          Sphere
        </a>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="gallery-pill">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 2.5h9M2.5 5.5h6M4.5 8.5h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Filter
          </button>
          <a className="gallery-pill" href="mailto:hello@huygenstudios.com">
            Let&#8217;s Talk &rarr;
          </a>
        </div>
      </nav>

      {/* Left View Mode Toggle controls */}
      <div className="gallery-side">
        <button
          className={`sv ${viewMode === 'sphere' ? 'on' : ''}`}
          onClick={() => handleViewModeChange('sphere')}
          title="Sphere view"
        >
          <svg viewBox="0 0 15 15">
            <circle cx="7.5" cy="7.5" r="5.5" />
            <ellipse cx="7.5" cy="7.5" rx="2.5" ry="5.5" />
            <line x1="2" y1="7.5" x2="13" y2="7.5" />
          </svg>
        </button>
        <button
          className={`sv ${viewMode === 'grid' ? 'on' : ''}`}
          onClick={() => handleViewModeChange('grid')}
          title="Grid view"
        >
          <svg viewBox="0 0 15 15">
            <rect x="2" y="2" width="4.5" height="4.5" rx="1" />
            <rect x="8.5" y="2" width="4.5" height="4.5" rx="1" />
            <rect x="2" y="8.5" width="4.5" height="4.5" rx="1" />
            <rect x="8.5" y="8.5" width="4.5" height="4.5" rx="1" />
          </svg>
        </button>
      </div>

      {/* Dynamic Tooltip */}
      <div className={`gallery-tip ${showTooltip ? 'show' : ''}`} style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}>
        <span className="tip-title">{tooltipText.title}</span>
        <span className="tip-sub">{tooltipText.sub}</span>
      </div>

      {/* Bottom Bar controls */}
      <div className="gallery-bottom">
        <button className="snd" onClick={toggleAudio}>
          Sound [{isPlaying ? 'ON' : 'OFF'}]
        </button>
        <nav className="bottom-nav">
          <a
            href="#work"
            className={activeTab === 'work' ? 'on' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('work');
            }}
          >
            Work
          </a>
          <a
            href="/about"
            className={activeTab === 'about' ? 'on' : ''}
          >
            About
          </a>
          <a
            href="/contact"
            className={activeTab === 'careers' ? 'on' : ''}
          >
            Careers
          </a>
        </nav>
        <div />
      </div>

      {/* Modal Detailed Project View */}
      {detailProject && (
        <div className="gallery-detail open" role="dialog" aria-modal="true" aria-label="Project detail">
          <div className="d-head">
            <button className="d-back" onClick={handleCloseDetail}>
              <svg viewBox="0 0 13 13">
                <polyline points="8.5,2 3.5,6.5 8.5,11" />
              </svg>
              Back to Gallery
            </button>
            <a className="gallery-pill" href="mailto:hello@huygenstudios.com">
              Let&#8217;s Talk &rarr;
            </a>
          </div>
          <div className="d-body">
            <div className="d-tags">
              {detailProject.tags.map((t, idx) => (
                <span key={idx} className="d-tag">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="d-title">{detailProject.title}</h2>
            <p className="d-client">
              {detailProject.client} — {detailProject.year}
            </p>
            <div className="d-img">
              {detailImgUrl && <img src={detailImgUrl} alt={detailProject.title} />}
            </div>
            <p className="d-desc">{detailProject.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
