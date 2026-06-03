import React from 'react';
import img from '../assets/dashblack.png'
import { Link } from 'react-router-dom';

const LandingIntro:React.FC = () => {
  const features = [
    "Skill Tracker with progress bar",
    "Task CRUD with status",
    "Project Portfolio with Repo Links",
    "Certification Upload & Skill Mapping",
    "Learning Roadmap Tracker",
    "Notes/Blog with Rich Text Editor",
    "JWT Protected Routes",
    "Mobile Responsive & PWA-ready"
  ];

  return (
    <div className='space-y-10 px-10 mb-10'>
      <div className='h-fit py-20'>
        <h1 className='w-full py-5 font-bold text-6xl md:text-8xl lg:text-9xl text-center bg-gradient-to-l to-violet-600 via-blue-600 from-cyan-500 bg-clip-text text-transparent'>GrowthBoard</h1>
        <h3 className='w-full text-blue-700 text-lg text-center font-semibold'>Your all-in-one platform for <span className='text-pink-500'>skill tracking, project portfolio, career growth, </span>and<span className='text-pink-500'> productivity.</span> </h3>
      </div>
      
      <div className='h-fit'>
        <h1 className='text-3xl font-semibold text-blue-600'>Our Mission</h1>
        <p>Empower individuals and teams to master in-demand skills, manage career goals, and document learning journeys in a meaningful, organized, and enjoyable way.</p>
      </div>

      <div className='h-fit'>
        <h1><span className='text-3xl font-semibold text-blue-700'>Features</span><br />SuperCharge Your Workflow</h1>
        <div className='py-5 gap-5 grid grid-cols-4'>
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-200 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-blue-600">{feature}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full flex justify-between rounded-2xl shadow-xl shadow-gray-200 px-10 py-5 transition-all duration-900 ease-out transform hover:scale-[1.01]'>
        <div className='w-1/2 space-y-5'>
          <h1 className='text-4xl text-blue-700 w-1/2'>Create And Manage in 3 easy steps</h1>
          <div className='bg-gray-100 w-fit rounded-md p-4'>1. create account</div>
          <div className='bg-gray-100 w-fit rounded-md p-4'>2. input your data or upload .csv file</div>
          <div className='bg-gray-100 w-fit rounded-md p-4'>3. manage</div>
        </div>
        <div className='w-1/2'>
        <img src={img} alt="image not load yet" className='h-full'/>
        </div>
      </div>

      <div className='flex justify-between relative'>
        <div className='h-90 w-1/2 bg-violet-400'>
          <h2 className='w-1/2 text-8xl bg-black text-white absolute bottom-0'>First<br />1<sup>th</sup></h2>
        </div>
        <div className='h-90 w-1/2 bg-blue-400'></div>
        <h2 className='text-8xl text-white absolute bottom-0 left-1/2'>edition</h2>
      </div>

      <div className='bg-gradient-to-l min-h-fit w-full to-violet-600 via-cyan-600 from-blue-700 p-[10%]'>
        <h1 className='text-white font-bold text-5xl mb-10'>Fresh Ideas, Fresh Moments <br /> Giving Wings to your Stories.</h1>
        <Link to='/login' className='bg-cyan-400 text-white font-bold py-2 px-4'>Start Your Stories</Link>
      </div>
    </div>
  )
}

export default LandingIntro