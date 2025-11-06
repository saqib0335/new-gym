import React, {useState, useEffect} from 'react'
import axios from 'axios'

const MembershipPlan = () => {
           const [data, setData] = useState([]) 
           useEffect(() => 
            { axios.get("/api/v1/membership-plans") 
              .then(res => setData(res.data.data)) 
              .catch(err => console.error(err)) 
            },[])
  return (
    <div className='flex justify-center min-h-screen bg-gray-100
     dark:bg-gray-900 transition-colors'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='mt-5 text-center font-bold text-2xl text-emerald-700'>FitPass Fitness Plans For Members</h2>
         <div className='m-4'>
           <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-15'>
            {data.map((gym) => (
            <div key={gym.id} className='bg-white rounded-2xl flex py-10 px-10
             transition-shadow duration-400 flex-col items-bottom justify-between
             shadow-lg hover:shadow-2xl dark:bg-gray-800 dark:text-white'>
              
                <h2 className='font-bold text-xl text-emerald-700'>{gym.name}</h2>
                  <p className='mt-3 font-semibold text-2xl'>{gym.price}</p>
                  <ul className='mt-4 space-y-4'>
                      {gym.features.map((features, index) => (
                       <li className='' key={index}>• {features}</li>
                       ))}
                  </ul>
              
              <button className='text-white bg-emerald-500 rounded-xl px-4 py-2 
              mt-2 w-full hover:cursor-pointer'>Subscribe Now</button>
            </div>
          ))}
        </div>
         </div>
      </div>
    </div>
  
  )
}

export default MembershipPlan