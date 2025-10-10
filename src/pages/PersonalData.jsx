import {useState, useEffect} from 'react';
import { User, Mail, Phone, MapPin, Calendar, Settings, CreditCard, Award, Target } from 'lucide-react';
import { useAuth } from '../contexts/AutheriseContext'; // Assuming user data is imported from a file

const PersonalData = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');
  const [profileData, setProfileData] = useState({
  avatar: null,
}); // Assuming user data is imported
  console.log("User from useAuth:", user);
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'membership', label: 'Membership', icon: CreditCard },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result;
          setProfileData(prev => ({ ...prev, avatar: base64Image }));
          localStorage.setItem('profileAvatar', base64Image); // Save to local storage
        };
    reader.readAsDataURL(file);
  }
};
    useEffect(() => {
      const savedAvatar = localStorage.getItem('profileAvatar');
      if (savedAvatar) {
        setProfileData(prev => ({ ...prev, avatar: savedAvatar }));
      }
    }, []);
  return (
    <div className='min-h-screen bg-gray-50 pt-6 dark:bg-gray-900 transition-colors'>
       <div className='max-w-9xl mx-auto pt-5 px-6 sm:px-6 lg:px-8'>
           <div className='mb-6'>
              <h2 className='text-gray-700 dark:text-white font-bold text-3xl'>Profile</h2>
              <p className='text-gray-700 dark:text-white text-lg'>Manage your account and preferences</p>
           </div>
           <div className='grid lg:grid-cols-4 gap-8'>
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-2xl shadow-md p-6 mb-4 text-gray-600
                  dark:bg-gray-800 dark:text-white'>
                <div className='text-center mb-6'>
                  <div className='relative inline-block'>
                    <label htmlFor="profile-upload" className='cursor-pointer'>
                      <img 
                        src={profileData?.avatar || user?.avatar || '/default-avatar.png'} 
                        alt="Profile"
                        className='w-20 h-20 mx-auto rounded-full object-cover border border-gray-300'
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center 
                            justify-center text-white opacity-0 hover:opacity-100 transition">
                        <span className="text-sm">Change</span>
                      </div>
                    </label>
                    <input
                      type='file'
                      id='profile-upload'
                      accept="image/*"
                      className='hidden'
                      onChange={handleImageUpload}// You’ll define this
                    />
                  </div>
                  <h3 className='font-medium mt-4'>{user?.name || 'Guest User'}</h3>
                  <p>{user?.email}</p>
                </div>
              </div>
              <nav className='space-y-2'>
                {tabs.map((tab) => (
                  <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)} 
                      className={`w-full flex items-center space-x-3 p-3 hover:cursor-pointer
                        rounded-lg
                      ${activeTab === tab.id ? 'bg-emerald-600 text-white ' : 'text-gray-700'}`}>
                    <tab.icon className='w-6 h-6' />
                    <span className=''>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className='lg:col-span-3'>
              <div className='bg-white rounded-lg shadow-md 
                dark:bg-gray-800 dark:text-white'>
                {activeTab === 'profile' && (
                  <div className='p-6'>
                    <h3 className='text-gray-700 dark:text-white font-semibold text-xl mb-4'>Profile Information</h3>
                    <form className='space-y-6'>
                      <div className='grid lg:grid-cols-2 gap-6'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Full Name
                          </label>
                          <div className='relative'>
                            <User className='absolute left-3 top-1/2 w-5 h-5 transform -translate-y-1/2 text-gray-400'/>
                            <input type='text' defaultValue={user?.name || ''}
                            className='w-full pl-10 py-2 pr-4  rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400
                             focus:border-transparent'/>
                          </div>
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email Address
                          </label>
                          <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 w-5 h-5 transform -translate-y-1/2 text-gray-400'/>
                            <input type='email' defaultValue={user?.email}
                            className='w-full pl-10 py-2 pr-4  rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400
                             focus:border-transparent'/>
                          </div>
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Phone Number
                          </label>
                          <div className='relative'>
                            <Phone className='absolute left-3 top-1/2 w-5 h-5 transform -translate-y-1/2 text-gray-400'/>
                            <input type='text' placeholder='00-123456789'
                            className='w-full pl-10 py-2 pr-4  rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400
                             focus:border-transparent'/>
                          </div>
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Date Of Birth
                          </label>
                          <div className='relative'>
                            <Calendar className='absolute left-3 top-1/2 w-5 h-5 transform -translate-y-1/2 text-gray-400'/>
                            <input type='date'  defaultValue={user?.name || ''}
                            className='w-full pl-10 py-2 pr-4  rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400
                             focus:border-transparent'/>
                          </div>
                        </div>
                      </div>  
                    </form>
                  </div>
                )}
                {activeTab === 'membership' && (
                  <div className='p-6'>
                    <h3 className='text-xl mb-4 text-gray-700 dark:text-white'>Membership Details</h3>
                    <div className='space-y-4 bg bg-gradient-to-r from-emerald-500 to-blue-300 p-6 rounded-lg'>
                      <div className='flex justify-between items-start mb-4'>
                        <div>
                          <h4 className='text-lg font-semibold text-white'>Current Plan</h4>
                          <p className='text-sm text-gray-200'>Premium Membership</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "achievements" && (
                  <div className='p-6'>
                    <h3 className='text-xl mb-4 text-gray-700 dark:text-white'>Achievements</h3>
                  </div>
                )}
              </div>
            </div>
           </div>
       </div>
    </div>
  )
}

export default PersonalData;