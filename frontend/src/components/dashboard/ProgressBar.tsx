import React from 'react'

const ProgressBar:React.FC<{value: number}> = ({value}) => {
  return (
    <div className='w-full bg-gray-300 rounded-full h-4 '>
        <div className='bg-blue-600 h-4 rounded-full text-white text-xs font-bold flex item-center justify-center transition-all duration-300' style={{width: `${value*20}%`}}>{value}%</div>
    </div>
  )
}

export default ProgressBar

// import React from 'react'

// interface Value {
//   value: number
// }

// const ProgressBar:React.FC<Value> = ({value}) => {
//   return (
//     <div className='w-full bg-gray-300 rounded-full h-4 '>
//         <div className='bg-blue-600 h-4 rounded-full text-white text-xs font-bold flex item-center justify-center transition-all duration-300' style={{width: `${value*20}%`}}>{value}%</div>
//     </div>
//   )
// }

// export default ProgressBar