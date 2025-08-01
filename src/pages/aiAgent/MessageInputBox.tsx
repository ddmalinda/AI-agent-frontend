import MessageSendButoon from "../../commen/componets/buttons/MessageSendButoon"

type Props = {
    inputMessage: string,
    handleKeyPress: (e: React.KeyboardEvent) => void,
    isLoading: boolean,
    handleSendMessage: () => Promise<void>,
    setInputMessage: React.Dispatch<React.SetStateAction<string>>,
}
export default function MessageInputBox({ inputMessage, setInputMessage, handleKeyPress, isLoading, handleSendMessage }: Props) {
    return (
        <div className="p-4">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                />
                <MessageSendButoon handleSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
        </div>
    )
}