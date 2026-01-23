import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    city: '',
  });
  const [errors, setErrors] = useState({});

  const districts = [
    'Ernakulam (Kochi)',
    'Thiruvananthapuram',
    'Kozhikode',
    'Thrissur',
    'Kottayam',
    'Alappuzha',
    'Palakkad',
    'Malappuram',
    'Kannur',
    'Kasaragod',
    'Idukki',
    'Wayanad',
    'Pathanamthitta',
    'Kollam',
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.city.trim()) newErrors.city = 'City/Village is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem('user', JSON.stringify(formData));
    navigate('/select');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Find Your Lawyer
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Connect with legal experts in Kerala
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all outline-none ${
                  errors.name
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 focus:border-indigo-500 focus:bg-white'
                }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="district"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                District
              </label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all outline-none ${
                  errors.district
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 focus:border-indigo-500 focus:bg-white'
                }`}
                aria-invalid={!!errors.district}
                aria-describedby={errors.district ? 'district-error' : undefined}
              >
                <option value="">Select a district</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p id="district-error" className="text-red-500 text-sm mt-1 font-medium">
                  {errors.district}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                City / Village
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city or village"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all outline-none ${
                  errors.city
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 focus:border-indigo-500 focus:bg-white'
                }`}
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? 'city-error' : undefined}
              />
              {errors.city && (
                <p id="city-error" className="text-red-500 text-sm mt-1 font-medium">
                  {errors.city}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg mt-8"
            >
              Continue
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs md:text-sm mt-6">
            Your information is secure and private
          </p>
        </div>
      </div>
    </div>
  );
}
