import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userInfo, updateUser, changePassword } from '../../features/auth/authSlice'

const CustomerProfile = () => {
  const { user, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  })

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    dispatch(userInfo())
  }, [dispatch])

  // Update profile form when user data loads
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
      })
    }
  }, [user])

  // Handle profile input changes
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  // Handle password input changes
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    })
  }

  // Submit profile edit
  const editPersonalDetail = async (e) => {
    e.preventDefault()
    
    try {
      const result = await dispatch(
        updateUser({
          id: user._id || user.id,
          ...profileData,
        })
      ).unwrap()

      alert('Profile updated successfully!')
      setIsEditingProfile(false)
    } catch (error) {
      alert(error || 'Failed to update profile')
    }
  }

  // Submit password change
  const handleChangePassword = async (e) => {
    e.preventDefault()

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }

    try {
      await dispatch(
        changePassword({
          password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        })
      ).unwrap()

      alert('Password changed successfully!')
      setIsChangingPassword(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      alert(error || 'Failed to change password')
    }
  }

  // Cancel edit mode
  const cancelEdit = () => {
    setIsEditingProfile(false)
    setProfileData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
    })
  }

  // Cancel password change
  const cancelPasswordChange = () => {
    setIsChangingPassword(false)
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  if (isLoading && !user) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        {/* Profile Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            )}
          </div>

          {!isEditingProfile ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">First Name</p>
                  <p className="font-medium text-lg">{user?.firstName}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Last Name</p>
                  <p className="font-medium text-lg">{user?.lastName}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-medium text-lg">{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Phone</p>
                <p className="font-medium text-lg">{user?.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Member Since</p>
                <p className="font-medium text-lg">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={editPersonalDetail} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Security</h2>
            {!isChangingPassword && (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Change Password
              </button>
            )}
          </div>

          {!isChangingPassword ? (
            <div>
              <p className="text-gray-600">
                Keep your account secure by using a strong password and changing it regularly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  minLength={6}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {isLoading ? 'Changing...' : 'Change Password'}
                </button>
                <button
                  type="button"
                  onClick={cancelPasswordChange}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile