type Props = {
    onClose: () => void
}

export default function CancelButton({ onClose}: Props) {
    return (
        <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
            Cancel
        </button>
    )
}