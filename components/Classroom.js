import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircleDot, faCircleInfo, faDotCircle, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Transition } from '@headlessui/react';
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Classroom({ room, status, endTime, startTime }) {
  const [moreInfoActive, setMoreInfoActive] = useState(false);
  return (
    <div className='bg-neutral-200/60 text-black dark:bg-[#353941] dark:text-slate-200 rounded-xl w-full'>
      <div className='p-2 grid grid-cols-3 w-full max-w-lg'>
        <div className="col-span-2 w-fit p-2 transition rounded-xl ">
          <div className="font-semibold">{room}</div>
        </div>
        <div className="justify-self-end">
          <div className='flex items-center text-xs'>
            <div>
              <span className='font-semibold'>{status ? " In Use" : " Open"}</span>
              <span><FontAwesomeIcon className={`text-xs pl-2 ${status ? 'text-red-600' : 'text-green-600'}`} icon={faCircleDot} /></span>
              <div onClick={() => setMoreInfoActive(!moreInfoActive)} className="btn btn-sm btn-circle btn-outline ml-2 cursor-pointer w-fit p-2 transition">
                <FontAwesomeIcon icon={faChevronDown} className={`transition ` + (moreInfoActive ? 'rotate-180' : '')} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {endTime && (
        <div className={`flex flex-col py-4 font-semibold text-xs items-center justify-center ${inter.className}`}>
          {(() => {
            const currentTime = new Date().getTime();
            const startTimeMillis = startTime.getTime()
            const endTimeMillis = endTime.getTime();
            const totalDurationMillis = endTimeMillis - startTimeMillis;
            const elapsedMillis = currentTime - startTimeMillis;

            const diffMillis = endTimeMillis - currentTime;
            if (diffMillis < 0) {
              return "Class has ended. Please refresh";
            }

            const diffMinutes = Math.ceil(diffMillis / 1000 / 60);
            const hours = Math.floor(diffMinutes / 60);
            const minutes = diffMinutes % 60;

            if (hours > 0) {
              return (
                <div className='flex flex-col items-center justify-center'>
                  <div className='flex flex-row justify-between w-full text-[10px] opacity-85'>
                    <span>{startTime.toLocaleString().split(", ")[1].replace(":00", "")}</span>
                    <span>{endTime.toLocaleString().split(", ")[1].replace(":00", "")}</span>
                  </div>
                  <progress className="progress w-56 mb-4" value={elapsedMillis} max={totalDurationMillis}></progress>
                  <span>Ends in {hours} hours and {minutes} minutes</span>
                </div>
              );
            }
            return (
              <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-row justify-between w-full text-[10px] opacity-85'>
                    <span>{startTime.toLocaleString().split(", ")[1].replace(":00", "")}</span>
                    <span>{endTime.toLocaleString().split(", ")[1].replace(":00", "")}</span>
                  </div>
                <progress className="progress w-56 mb-4" value={elapsedMillis} max={totalDurationMillis}></progress>
                <span className=''>Ends in {minutes} minutes</span>
              </div>);
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
          </div>
        </Transition>
      </div>
    </div>
  )
}