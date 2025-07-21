import React from 'react'

type Props = {
    onClose: () => void
}

export default function CloseButoon({onClose }: Props) {
    return (
        <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    )
}