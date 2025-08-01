import LoadingAnimetion from "../animetions/LoadingAnimetion"

type Props = {
    loading: boolean,
}

export default function SubmitButton({ loading }: Props) {
    return (
        <button
            type="submit"
            className={`
                px-6 py-2 rounded-md transition-colors font-medium
                ${loading 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                }
            `}
            disabled={loading}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <LoadingAnimetion/>
                    Submitting
                </div>
            ) : (
                'Submit'
            )}
        </button>
    )
}