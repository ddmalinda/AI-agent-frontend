type Props = {
    handleSendMessage: () => Promise<void>,
    isLoading: boolean,
}

export default function MessageSendButoon({ handleSendMessage, isLoading }: Props) {
    return (
        <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-red-700 text-white px-6 py-2 rounded-full hover:bg-red-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        </button>
    )
}