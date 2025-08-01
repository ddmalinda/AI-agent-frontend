type Props = {}

export default function ReplyMessegeAnimetion({ }: Props) {
    return (
        <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-bl-sm px-4 py-2">
            <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    )
}