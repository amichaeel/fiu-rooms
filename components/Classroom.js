import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircleDot, faCircleInfo, faDotCircle, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Transition } from '@headlessui/react';
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Classroom({ room, status, endTime }) {
  const [moreInfoActive, setMoreInfoActive] = useState(false);
  return (
    <div className='bg-base-200 flex flex-col items-center justify-center rounded-xl h-full w-full'>
      <div className='p-2 grid grid-cols-3 w-full h-full max-w-lg'>
        <div className="col-span-2 w-fit p-2 transition rounded-xl ">
          <div className="font-semibold md:text-base text-sm">{room}</div>
        </div>
        <div className="justify-self-end">
          <div className='flex h-full items-center text-xs'>
            <div className='flex items-center'>
              <span className='font-semibold'>{status ? " In Use" : " Open"}</span>
              <span><FontAwesomeIcon className={`text-xs pl-2 ${status ? 'text-red-600' : 'text-green-600'}`} icon={faCircleDot} /></span>
              <div onClick={() => setMoreInfoActive(!moreInfoActive)} className="col-span-2 btn btn-sm btn-circle btn-outline ml-2 cursor-pointer w-fit p-2 transition">
                <FontAwesomeIcon icon={faChevronDown} className={`transition ` + (moreInfoActive ? 'rotate-180' : '')} />
              </div>
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
      <div className='flex flex-col cursor-pointer transition gap-2 text-xs'>
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