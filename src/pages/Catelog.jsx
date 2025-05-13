import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { catalogDetailsAPI } from "../services/operations/catalogDetailsAPI";
import { useParams } from "react-router-dom";
import { fetchCourseCategories } from "../services/operations/courseDetailsAPI";
import Error from './Error'
import CourseSlider from '../components/core/Catelog/CourseSlider'
import CourseCard from "../components/core/Catelog/CourseCard";

const Catelog = () => {
  const [loading, setLoading] = useState(false);

  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [active, setActive] = useState(1)
  const [categoryId, setCategoryId] = useState("");
 
// fetching categories 
  const fetchCourseCategory = async () => {
    // console.log("inside")
    const result = await fetchCourseCategories()
  
    const category_id = result.filter(
      (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
    )[0]._id;
    // console.log("name", result[0].name)
    setCategoryId(category_id);
  };
  useEffect(() => {
    fetchCourseCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
 },[catalogName])

  // fetching catalog page details

  const fetchCatelogDetailsPage = async () => {
    setLoading(true);
    const result = await catalogDetailsAPI(categoryId);
    setCatalogPageData(result)
    setLoading(false)
  };
  useEffect(() => {
    if (categoryId) {
      fetchCatelogDetailsPage();
    }
            // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);


  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }
  // console.log("course",catalogPageData?.data?.differentCategory?.course)

  return (
    <div className="max-w-max-contentmx-auto">
    {/* hero section */}
      <div className="bg-richblack-800 py-20  flex flex-col gap-y-3">
        <p className="text-richblack-400 text-xl font-medium w-11/12 mx-auto">{`Home / Catalog / `} <span className="text-yellow-50">{catalogPageData.data.selectedCategory.name}</span></p>
        <p className="text-white text-3xl font-semibold w-11/12 mx-auto"> {catalogPageData.data.selectedCategory.name}</p>
        <p className="text-richblack-300 text-lg font-medium w-11/12 mx-auto">{catalogPageData.data.selectedCategory.description}</p>
      </div>
      <div className="w-11/12 mx-auto max-w-maxContent">
      <div>
        <p className="text-2xl font-semibold text-richblack-25 mt-12 mb-6">
          Courses to get you started
        </p>
        <div className="flex gap-x-3 text-base border-b-richblack-400 border-b-[1px]">
        <p className={`${active === 1 ? "px-2 text- text-yellow-25 border-b-yellow-25 border-b-[1px]" : "text-richblack-400"} cursor-pointer`}
        onClick={()=>setActive(1)}>Most Popular</p>
        
          
          <p className={`${active === 2 ? "px-2 text- text-yellow-25 border-b-yellow-25 border-b-[1px]" : "text-richblack-400"} cursor-pointer`}
          onClick={()=>setActive(2)}>New</p>
        </div>
        <div>
          <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course}/>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-semibold text-richblack-25 mt-12">
          Top courses in{" "} {catalogPageData?.data?.differentCategory?.name} 
        </p>
        <div>
          <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course}/>
        </div>
      </div>

      <div>
        <p className="text-2xl font-semibold text-richblack-25">
          Frequently Bought
        </p>
        <div>
      
          {catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,i) => (
            <CourseCard course={course} key={i} Height = {"h-[400px]"}/> 
         ))}
        </div>
      </div>
      </div>
    

      <Footer />
    </div>
  );
};

export default Catelog;
