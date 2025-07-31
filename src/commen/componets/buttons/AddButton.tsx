type Props = {
    handleAddProduct: () => void
}

export default function AddButton({ handleAddProduct }: Props) {
    return (
        <div>
            <button
                onClick={() => handleAddProduct()}
                className="m-1 p-2 rounded-lg border-2 border-gray-400 hover:border-gray-600 text-gray-600 hover:text-gray-800 hover:bg-green-50 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
            </button>
        </div>
    )
}