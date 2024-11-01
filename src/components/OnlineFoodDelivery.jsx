import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

function OnlineFoodDelivery ({data}) {
  return (
    <div>
    <div className='mt-8'>
        <h1 className='text-black font-bold text-xl'>Restaurants with online food delivery in Hyderabad</h1>
    </div>

    <div className='flex gap-2 items-center'>
      <div className=' bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
          <span className='text-[12px] font-semibold'>Filter</span>
          <i className="fi fi-rr-settings-sliders mt-[6px] text-[12px] font-semibold"></i>
      </div>
      <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
          <span className='text-[12px] font-semibold'>Sort By</span>
          <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
      </div>
      <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
          <span className='text-[12px] font-semibold'>Food Deleivery</span>
          <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
      </div>
      <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
          <span className='text-[12px] font-semibold'>New on Swiggy</span>
          <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
      </div>
      <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
          <span className='text-[12px] font-semibold'>Rating 4.0</span>
          <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
      </div>
      <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
          <span className='text-[12px] font-semibold'>Pure Vet</span>
          <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
      </div>
      <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
          <span className='text-[12px] font-semibold'>Offers</span>
          <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
      </div>
      <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
          <span className='text-[12px] font-semibold'>Rs.300-Rs.600</span>
          <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
      </div>
      <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
          <span className='text-[12px] font-semibold'>Less than Rs. 300</span>
          <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
      </div>
    </div>

      <div
      className='grid grid-cols-4 gap-2 mt-4'
      >
        {
          data.map(({info,cta:{link}})=>{
            return(
              <Card key={info.id} {...info} link={link} width="218"/>
            )
          })
        }
      </div>
    </div>
  )
}





export default OnlineFoodDelivery 