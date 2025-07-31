import React, { useState, useEffect } from 'react'
import CloseButoon from '../../commen/componets/buttons/CloseButoon'
import ProductFrom from './ProductFrom'


interface Product {
    id?: number| undefined
    name: string
    price: number
    category: string
    description: string
}

type EditProductModalProps ={
    isOpen: boolean,
    tempProductDeatils: Product | null,
    onClose: () => void,
    onSave: (formData: any) => void,
    loadingProductFrom:boolean,
}

export default function ProductModal({ isOpen, tempProductDeatils, onClose, onSave ,loadingProductFrom}: EditProductModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        category: '',
        description: ''
    })

    // Fill form with product data when product changes
    useEffect(() => {
        if (tempProductDeatils) {
            setFormData({
                name: tempProductDeatils.name,
                price: tempProductDeatils.price,
                category: tempProductDeatils.category,
                description: tempProductDeatils.description
            })
        }
    }, [tempProductDeatils])

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
    if (!isOpen) return null

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
                <ProductFrom
                 handleSubmit={handleSubmit}
                 formData={formData}
                 handleInputChange={handleInputChange}
                 onClose={onClose}
                 loadingProductFrom={loadingProductFrom}
                 />
                
            </div>
        </div>
    )
}