
type Props = {}

export default function ({ }: Props) {
    return (
 <div className="fixed top-4 right-4 z-50">
                <iframe
                    src="http://localhost:5173/aiagent/1"
                    title="AI Chat Agent"
                    width="400"
                    height="700"
                    className="border border-gray-300 rounded-lg shadow-lg"
                />
            </div>
    )
}