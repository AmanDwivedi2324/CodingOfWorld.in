// 'use client'
// import React from 'react'
// import Image from 'next/image'
// import cowLogo from '../../public/cowLogo.svg'
// import { useState } from 'react'

// const page = () => {
//   const [a, setA] = useState(false)
//   const [b, setB] = useState(false)
//   const [c, setC] = useState(false)
//   const [d, setD] = useState(false)
//   return (
//       <>
//         <div className='flex gap-10 text-white '>
//           <button onClick={()=>{setA(true);setB(false);setC(false);setD(false)}}>Button A</button>
//           <button onClick={()=>{setB(true);setA(false);setC(false);setD(false);}}>Button B</button>
//           <button onClick={()=>{setC(true);setA(false);setB(false);setD(false)}}>Button C</button>
//           <button onClick={()=>{setD(true);setA(false);setB(false);setC(false)}}>Button D</button>
//         </div>
//         {a && <p className='text-white'>A is selected</p>}
//         {b && <p className='text-white'>B is selected</p>}
//         {c && <p className='text-white'>C is selected</p>}
//         {d && <p className='text-white'>D is selected</p>}
//       </>

//   )
// }

// export default page

import React from 'react'

const page = () => {
  return (
    <div className='text-white'>page</div>
  )
}

export default page