import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store"
import {useNavigate } from "react-router-dom";
import { pagesLinkpath } from "../path/LinkPath";
import CommoneWrapLayout from "../commen/CommoneWrapLayout";
import AddAiAgent from "../commen/componets/buttons/AddAiAgent";
import { useState } from "react";
import BusinessModal from "./homePage/BusinessModal";
import BusinessCartsList from "./homePage/BusinessCartsList";
import apiClient from "../util/api";
import { fetchBusinessDetails } from "../freatuers/business/businessSlice";
import { useBusinessDataFetching } from "../hooks/useBusinessDataFetching";

type Props = {}

interface BusinessDetails {
  id: number,
  name: string;
  type: string;
  industry: string;
  description: string;
}
export default function HomePage({ }: Props) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingForm,setLoadingForm] = useState(false)
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const businessDetails = useSelector((state: RootState) => state.business.businessDetails);
  const businessFetching = useSelector((state: RootState) => state.business.businessFetching)
  const businessError = useSelector((state: RootState) => state.business.businessFetchingError)

  // Custom hook for business data fetching
      useBusinessDataFetching();

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
   setLoadingForm(true)
    try {
      await apiClient.post(`/api/users/${userId}/businesses`, formData)
      dispatch(fetchBusinessDetails(userId!));
      handleCloseModal()
      alert('Business added successfully!')
    } catch (error) {
      console.error('Error add business details:', error)
      alert('Failed to add business. Please try again.')
    }
    setLoadingForm(false)
  }
  const handleBusinessButton=(businessId:number)=>{
   navigate(pagesLinkpath.productListPage+`/${businessId}`);
  }
  return (
    <CommoneWrapLayout>
      <div>
        <AddAiAgent handleOpenModel={handleOpenModel} />
      </div>
      <BusinessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddBusinessDetails}
        loadingForm={loadingForm}
      />
      {businessFetching === 'pending' && <div>Loading businesses...</div>}
      {businessFetching === 'rejected' && <div>Error: {businessError}</div>}
      {businessFetching === 'fulfilled' && (
        <BusinessCartsList businessDetails={businessDetails} handleBusinessButton={handleBusinessButton} />
      )}
    </CommoneWrapLayout>
  )
}