import './landpage.scss'

import gsap from 'gsap';
import { useRef, useEffect } from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

import MyIcon from '../assets/my_icon.svg';
import ReactImg from '../assets/react.svg';
import SpringImg from '../assets/spring.svg';
import NodeImg from '../assets/node.svg';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Landpage() {
    const containerRef = useRef(null);
    
    const ctx1Ref = useRef(null);
    const ctx2Ref = useRef(null);
    const ctx3Ref = useRef(null);
    const ctx3_5Ref = useRef(null);

    const canvasRef = useRef(null);

    useGSAP(() => {
        function createTimeline(ctx, start, end) {
            if (!ctx.current) return null;
            
            return gsap.timeline({
                scrollTrigger: {
                    trigger: ctx.current,
                    pin: true,
                    start: start,
                    end: end,
                    scrub: true,
                },
            });
        }

        function timelineAnimation(timeline, ctx, duration, scale, autoAlpha, x, y){
            if (!timeline || !ctx.current) return timeline;
            
            return timeline.to(ctx.current, {
                duration: duration,
                autoAlpha: autoAlpha,
                x: x,
                y: y,
                scale: scale
            });
        }
        

        const tl = createTimeline(
            ctx1Ref,
            'center center',
            '+=2300'
        );

        timelineAnimation(tl, ctx1Ref, 1, 1, 1, 0, 0);
        timelineAnimation(tl, ctx1Ref, 1, 1.8, 1, 0, 0);
        timelineAnimation(tl, ctx1Ref, 1, 0.8, 0, 0, '-200px');

        const tl2 = createTimeline(
            ctx2Ref,
            'center center',
            '+=1300'
        );

        timelineAnimation(tl2, ctx2Ref, 1, 1, 1, 0, 0);
        timelineAnimation(tl2, ctx2Ref, 1, 1.1, 1, 0, 0);
        timelineAnimation(tl2, ctx2Ref, 1, 1.2, 0, '200px', 0);

        const tl3 = createTimeline(
            ctx3Ref,
            'center center',
            '+=1500'
        );

        timelineAnimation(tl3, ctx3Ref, 1, 1, 1, 0, 0);
        timelineAnimation(tl3, ctx3Ref, 1, 2, 1, 0, 0);
        timelineAnimation(tl3, ctx3Ref, 1, 2, 0, 0);

        const tl3_5 = createTimeline(
            ctx3_5Ref,
            'center center',
            '+=1300'
        );

        timelineAnimation(tl3_5, ctx3_5Ref, 1.1, 1, 1, 0, 0);
        timelineAnimation(tl3_5, ctx3_5Ref, 1.3, 2, 1, 0, 0);
        timelineAnimation(tl3_5, ctx3_5Ref, 1.3, 1, 0, 0, 0);

    }, {scope: containerRef});

    const angleRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cubeVertices = [
            {"x": -5, "y": -5, "z": -5},
            {"x": -5, "y": 5, "z": -5},
            {"x": 5, "y": -5, "z": -5},
            {"x": 5, "y": 5, "z": -5},

            {"x": -5, "y": -5, "z": 5},
            {"x": -5, "y": 5, "z": 5},
            {"x": 5, "y": -5, "z": 5},
            {"x": 5, "y": 5, "z": 5}
        ];

        const cubeEdges = [
            [0, 1], [0, 2], [1, 3], [2, 3],
            [4, 5], [4, 6], [5, 7], [6, 7],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ];

        function projectedPoint(vertex){
            const focalLength = 500;
            const cameraDistance = 30;

            const z = vertex.z + cameraDistance;
            if (z <= 0) return { x: 0, y: 0 };

            return {
                x: (vertex.x * focalLength) / z + canvas.width / 2,
                y: (vertex.y * focalLength) / z + canvas.height / 2
            }
        }

        function drawSquare(x, y){
            ctx.strokeStyle = '#0ae';
            ctx.lineWidth = 2;

            const cos = Math.cos(angleRef.current);
            const sin = Math.sin(angleRef.current);

            // for (let i = 0; i < cubeVertices.length; i++){
            //     const vertex = cubeVertices[i];

            //     const projected = projectedPoint(vertex);

            //     ctx.fillRect(projected.x, projected.y, vertex.z, vertex.z);
            // }

            for (const [start, end] of cubeEdges) {
                const v1 = cubeVertices[start];
                const v2 = cubeVertices[end];

                const rotatedV1 = {
                    x: v1.x * cos - v1.z * sin,
                    y: v1.y,
                    z: v1.x * sin + v1.z * cos
                }

                const rotatedV2 = {
                    x: v2.x * cos - v2.z * sin,
                    y: v2.y,
                    z: v2.x * sin + v2.z * cos
                }

                const p1 = projectedPoint(rotatedV1);
                const p2 = projectedPoint(rotatedV2);

                ctx.beginPath();
                ctx.moveTo((p1.x + x), (p1.y + y));
                ctx.lineTo((p2.x + x), (p2.y + y));
                ctx.stroke();
            }
        }

        function animation() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawSquare(0, 0);

            angleRef.current += 0.003;

            if (angleRef.current > Math.PI * 2) 
                angleRef.current = 0;

            requestAnimationFrame(animation);
        }

        animation();
    }, []);

    return (
        <div className="contentLandpage" ref={containerRef}>
            <div className='ctx_1'>
                <h1 ref={ctx1Ref}>Seja bem vindo(a)!</h1>
            </div>

            <div className='ctx_2' ref={ctx2Ref}>
                <div>
                    <h1>Meu nome é <span><strong>Gabriel</strong></span></h1>

                    <h3>Sou um desenvolvedor full-stack junior<br/>
                    e desenvolvo APIs e aplicações mobile, <br/>
                    front-end e back-end utilizando <span>React, <br/>
                    React-Native, Spring-Boot e Node.js
                    </span></h3>

                    <div className="content_img">
                        <div className="content">
                            <h3>React</h3>
                            <img src={ReactImg} alt="React" />
                        </div>
                        <div className="content">
                            <h3>Spring-Boot</h3>
                            <img src={SpringImg} alt="Spring" />
                        </div>
                        <div className="content">
                            <h3>Node.js</h3>
                            <img src={NodeImg} alt="Node" />
                        </div>
                    </div>
                </div>
                
                <div className='content_right'> 
                    <img src={MyIcon} alt="Pixel Art"/>
                </div>
            </div>

            <div className="ctx_3" ref={ctx3Ref}>
                <canvas ref={canvasRef} width={800} height={600}/>
            </div>

            <div className='ctx_3.5' ref={ctx3_5Ref}>
                <h1>Teste</h1>
            </div>
        </div>
    );
}