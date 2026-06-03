import React, { useEffect } from 'react'
import avtrimg from '../assets/Avtrimg.png'
import { NavLink } from 'react-router-dom'
import { FaCheck, FaEdit } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProfile } from '../features/profile/profileSlice'

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <p className="text-blue-500">Loading user...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p className="text-gray-500">No user found</p>;

  return (
    <div className="p-8 relative">
      <div className="w-full rounded-3xl shadow-xl overflow-hidden p-10 bg-white relative">
        <div className='w-full flex justify-between items-center text-center py-5'>
          <h1 className="text-2xl font-semibold text-gray-700">Profile</h1>
          <NavLink to="/editprofile" className="text-blue-600 "><FaEdit /></NavLink>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative w-24 h-24 rounded-full border border-gray-200">
            {/* {formData.avatar ? <img src={src} alt="Profile" className="w-full h-full object-cover rounded-full" /> : <FaUser size={20} className="w-full h-full object-cover rounded-full p-2"/>} */}
            <img src={avtrimg} alt="Profile" className="w-full h-full object-cover rounded-full" />
            <button className="absolute bottom-1 right-1 bg-blue-600 text-white rounded-full p-1 border border-white"> <FaEdit size={12} /></button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
            <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">{profile.fullname}</div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
            <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">{profile.email}</div>
            <FaCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-500 mb-1">Number</label>
            <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">{profile.contact}</div>
            <FaCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">City</label>
            <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">{profile.city}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">State</label>
            <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">{profile.state}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Zip Code</label>
            <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">{profile.zipcode}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Country</label>
            <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">{profile.country}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile