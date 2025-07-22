
type Props = {
    loading:boolean,
}

export default function SubmitButton({loading }: Props) {
    return (
        <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            disabled={loading}
        >
            Submit
        </button>
    )
}