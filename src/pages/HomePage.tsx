import { useSelector } from "react-redux";
import type { RootState } from "../app/store"
import { Navigate } from "react-router-dom";
import { pagesLinkpath } from "../path/LinkPath";
import CommoneWrapLayout from "../commen/CommoneWrapLayout";
import AddAiAgent from "../commen/componets/buttons/AddAiAgent";
import { useEffect, useState } from "react";
import BusinessModal from "./homePage/BusinessModal";
import BusinessCartsList from "./homePage/BusinessCartsList";
import apiClient from "../util/api";

type Props = {}

interface BusinessDetails {
  name: string;
  type: string;
  industry: string;
  description: string;
}
export default function HomePage({ }: Props) {
  const [businessDetailsList, setBusinessDetailsList] = useState<BusinessDetails[]>([]);
  const [loading,setLoading]=useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const firstName = useSelector((state: RootState) => state.auth.firstName);
    const userId = useSelector((state: RootState) => state.auth.userId);


  // If not authenticated or no firstName, redirect to login page
  if (!isAuthenticated || !firstName) {
    return <Navigate to={pagesLinkpath.login} replace />;
  }

  const fetchBusinessDetails = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get(`/api/users/${userId}/businesses`)
        setBusinessDetailsList(response.data)
      } catch (error) {
        // Use mock data if API fails
        console.error('Error fetching products:', error)
      }finally{
         setLoading(false); 
      }
    }
  useEffect(() => {
    
     if (userId) {
      fetchBusinessDetails();
    }
  }, [userId])

  // Handle opening edit modal
  const handleOpenModel = () => {
    setIsModalOpen(true)
  }

  //handle closing edit modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  //handle add business details
  const handleAddBusinessDetails = async (formData: BusinessDetails) => {
   setLoading(true)
  try {
    const response = await apiClient.post(`/api/users/${userId}/businesses`, formData)
      setBusinessDetailsList(prev => [...prev, response.data])
      handleCloseModal()
      alert('Business added successfully!')
  } catch (error) {
    console.error('Error add business details:', error)
    alert('Failed to add business. Please try again.')
  } finally {
    setLoading(false); 
  }
  }
  return (
    <CommoneWrapLayout>
      <div>
        <AddAiAgent handleOpenModel={handleOpenModel}/>
      </div>
      <BusinessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddBusinessDetails} 
        
        />

        {loading?"Loading....":
      <BusinessCartsList businessDetails={businessDetailsList}/>}
    </CommoneWrapLayout>
  )
}