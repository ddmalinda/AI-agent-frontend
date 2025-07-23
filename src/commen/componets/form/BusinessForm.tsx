import CancelButton from "../buttons/CancelButton"
import CloseButoon from "../buttons/CloseButoon"
import SubmitButton from "../buttons/SubmitButton"
import SubTitle from "../titles/SubTitle"

type Props = {
    hadleSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    formData: {
        name: string;
        type: string;
        industry: string;
        description: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        type: string;
        industry: string;
        description: string;
    }>>;
    businessType: Array<{ name: string; value: string }>;
    businessIndustry: Array<{ name: string; value: string }>;
    handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    logoPreview: string | null;
    error?: string;
}

export default function BusinessForm({
    hadleSubmit,
    onClose,
    formData,
    setFormData,
    businessType,
    businessIndustry,
    handleLogoUpload,
    loading,
    logoPreview,
    error
}: Props) {
    return (
        <form onSubmit={hadleSubmit} className="bg-white shadow rounded-lg  p-6">
            <div className="mb-6 flex justify-between" >
                <SubTitle title="Enter Business Details" />
                <CloseButoon onClose={onClose} />
            </div>
            <div className="space-y-4">

                <div>
                    {/* business name */}
                    <label className="block text-gray-700 font-medium mb-2">Business Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your business name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                    />
                </div>

                <div>
                    {/* business type */}
                    <label className="block text-gray-700 font-medium mb-2">Business Type</label>
                    <select
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    > {businessType.map((val, key) => {
                        return (
                            <option value={val.value} key={key}>{val.name}</option>
                        )
                    })}
                    </select>
                </div>

                <div>
                    {/* business industry*/}
                    <label className="block text-gray-700 font-medium mb-2">Business Industry</label>
                    <select
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.industry}
                        onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                    >
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

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <CancelButton onClose={onClose} />
                        <SubmitButton loading={loading} />
                    </div>
                </div>
            </div>
        </form>
    )
}