import React from 'react'

const stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
 return (
    <div className='bg-richblack-800 border-b-2 border-richblack-700'>
    <div className='w-11/12 max-w-maxContent mx-auto'>
        <div className='grid md:grid-cols-4 gap-10 grid-cols-2 text-center'>
            {stats.map((data,i) => {
                return (
                    <div key={i} className='md:my-10 my-4'>
                        <h1 className='font-bold font-inter text-3xl  text-richblack-5'>{data.count}</h1>
                        <h2 className='font-semibold text-base text-richblack-500'>{data.label}</h2>
                    </div>
                );
            })}
        </div>
    </div>
   </div>
  );
};

export default StatsComponent