import React from 'react'

export function HonorItem(props) {
  return (
    <div className={`w-full flex ${(props.justify === "start") ? "justify-start" : "justify-end"} relative`}>
      <div className={`w-full h-48 flex justify-center items-center gap-3
        lg:w-3/4 sm:gap-10 ${props.justify === 'start' ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="w-1/2 h-full flex flex-col justify-center items-center gap-3">
          <h3 className="text-lg sansbold flex justify-center items-center relative
            before:absolute before:w-[110%] before:h-1/2 before:bg-blue-500 before:opacity-25
            lg:text-3xl">
            {props.title}
          </h3>
          <p className="text-center text-xs sm:text-base">
            {props.description}
          </p>
        </div>
        <div className="bg-slate-200 shadow-sm shadow-slate-400 w-32 h-32 rounded-full lg:w-48 lg:h-48"></div>
      </div>
    </div>
  )
}