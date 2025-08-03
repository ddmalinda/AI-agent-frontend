import { useState } from "react"
import SubTitle from "../commen/componets/titles/SubTitle"
import ReplyMessegeAnimetion from "../commen/componets/animetions/ReplyMessegeAnimetion"
import apiClient from "../util/api"
import MessageInputBox from "./aiAgent/MessageInputBox"
import MessageList from "./aiAgent/MessageList"
import { useParams } from "react-router-dom"

type Message = {
    id: number
    text: string
    sender: 'user' | 'ai'
    timestamp: Date
}

type Props = {}

export default function AiAgent({ }: Props) {
    const { businessId } = useParams<{ businessId: string }>();

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
        try{
            
            const response = await apiClient.post(`/api/aiagent/${businessId}/generate`, {
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
        }catch(e){
              setIsLoading(false)
              console.log(e)
              const aiMessage: Message = {
                id: Date.now() + 1,
                text: "Something went wrong. Please try again later.",
                sender: 'ai',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiMessage])
           
        }

    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="container mx-auto px-4 py-6 rounded-2xl max-w-4xl bg-white  shadow-md p-6 m-5">
                {/* Header */}
                <div className=" ">
                    <div className="text-center">
                        <SubTitle title="Chat with AI Agent" />
                        <p className="text-gray-600 text-sm mt-2">Ask anything about business</p>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="h-96 flex flex-col">
                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto scrollbar-hide space-y-4 ">
                            <MessageList messages={messages}/>

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <ReplyMessegeAnimetion />
                            </div>
                        )}
                    </div>
                    <MessageInputBox
                        handleKeyPress={handleKeyPress}
                        handleSendMessage={handleSendMessage}
                        inputMessage={inputMessage}
                        isLoading={isLoading}
                        setInputMessage={setInputMessage}
                    />
                </div>
            </div>
    )
}