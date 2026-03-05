import React from "react";
import { motion } from "framer-motion";
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
    return (
        <div style={{
            height: '100vh',
            position: 'relative',
            width: '100%',
            background: 'linear-gradient(to bottom right, #050b1e, #0d1c3b, #1a2a4e)',
            overflow: 'hidden'
        }}>
            {/* Title, tagline and CTA — all visible on load */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 100,
                    textAlign: 'center',
                }}
            >
                <h1 style={{
                    fontSize: '5rem',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginBottom: '1rem',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}>
                    CertSync
                </h1>

                <p style={{
                    fontSize: '1.5rem',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    marginBottom: '2rem',
                    marginTop: 0,
                }}>
                    Compliance. Organised.
                </p>

                <a
                    href="https://www.certsync.com.au/contact.html"
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

            {/* Cards in final organised grid positions */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                transform: 'translate(-50%, -50%)'
            }}>
                {CREDENTIAL_TYPES.map((type, i) => {
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

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.05 * i }}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                x: gridX,
                                y: gridY,
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
    );
}
