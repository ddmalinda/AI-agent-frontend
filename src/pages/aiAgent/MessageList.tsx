import { motion,AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react"
import formatMessageText from "../../util/formatMessageText"

type Props = {
    messages:Message[]
}
interface Message {
    id: number
    text: string
    sender: 'user' | 'ai'
    timestamp: Date
}

export default function MessageList({messages }: Props) {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Auto scroll to bottom when new message is added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'end'
        })
    }, [messages])


    return (
        <>
        <div className="space-y-3">
            <AnimatePresence>
                {messages.map((message) => (
                    <motion.div
                        key={message.id}
                        initial={{ 
                            opacity: 0, 
                            y:0,
                            scale: 0.5
                        }}
                        animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: 1
                        }}
                        transition={{ 
                            duration: 0.5,
                            ease: "easeIn"
                        }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`
                                max-w-xs lg:max-w-md px-4 py-2 rounded-2xl
                                ${message.sender === 'user'
                                    ? 'bg-blue-500 text-white rounded-br-sm' 
                                    : 'bg-gray-200 text-gray-800 rounded-bl-sm'
                                }
                            `}
                        >
                            <div 
                                    className="text-sm prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ 
                                        __html: formatMessageText(message.text) 
                                    }}
                                />
                            <p className={`text-xs mt-1 ${
                                message.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                            }`}>
                                {message.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            <div ref={messagesEndRef}/>
        </div>
        </>
    )
}