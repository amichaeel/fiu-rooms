import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { Transition } from '@headlessui/react';
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Classroom({ room, status, endTime }) {
  const [moreInfoActive, setMoreInfoActive] = useState(false);
  return (
    <div className='border border-black m-2 h-full w-full'>
      <div className='px-3 py-2 grid grid-cols-2 w-full h-full max-w-lg'>
        <div className="font-bold">{room}</div>
        <div className="justify-self-end">
          <div className='flex h-full items-center text-xs'>
            <div className='flex items-center'>
              <span className=''>{status ? " Class In Progress" : " Open"}</span>
              <span><FontAwesomeIcon className={`text-xs pl-2 ${status ? 'text-red-600' : 'text-green-600'}`} icon={faDotCircle} /></span>
            </div>
          </div>
        </div>
      </div>
      {endTime && (
        <div className={`flex flex-col py-2 font-semibold text-xs items-center justify-center ${inter.className}`}>
          {(() => {
            const currentTime = new Date().getTime();
            const endTimeMillis = endTime.getTime();
            const diffMillis = endTimeMillis - currentTime;
            if (diffMillis < 0) {
              return "Class has ended. Please refresh";
            }
            const diffMinutes = Math.ceil(diffMillis / 1000 / 60);
            const hours = Math.floor(diffMinutes / 60);
            const minutes = diffMinutes % 60;
            if (hours > 0) {
              return `Ends in ${hours} hours and ${minutes} minutes (${endTime.toLocaleString().split(", ")[1].replace(":00", "")})`;
            }
            return `Ends in ${minutes} minutes (${endTime.toLocaleString().split(", ")[1].replace(":00", "")})`;
          })()}
        </div>
      )}
      <div onClick={() => setMoreInfoActive(!moreInfoActive)} className='w-full flex flex-col cursor-pointer items-center bg-black/[5%] transition gap-2 p-1 justify-center text-xs border border-t-black'>
        <div className="flex transition lg:hover:bg-[rgb(182,134,44)] items-center justify-center bg-[rgb(8,30,63)] text-white uppercase w-full p-2 gap-2">
          <span className={`text-[7pt] font-monumentExtended`}>Room information</span>
          <FontAwesomeIcon icon={faChevronDown} className={`transition ` + (moreInfoActive ? 'rotate-180' : '')} />
        </div>
        <Transition
          show={moreInfoActive}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo=" transform opacity-100 scale-100"
          leave="transition ease-in duration-300"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className='flex flex-col text-center items-center justify-center m-3'>
            <span className='font-semibold'>More information about this classroom be available here soon!</span>
            <span>Ex: Fixed Seating, Podium PC, Tables and Chairs, Tiered Seating, Video Conferencing</span>
            <span>Max Copacity: 34</span>
            {/* <span className='font-light text-[8pt] pt-6'>Note: To use some of the classrooms features, you must notify FIU. FIU Rooms is not responsible for any unauthorized use of equipment.</span> */}
          </div>
        </Transition>
      </div>
    </div>
  )
}