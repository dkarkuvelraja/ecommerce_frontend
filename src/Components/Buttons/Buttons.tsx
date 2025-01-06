import React from 'react';

export function LargeButtonArrow() {
  return (
    <button className='flex items-center justify-center text-primary text-sm p-1.5 px-3 border border-primary rounded'>
        <span>
            View more
        </span>
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap='round' strokeLinejoin="round" className="lucide lucide-arrow-right">
            <path d="M5 12h16"/>
            <path d="m16 7 5 5-5 5"/>
        </svg>
        </span>
    </button>  
  )
}
