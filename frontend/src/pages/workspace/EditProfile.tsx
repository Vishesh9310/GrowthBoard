import React, { useEffect, useState } from "react";
import { FaEdit, FaCheck, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom"; 
import { fetchProfile, updateProfile, clearProfileMessage } from "../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const EditProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, message, error } = useAppSelector(state => state.profile);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    picture:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  });

  // 🟦 Load profile on mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // 🟨 Update local form when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname || "",
        email: profile.email || "",
        contact: profile.contact?.toString() || "",
        city: profile.city || "",
        state: profile.state || "",
        zipcode: profile.zipcode?.toString() || "",
        country: profile.country || "",
        picture: profile.picture || formData.picture,
      });
    }
  }, [profile]);

  // 🟢 Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟣 Save changes (dispatch update)
  const handleSaveChanges = async () => {
    const dataToSend = {
      fullname: formData.fullname,
      contact: Number(formData.contact),
      city: formData.city,
      state: formData.state,
      zipcode: Number(formData.zipcode),
      country: formData.country,
      picture: formData.picture,
    };

    await dispatch(updateProfile(dataToSend));
    setTimeout(() => {
      dispatch(clearProfileMessage());
    }, 3000);
  };

  return (
    <div className="p-8 relative">
      <div className="w-full rounded-3xl shadow-xl overflow-hidden p-10 bg-white relative">
        <h1 className="text-2xl font-semibold text-gray-700 mb-8">
          Edit Profile
        </h1>

        {/* Notification */}
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">
            ✅ {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
            ❌ {error}
          </div>
        )}

        {/* Profile Picture */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative w-24 h-24 rounded-full border border-gray-200 overflow-hidden">
            {formData.picture ? (
              <img
                src={formData.picture}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FaUser
                size={20}
                className="w-full h-full object-cover rounded-full p-2"
              />
            )}
            <button
              className="absolute bottom-1 right-1 bg-blue-600 text-white rounded-full p-1 border border-white"
              onClick={() => alert("Image upload feature coming soon")}
            >
              <FaEdit size={12} />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full bg-gray-100 px-4 py-2 border border-gray-200 rounded-lg cursor-not-allowed"
            />
            <FaCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <NavLink
            to="/workspace/dashboard"
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Back To Home
          </NavLink>
          <button
            onClick={handleSaveChanges}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;