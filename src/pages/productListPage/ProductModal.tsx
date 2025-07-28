import React, { useState, useEffect } from 'react'
import CloseButoon from '../../commen/componets/buttons/CloseButoon'
import SubmitButton from '../../commen/componets/buttons/SubmitButton'
import CancelButton from '../../commen/componets/buttons/CancelButton'

interface Product {
    id: number
    name: string
    price: number
    category: string
    description: string
}

interface EditProductModalProps {
    isOpen: boolean
    product: Product | null
    onClose: () => void
    onSave: (formData: any) => void
}

export default function ProductModal({ isOpen, product, onClose, onSave }: EditProductModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: ''
    })

    // Fill form with product data when product changes
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price.toString(),
                category: product.category,
                description: product.description
            })
        }
    }, [product])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Don't render if modal is not open
    if (!isOpen || !product) return null

    return (
        // Dark background overlay - this is the key part!
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal content */}
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
                    <CloseButoon onClose={onClose} />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            step="0.01"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <CancelButton onClose={onClose}/>
                        <SubmitButton loading={true}/>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}