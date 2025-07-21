import  { useEffect, useState } from "react"
import CommoneWrapLayout from "../commen/CommoneWrapLayout"
import { linkPath } from "../path/LinkPath"
import BusinessInformation from "./productListPage/BusinessInformation"
import ProductTable from "./productListPage/ProductTable"
import axios from "axios"
import ProductModal from "./productListPage/ProductModal"

type Props = {}

const businessData = {
    image: linkPath.logoImage,
    name: "TechVision Electronics",
    industry: "Electronics & Technology",
    type: "E-commerce Retailer"
}

const tableTitels = [
    { title: 'No', width: 'w-16' }, // Small width for product number
    { title: 'Name', width: 'w-30' }, // Medium width for name
    { title: 'Discription', width: 'w-60' }, // Large width for description
    { title: 'categarory', width: 'w-15' }, // Medium width for category
    { title: 'Price', width: 'w-15' },  // Small width for price

]
const productlist = [
    {
        id: 1,
        name: "iPhone 14 Pro",
        description: "Latest Apple smartphone with advanced camera system and A16 Bionic chip",
        category: "Electronics",
        price: 999.99,
        stock: 25
    },
    {
        id: 2,
        name: "Nike Air Max 270",
        description: "Comfortable running shoes with air cushioning technology",
        category: "Footwear",
        price: 129.99,
        stock: 50
    },
    {
        id: 3,
        name: "MacBook Air M2",
        description: "Lightweight laptop with M2 chip, perfect for productivity and creativity",
        category: "Electronics",
        price: 1199.99,
        stock: 15
    },
    {
        id: 4,
        name: "Levi's 501 Jeans",
        description: "Classic straight-fit denim jeans in vintage blue wash",
        category: "Clothing",
        price: 89.99,
        stock: 75
    },
    {
        id: 5,
        name: "Sony WH-1000XM4",
        description: "Wireless noise-canceling headphones with premium sound quality",
        category: "Electronics",
        price: 349.99,
        stock: 30
    },
    {
        id: 6,
        name: "Instant Pot Duo 7-in-1",
        description: "Multi-functional pressure cooker for quick and easy meal preparation",
        category: "Kitchen",
        price: 79.99,
        stock: 40
    },
    {
        id: 7,
        name: "The North Face Jacket",
        description: "Waterproof outdoor jacket perfect for hiking and camping",
        category: "Clothing",
        price: 199.99,
        stock: 20
    },
    {
        id: 8,
        name: "Samsung 4K Smart TV",
        description: "55-inch Ultra HD Smart TV with HDR and streaming capabilities",
        category: "Electronics",
        price: 649.99,
        stock: 12
    }
]

interface Product {
    id: number
    name: string
    price: number
    category: string
    description: string
}

export default function ProductListPage({ }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Fetch products
    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products')
                setProducts(response.data)
            } catch (error) {
                   // Use mock data if API fails
                console.error('Error fetching products:', error)
            }
        }

        fetchProducts();
    }, [])

    // Handle opening edit modal
    const handleProduct = (product: Product) => {
        setEditingProduct(product)
        setIsModalOpen(true)
    }

    // Handle closing edit modal
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingProduct(null)
    }

    // Handle saving edited product
    const handleSaveEdit = async (formData: any) => {
       try {
        if (editingProduct) {
            // Edit existing product
            const response = await axios.put(`/api/products/${editingProduct.id}`, {
                ...formData,
                price: parseFloat(formData.price)
            })
            
            // Update the product in the local state
            setProducts(products.map(product => 
                product.id === editingProduct.id ? { ...product, ...response.data } : product
            ))
        } else {
            // Add new product
            const response = await axios.post('/api/products', {
                ...formData,
                price: parseFloat(formData.price)
            })
            
            // Add the new product to the local state
            setProducts([...products, response.data])
        }
        
            // Close modal
            handleCloseModal()
            
        } catch (error) {
            console.error('Error saving product:', error)
            alert('Failed to save product. Please try again.')
        }
    }


    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/api/products/${id}`)
            } catch (error) {
                console.error('Error deleting product:', error)
            }
        }
    }
    return (
        <CommoneWrapLayout>
            <div className="flex">
                <BusinessInformation image={businessData.image} name={businessData.name} industry={"Industry: " + businessData.industry} type={"Type: " + businessData.type} />
            </div>
            <ProductTable 
            tableTitels={tableTitels}
            productlist={productlist}
            handleDelete={handleDelete}
            handleProduct={handleProduct}/>
            {/* Edit Product Modal */}
            <ProductModal
                isOpen={isModalOpen}
                product={editingProduct}
                onClose={handleCloseModal}
                onSave={handleSaveEdit}
            />
        </CommoneWrapLayout>
    )
}