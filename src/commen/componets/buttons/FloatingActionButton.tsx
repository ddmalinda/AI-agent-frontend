import { motion, AnimatePresence } from 'framer-motion'
type Props = {
    state: boolean,
    onClick: (state: boolean) => void,
}

export default function FloatingActionButton({ state, onClick }: Props) {
    return (

        <motion.button

            onClick={() => onClick(!state)}
            className='bg-red-700 hover:bg-red-900 text-white rounded-full p-4 shadow-lg'

            whileHover={{
                scale: 1.1,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
                backgroundColor: state ? '#82181a' : '#dc2626',
                rotate: state ? 45 : 0
            }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}

        >
            <AnimatePresence mode="wait">
                {state ? (
                    // Close icon
                    <motion.svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </motion.svg>
                ) : (
                    // Chat icon
                    <motion.svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </motion.svg>
                )}
            </AnimatePresence>
        </motion.button>


    )
}