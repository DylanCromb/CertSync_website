import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CredentialCard } from "../../hero/components/CredentialCard";
import { CredentialCardBack } from "../../hero/components/CredentialCardBack";
import type { CredentialType } from "../../hero/types/animation.types";

const CREDENTIAL_TYPES: CredentialType[] = [
    'first-aid', 'heights', 'forklift',
    'high-risk-work', 'confined-space', 'drivers-license',
    'white-card', 'certificate', 'first-aid',
    'forklift', 'heights', 'high-risk-work',
];

const CARD_WIDTH = 180;
const CARD_HEIGHT = 114;
const CARD_SCALE = 0.75;

export default function ScrollMorphHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Tagline fades in while cards are still organising
    const taglineOpacity = useTransform(scrollYProgress, [0.20, 0.40], [0, 1]);

    // Button appears just as cards finish settling
    const ctaOpacity = useTransform(scrollYProgress, [0.50, 0.65], [0, 1]);
    const ctaY = useTransform(scrollYProgress, [0.50, 0.65], [16, 0]);

    return (
        // 200vh: animation completes by ~55%, leaving ~90vh of settled hero before next section
        <div ref={containerRef} style={{ height: '200vh', position: 'relative', width: '100%' }}>
            <div style={{
                position: 'sticky',
                top: 0,
                width: '100%',
                height: '100vh',
                background: 'linear-gradient(to bottom right, #050b1e, #0d1c3b, #1a2a4e)',
                overflow: 'hidden'
            }}>
                {/* Title — always visible */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 100,
                    textAlign: 'center',
                    pointerEvents: 'none'
                }}>
                    <h1 style={{
                        fontSize: '5rem',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        marginBottom: '1rem',
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}>
                        CertSync
                    </h1>

                    {/* Tagline fades in mid-animation */}
                    <motion.p style={{
                        fontSize: '1.35rem',
                        color: '#FFFFFF',
                        fontWeight: '600',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        marginBottom: '2rem',
                        marginTop: 0,
                        maxWidth: '760px',
                        lineHeight: 1.35,
                        opacity: taglineOpacity,
                    }}>
                        Track worker and contractor compliance records before they become a problem.
                    </motion.p>

                    {/* Book a Demo — appears as cards lock into place */}
                    <motion.div style={{
                        opacity: ctaOpacity,
                        y: ctaY,
                        pointerEvents: 'auto',
                    }}>
                        <a
                            href="https://www.certsync.com.au/book-demo.html"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.875rem 2rem',
                                borderRadius: '999px',
                                border: 'none',
                                background: 'rgba(255,255,255,0.92)',
                                color: '#0d1c3b',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                letterSpacing: '0.8px',
                                textTransform: 'uppercase' as const,
                                boxShadow: '0 20px 40px rgba(7,18,46,0.3)',
                                cursor: 'pointer',
                                textDecoration: 'none',
                            }}
                        >
                            Book a Demo
                        </a>
                    </motion.div>
                </div>

                {/* Cards — organise from circle into grid by 55% scroll */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    {CREDENTIAL_TYPES.map((type, i) => {
                        const angle = (i / 12) * 360;
                        const rad = (angle * Math.PI) / 180;
                        const circleRadius = 420;
                        const circleX = Math.cos(rad) * circleRadius - (CARD_WIDTH / 2);
                        const circleY = Math.sin(rad) * circleRadius - (CARD_HEIGHT / 2);

                        let gridX = 0;
                        let gridY = 0;

                        if (i < 2) {
                            gridX = (i - 0.5) * 220 - (CARD_WIDTH / 2);
                            gridY = -260 - (CARD_HEIGHT / 2);
                        } else if (i >= 2 && i < 6) {
                            gridX = -420 - (CARD_WIDTH / 2);
                            gridY = ((i - 2) - 1.5) * 140 - (CARD_HEIGHT / 2);
                        } else if (i >= 6 && i < 10) {
                            gridX = 420 - (CARD_WIDTH / 2);
                            gridY = ((i - 6) - 1.5) * 140 - (CARD_HEIGHT / 2);
                        } else {
                            gridX = ((i - 10) - 0.5) * 220 - (CARD_WIDTH / 2);
                            gridY = 260 - (CARD_HEIGHT / 2);
                        }

                        // Cards finish organising at 55% — locked in for remaining 45%
                        const x = useTransform(scrollYProgress, [0, 0.55], [circleX, gridX]);
                        const y = useTransform(scrollYProgress, [0, 0.55], [circleY, gridY]);

                        return (
                            <motion.div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    x,
                                    y,
                                    width: CARD_WIDTH,
                                    height: CARD_HEIGHT,
                                    transformStyle: 'preserve-3d',
                                    scale: CARD_SCALE,
                                }}
                            >
                                <motion.div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        transformStyle: 'preserve-3d'
                                    }}
                                    whileHover={{ rotateY: 180, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden'
                                    }}>
                                        <CredentialCard type={type} index={i} />
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)'
                                    }}>
                                        <CredentialCardBack type={type} />
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
