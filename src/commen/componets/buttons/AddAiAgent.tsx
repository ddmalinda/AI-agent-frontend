type Props = {
     handleOpenModel: () => void
}

export default function AddAiAgent({handleOpenModel}: Props) {
    return (
        <button 
        onClick={()=>{handleOpenModel()}}
        className="flex gap-5 tex border border-gray-400 m-5 py-2 px-5 rounded-lg bg-white font-plusjakarta text-gray-700 hover:text-gray-950 hover:border-gray-950 transition-all duration-300 ease-in-out transform hover:scale-103">
            Add Ai Agent
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
        </button>

        
    )
}