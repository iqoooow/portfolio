import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Reusable animation variants
export const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const slideInLeft = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

export const slideInRight = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
};

export const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Default transition config
export const spring = { duration: 0.6, ease: [0.16, 1, 0.3, 1] };
export const fast = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };

// Page Transition Wrapper
export const PageTransition = ({ children }) => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

// Section entrance animation
export const SectionReveal = ({ children, className = '', delay = 0 }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
        {children}
    </motion.div>
);

// Animated counter (for stats)
export const AnimatedNumber = ({ value, suffix = '' }) => {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            {value}{suffix}
        </motion.span>
    );
};
