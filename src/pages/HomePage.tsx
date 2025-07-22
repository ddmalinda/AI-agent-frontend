import { useSelector } from "react-redux";
import type { RootState } from "../app/store"
import { Navigate } from "react-router-dom";
import { pagesLinkpath } from "../path/LinkPath";
import CommoneWrapLayout from "../commen/CommoneWrapLayout";
import AddAiAgent from "../commen/componets/buttons/AddAiAgent";
import { useEffect, useState } from "react";
import axios from "axios";
import BusinessModal from "./homePage/BusinessModal";

type Props = {}

interface BusinessDetails {
  businessName: string;
  businessType: string;
  industry: string;
  description: string;
  businessLogo: File | null;
}
export default function HomePage({ }: Props) {
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails[]>([]);
  const [editingBusinessDetails, seteditingBusinessDetails] = useState<BusinessDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const firstName = useSelector((state: RootState) => state.auth.firstName);


  // If not authenticated or no firstName, redirect to login page
  if (!isAuthenticated || !firstName) {
    return <Navigate to={pagesLinkpath.login} replace />;
  }

  useEffect(() => {

    const fetchBusiness = async () => {
      try {
        const response = await axios.get('/api/businessDetails')
        setBusinessDetails(response.data)
      } catch (error) {
        // Use mock data if API fails
        console.error('Error fetching products:', error)
      }
    }

    fetchBusiness();
  }, [])

  // Handle opening edit modal
  const handleBusiness = () => {
    console.log("handleBusiness")
 
    setIsModalOpen(true)
  }

  //handle closing edit modal
  const handleCloseModal = () => {
    seteditingBusinessDetails(null);
    setIsModalOpen(false)
  }

  //handle add business details
  const handleAddBusinessDetails = async (formData: BusinessDetails) => {
    try {
      const response = await axios.post('/api/businessDetails', {
        ...formData,
      })
      setBusinessDetails([...businessDetails, response.data])
      handleCloseModal()
    } catch (error) {
      console.error('Error add business details:', error)
      alert('Failed to business. Please try again.')
    }

  }
  return (
    <CommoneWrapLayout>
      <div>
        <AddAiAgent handleBusiness={handleBusiness}/>
      </div>
      <BusinessModal
        isOpen={isModalOpen}
        businessDetails={editingBusinessDetails}
        onClose={handleCloseModal}
        onSave={handleAddBusinessDetails} />

    </CommoneWrapLayout>
  )
}