import SubTitle from "../commen/componets/titles/SubTitle"
import CommoneWrapLayout from "../commen/CommoneWrapLayout"
import SubmitButton from "../commen/componets/buttons/SubmitButton"
import { useState } from "react"
import axios from "axios"

type Props = {}

interface BusinessFormData {
  businessName: string;
  businessType: string;
  industry: string;
  description: string;
  businessLogo: File | null;
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




export default function BusinessDetails({ }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<BusinessFormData>({
    businessName: '',
    businessType: '',
    industry: '',
    description: '',
    businessLogo: null,
  })

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

    if (!formData.businessName.trim()) {
      setError('Business name is required');
      return;
    }else{
      setError('');
    }

    if (!formData.businessType) {
      setError('Please select a business type');
      return;
    }

    if (!formData.industry) {
      setError('Please select a business industry');
      return;
    }

    if (!formData.description.trim()) {
      setError('Business description is required');
      return;
    }

    if (formData.businessName.trim().length < 2) {
      setError('Business name must be at least 2 characters');
      return;
    }

    if (formData.description.trim().length < 10) {
      setError('Description must be at least 10 characters');
      return;
    }

    setLoading(true)

    try {
      const uploadData = new FormData();
      // Append text fields
      uploadData.append('businessName', formData.businessName);
      uploadData.append('businessType', formData.businessType);
      uploadData.append('industry', formData.industry);
      uploadData.append('description', formData.description);

      // Append logo file
      if (formData.businessLogo) {
        uploadData.append('businessLogo', formData.businessLogo);
      }

      // Send to API
      const response = await axios.post(
        '/api/ai-agent/setup',
        uploadData,
        {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Success:', response.data);
      // Handle success (e.g., redirect or show success message)


    } catch (e) {
      console.error('Error:', error);
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <CommoneWrapLayout>
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-bgcolor">
        <div className="w-full max-w-3xl mx-auto px-4 py-8">
          <form onSubmit={hadleSubmit} className="bg-white shadow rounded-lg  p-6">
            <div className="mb-6" >
              <SubTitle title="Enter Business Details" />
            </div>
            <div className="space-y-4">

              <div>
                {/* business name */}
                <label className="block text-gray-700 font-medium mb-2">Business Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  required
                />
              </div>

              <div>
                {/* business type */}
                <label className="block text-gray-700 font-medium mb-2">Business Type</label>
                <select required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {businessType.map((val, key) => {
                    return (
                      <option value={val.value} key={key}>{val.name}</option>
                    )
                  })}
                </select>
              </div>

              <div>
                {/* business industry*/}
                <label className="block text-gray-700 font-medium mb-2">Business Industry</label>
                <select required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {businessIndustry.map((val, key) => {
                    return (
                      <option value={val.value} key={key}>{val.name}</option>
                    )
                  })}
                </select>
              </div>

              <div>
                {/* business description */}
                <label className="block text-gray-700 font-medium mb-2">Business Description</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your business"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div>
                {/* business logo */}
                <label className="block text-gray-700 font-medium mb-2">Business Logo (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {logoPreview && (
                  <img src={logoPreview} alt="Logo preview" className="mt-2 h-20 w-20 object-cover rounded" />
                )}
              </div>

              {/* Error display */}
              {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <div className="mt-8 flex justify-end">
                <SubmitButton loading={loading} />
              </div>
            </div>
          </form>
        </div>
      </div >
    </CommoneWrapLayout >
  )
}