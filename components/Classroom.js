import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';

export default function Classroom({ room, status }) {
  return (
    <div className='bg-white rounded-xl p-5 grid grid-cols-2 w-full max-w-xl'>
      <span className="font-bold mr-2">{room}</span>
      <div className='justify-self-end'>
        <span>Status: </span>
        <span className=''>{status ? "In Use" : "Open"}</span>
        <span><FontAwesomeIcon className={`text-xs pl-2 animate-pulse ${status ? 'text-red-600' : 'text-green-600' }`} icon={faDotCircle} /></span>
        <span className=""></span>
      </div>
    </div>
  )
}