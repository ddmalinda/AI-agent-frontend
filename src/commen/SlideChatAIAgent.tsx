import { useState } from "react"
import apiClient from "../util/api"
import FloatingActionButton from "./componets/buttons/FloatingActionButton"
import CloseButoon from "./componets/buttons/CloseButoon"
import MessageList from "../pages/aiAgent/MessageList"
import ReplyMessegeAnimetion from "./componets/animetions/ReplyMessegeAnimetion"
import MessageInputBox from "../pages/aiAgent/MessageInputBox"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
    businessId:string | undefined
}
interface Message {
    id: number
    text: string
    sender: 'user' | 'ai'
    timestamp: Date
}
export default function SlideChatAIAgent({ businessId}: Props) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm your AI Agent. How can I help you today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ])
    const [inputMessage, setInputMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)


    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return

        const userMessage: Message = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputMessage("")
        setIsLoading(true)

        const response = await apiClient.post(`api/aiagent/1/generate`, {
            prompt: inputMessage
        })

        const aiMessage: Message = {
            id: Date.now() + 1,
            text: response.data,
            sender: 'ai',
            timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
        setIsLoading(false)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }
    const onClose = () => {
        setIsChatOpen(!isChatOpen)
    }

    return (
        <div>
            <div className="fixed bottom-6 right-6">
                <FloatingActionButton onClick={setIsChatOpen} state={isChatOpen} />
            </div>
            <AnimatePresence>

                {isChatOpen && (
                    <motion.div className="fixed bottom-16 bg-white right-0 m-6 shadow w-80 h-9/12 rounded-2xl justify-between items-start"
                        initial={{
                            opacity: 0, scale: 1
                        }}
                        animate={{ 
                            opacity: 1,scale: 1       
                        }}
                        exit={{
                            opacity: 0,scale: 1        
                        }}
                        transition={{
                            type: "tween",            
                            ease: "easeInOut",          
                            duration: 0.3          
                        }}    

                    >
                        <div className="bg-red-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">AI Agent</h3>
                                <p className="text-sm text-blue-100">Online</p>
                            </div>
                            <CloseButoon onClose={onClose} style={"text-white hover:text-gray-200 transition-colors"} />
                        </div>
                        <div className=" h-96 flex flex-col ">
                            {/* Messages Area */}
                            <div className="flex-1 p-3 overflow-y-auto scrollbar-hide space-y-2 ">
                                <MessageList messages={messages} />
                                {/* Loading indicator */}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <ReplyMessegeAnimetion />
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="">
                                <MessageInputBox
                                    handleKeyPress={handleKeyPress}
                                    handleSendMessage={handleSendMessage}
                                    inputMessage={inputMessage}
                                    isLoading={isLoading}
                                    setInputMessage={setInputMessage}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}