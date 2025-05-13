const Category = require("../models/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

exports.createCategory = async (req, res) => {
  try {
    //get data
    const { name, description } = req.body;
    //validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //create entry in db
    const CategoryDetails = await Category.create({
      name: name,
      description: description,
    });
    //  console.log(CategoryDetails);
    //return response
    return res.status(200).json({
      success: true,
      messsage: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

// showAllCategories
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();
    //  console.log("printing categories",allCategories);
    res.status(200).json({
      success: true,
      data: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//categoryPageDetails

exports.categoryPageDetails = async (req, res) => {
  try {
    //get categoryId
    const { categoryId } = req.body;
  
   //get course for specified categoryId
    const selectedCategory = await Category.findById(categoryId)
   
    .populate({
      path: "course",
      match: { status: "Published" },
      // populate: "ratingAndReviews",
    })
      .exec();
      // console.log(selectedCategory)
    //validation
    // Handle the case when the category is not found
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }
   // Get courses for other categories
   const categoriesExceptSelected = await Category.find({
    _id: { $ne: categoryId },
  })
  let differentCategory = await Category.findOne(
    categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)])
     
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec();

    //get top 10 selling courses
    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec();

    //For each category in the allCategories array:
    //Take the courses array from that category.
    //Combine all these courses arrays from all categories into a single flat array.
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    //return response
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
