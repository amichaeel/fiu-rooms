import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';

export default function Classroom({ room, status }) {
  return (
    <div className='px-2'>
      <div className='border border-black p-5 grid grid-cols-2 w-full min-w-lg max-w-lg'>
        <span className="font-bold mr-2">{room}</span>
        <div className='justify-self-end'>
          <span>Status: </span>
          <span className=''>{status ? "Class In Progress" : "Open"}</span>
          <span><FontAwesomeIcon className={`text-xs pl-2 ${status ? 'text-red-600' : 'text-green-600'}`} icon={faDotCircle} /></span>
          <span className=""></span>
        </div>
      </div>
    </div>
  )
}