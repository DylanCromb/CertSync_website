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

const CARD_WIDTH = 180;  // Reduced from 240
const CARD_HEIGHT = 114; // Reduced from 152
const CARD_SCALE = 0.75; // 75% of original size

export default function ScrollMorphHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Tagline fades in as you scroll
    const taglineOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

    return (
        <div ref={containerRef} style={{ height: '450vh', position: 'relative', width: '100%' }}>
            <div style={{
                position: 'sticky',
                top: 0,
                width: '100%',
                height: '100vh',
                background: 'linear-gradient(to bottom right, #050b1e, #0d1c3b, #1a2a4e)',
                overflow: 'hidden'
            }}>
                {/* Title - ALWAYS VISIBLE */}
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

                    {/* Tagline fades in below title */}
                    <motion.p style={{
                        fontSize: '1.5rem',
                        color: '#FFFFFF',
                        fontWeight: '600',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        opacity: taglineOpacity
                    }}>
                        Compliance. Organised.
                    </motion.p>
                </div>


                {/* Cards Container */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    {CREDENTIAL_TYPES.map((type, i) => {
                        // Circle position - centered around viewport center
                        const angle = (i / 12) * 360;
                        const rad = (angle * Math.PI) / 180;
                        const circleRadius = 420; // Slightly smaller circle
                        const circleX = Math.cos(rad) * circleRadius - (CARD_WIDTH / 2);
                        const circleY = Math.sin(rad) * circleRadius - (CARD_HEIGHT / 2);

                        // Grid position - frame layout around title (closer spacing)
                        let gridX = 0;
                        let gridY = 0;

                        if (i < 2) {
                            // Top: 2 cards
                            gridX = (i - 0.5) * 220 - (CARD_WIDTH / 2);
                            gridY = -260 - (CARD_HEIGHT / 2);
                        } else if (i >= 2 && i < 6) {
                            // Left side: 4 cards vertically
                            gridX = -420 - (CARD_WIDTH / 2);
                            gridY = ((i - 2) - 1.5) * 140 - (CARD_HEIGHT / 2);
                        } else if (i >= 6 && i < 10) {
                            // Right side: 4 cards vertically
                            gridX = 420 - (CARD_WIDTH / 2);
                            gridY = ((i - 6) - 1.5) * 140 - (CARD_HEIGHT / 2);
                        } else {
                            // Bottom: 2 cards
                            gridX = ((i - 10) - 0.5) * 220 - (CARD_WIDTH / 2);
                            gridY = 260 - (CARD_HEIGHT / 2);
                        }

                        // Animation completes by 70% of scroll, stays organized for final 30%
                        const x = useTransform(scrollYProgress, [0, 0.7], [circleX, gridX]);
                        const y = useTransform(scrollYProgress, [0, 0.7], [circleY, gridY]);

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
