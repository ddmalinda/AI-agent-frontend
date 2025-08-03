import BusinessInformation from "./productListPage/BusinessInformation"
import CommoneWrapLayout from "../commen/CommoneWrapLayout"
import ProductTable from "./productListPage/ProductTable"
import ProductModal from "./productListPage/ProductModal"
import type { RootState } from "../app/store"
import { useEffect, useState } from "react"
import { linkPath } from "../path/LinkPath"
import { useSelector } from "react-redux"
import apiClient from "../util/api"
import { useParams } from "react-router-dom"
import AIAgentPageButoon from "../commen/componets/buttons/AIAgentPageButoon"
import SlideChatAIAgent from "../commen/SlideChatAIAgent"

type Props = {}

interface businessData {
    name: string,
    industry: string,
    type: string
}

const tableTitels = [
    { title: 'No', width: 'w-16' }, // Small width for product number
    { title: 'Name', width: 'w-30' }, // Medium width for name
    { title: 'Discription', width: 'w-40' }, // Large width for description
    { title: 'Categarory', width: 'w-15' }, // Medium width for category
    { title: 'Price', width: 'w-15' },  // Small width for price
    {title :"stock",width:'w-15'}

]
interface Product {
    id?: number | undefined
    name: string
    price: number
    category: string
    description: string
    stock:number
}

export default function ProductListPage({ }: Props) {
    const { businessId } = useParams<{ businessId: string }>();

    const [tempProductDeatils, setTempProductDeatils] = useState<Product | null>(null)
    const [loadingProductFrom, setLoadingProductFrom] = useState(false)
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    const [businessData, setusinessData] = useState<businessData>()

    const userId = useSelector((state: RootState) => state.auth.userId);
    const businessDetails = useSelector((state: RootState) => state.business.businessDetails);
    const businessFetching = useSelector((state: RootState) => state.business.businessFetching);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const isValidBusinessId = (InputBusinessId: number | null) => {
        if (!InputBusinessId || !businessDetails || businessDetails.length === 0) {
            return false;
        }

        for (let i = 0; i < businessDetails.length; i++) {
            if (businessDetails[i].id === InputBusinessId) {
                setusinessData(businessDetails[i]);
                return true;
            }
            console.log(businessDetails[i].id)
        }
        return false;

    }
    // Fetch products
    useEffect(() => {

        if (!isAuthenticated || !userId) {
            return;
        }

        if (businessFetching === 'pending') {
            return;
        }

        if (!businessId) {
            setError('Missing business ID');
            return;
        }

        if (!businessId || !userId) {
            setError('Missing business ID or user ID');
            console.log("error ", businessId, userId)
            return;
        }
        const businessIdNumber = parseInt(businessId, 10);
        console.log(businessIdNumber)
        if (!isValidBusinessId(businessIdNumber)) {
            setError('Business not found');
            return;
        }
        setError('')
        setLoading(true)

        const fetchProducts = async () => {
            try {
                const response = await apiClient.get(`api/businesse/${businessId}/products`)
                setProductsList(response.data)
                setLoading(false)
                console.log(response.data)
            } catch (errorAPI) {
                // Use mock data if API fails
                setLoading(false)
                setError('Error fetching products: ' + errorAPI)
            }
        }

        fetchProducts();
    }, [userId, businessId, businessDetails, businessFetching, isAuthenticated]);

    // Handle opening edit modal
    const handleAddProduct = () => {
        setTempProductDeatils({
            name: '',
            price: 0,
            category: '',
            description: '',
            stock:0
        })
        setIsModalOpen(true)
    }

    const handleUpdateProduct = (Product: Product) => {
        setTempProductDeatils(Product)
        setIsModalOpen(true)
    }

    // Handle closing edit modal
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTempProductDeatils(null)
    }


    const handleSubmiteFormProduct = async (formData: Product) => {
        setLoadingProductFrom(true)

        try {
            if (formData.id && productsList.find(product => product.id === formData.id)) {

                console.log('update data data:', formData)
                // Edit existing product
                const response = await apiClient.put(`api/businesse/${businessId}/products/${formData.id}`, {
                    ...formData,
                })
                setProductsList(productsList.map(product =>
                    product.id === formData.id ? { ...product, ...response.data } : product
                ))
            } else {
                console.log('add data data:', formData)
                // Edit existing product
                const response = await apiClient.post(`api/businesse/${businessId}/products`, {
                    ...formData,
                })
                setProductsList([...productsList,response.data])
            }

            // Close the modal
            handleCloseModal()

        } catch (error) {
            console.error('Error saving product:', error)
            alert('Failed to save product. Please try again.')
        }
        setLoadingProductFrom(false)
    }


    const handleDelete = async (id?: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const Response=await apiClient.delete(`api/businesse/${businessId}/products/${id}`)
                setProductsList(productsList.filter(product => product.id !== Response.data.id))
            } catch (error) {
                console.error('Error deleting product:', error)
            }
        }
    }

    return (
        <CommoneWrapLayout>
                 <SlideChatAIAgent businessId={businessId}/>
            <div className="flex justify-between mx-5 my-5 ">
                <BusinessInformation
                    image={linkPath.logoImage}
                    name={businessData?.name || 'Unknown Business'}
                    industry={"Industry: " + (businessData?.industry || 'N/A')}
                    type={"Type: " + (businessData?.type || 'N/A')}
                />
                <div className="left">
                <AIAgentPageButoon businessId={businessId}/>
                </div>
            </div>
            {loading ? (
                <div className="text-center py-8">Loading products...</div>
            ) : error ? (
                <div className="text-center py-8 text-red-500">Error: {error}</div>
            ) : (
                <>
                    <ProductTable
                        handleUpdateProduct={handleUpdateProduct}
                        tableTitels={tableTitels}
                        productlist={productsList}
                        handleDelete={handleDelete}
                        handleAddProduct={handleAddProduct} />
                    {/* Edit Product Modal */}
                    <ProductModal
                        isOpen={isModalOpen}
                        tempProductDeatils={tempProductDeatils}
                        onClose={handleCloseModal}
                        onSave={handleSubmiteFormProduct}
                        loadingProductFrom={loadingProductFrom} />
                </>
            )}
        </CommoneWrapLayout>
    )
}