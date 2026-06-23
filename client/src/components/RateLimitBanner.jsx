import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore} from '../store/app.store.js';
 
export const RateLimitBanner = () => {
    const { isThrottled, cooldownSeconds,decrementCooldownClock } = useAppStore();
     
    // Handle the active countdown interval loop
    useEffect(() => {
        if (!isThrottled || cooldownSeconds <= 0) return;
         
        const liveClock = setInterval(() => {
            decrementCooldownClock();
        }, 1000);

        // Clean up the interval when the banner hides or unmounts
        return () => clearInterval(liveClock);
    }, [isThrottled, cooldownSeconds, decrementCooldownClock]);

    return (
        <AnimatePresence>
            {isThrottled &&  (
                <motion.div
                    initial={{ opacity: 0, y: -80, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -80, x: '-50%' }}
                    transition= {{ type: 'spring', stiffness: 110, damping: 14 }}
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        zIndex: 10000,
                        backgroundColor: '#FEF3C7', // Soft amber/yellow container background
                        color:  '#92400E', // High contrast dark amber text
                        border: '1px solid #FCD34D',
                        padding: '12px 20px',
                        borderRadius: '10px',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fontSize: '14px',
                        fontWeight: '500',
                    }}
                >
                    <span>  </span>
                    <span>
                        Github operations throttled. Pausing active tasks safely for {' '}
                        <strong style={{ fontWeight: '700' }}>{cooldownSeconds}s</strong> to maintain rate compliance.
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
