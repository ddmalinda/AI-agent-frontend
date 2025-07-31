
import { useState } from "react"
import BusinessForm from "../../commen/componets/form/BusinessForm";

interface BusinessDetails {
  name: string;
  type: string;
  industry: string;
  description: string;
}
let businessType = [
  { name: 'Select business type', value: "" },
  { name: 'Sole Proprietorship', value: "sole proprietorship" },
  { name: 'Partnership', value: "partnership" },
  { name: 'Limited Liability Company (LLC)', value: "limited liability company (LLC)" },
  { name: 'Franchise', value: "franchise" },
  { name: 'Online Store', value: "online store" },
  { name: 'Other', value: "other" },
]
let businessIndustry = [
  { name: 'Select business industry', value: "" },
  { name: 'Healthcare', value: "healthcare" },
  { name: 'Retail', value: "retail" },
  { name: 'Education', value: "education" },
  { name: 'Information Technology', value: "information technology" },
  { name: 'Other', value: "other" },
]

type BusinessModelProps = {
  isOpen: boolean
  businessDetails?: BusinessDetails
  onClose: () => void
  onSave: (formData: any) => void
  loadingForm:boolean,
}


export default function BusinessModal({ isOpen, businessDetails, onClose, onSave,loadingForm }: BusinessModelProps) {

  const [error, setError] = useState("")

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<BusinessDetails>({
    name: '',
    type: '',
    industry: '',
    description: '',
  })

  if(businessDetails){
    setFormData(businessDetails)
  }

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, businessLogo: file }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      setError('');
    }
  };

  const hadleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setError('');

    if (!formData.name.trim()) {
      setError('Business name is required');
      return;
    } else {
      setError('');
    }

    if (!formData.type || formData.type === '') {
      setError('Please select a business type');
      return;
    }

    if (!formData.industry || formData.industry === '') {
      setError('Please select a business industry');
      return;
    }

    if (!formData.description.trim()) {
      setError('Business description is required');
      return;
    }

    if (formData.name.trim().length < 2) {
      setError('Business name must be at least 2 characters');
      return;
    }

    if (formData.description.trim().length < 10) {
      setError('Description must be at least 10 characters');
      return;
    }
    
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    // fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50
    <div className="flex justify-center items-center fixed inset-0 bg-black/60 bg-opacity-50 z-50">
    <div className="w-full max-w-3xl mx-auto px-4 py-8 max-h-screen overflow-y-auto scrollbar-hide">
        <BusinessForm 
  hadleSubmit={hadleSubmit}
  onClose={onClose}
  formData={formData}
  setFormData={setFormData}
  businessType={businessType}
  businessIndustry={businessIndustry}
  handleLogoUpload={handleLogoUpload}
  logoPreview={logoPreview}
  error={error} 
  loadingForm={loadingForm}
/>
      </div>
    </div >
  )
}