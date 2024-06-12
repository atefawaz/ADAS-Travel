import Tour from "../models/Tour.js";
import redisClient from "../redisClient.js";



// Get all tours with Redis caching and pagination
export const getAllTours = async (req, res) => {
  // Pagination
  const page = parseInt(req.query.page) || 0;
  const cacheKey = `all_tours_page_${page}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    console.log("Cache hit");
    const tours = JSON.parse(cachedData);
    return res.status(200).json({
      success: true,
      count: tours.length,
      message: "Tours fetched successfully (from cache)",
      data: tours,
    });
  }

  console.log("Cache miss");
  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(tours)); // Cache the tours data for 1 hour
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Tours fetched successfully",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tours",
      error: error.message,
    });
  }
};




//get Details of Tour
export const getDetailsOfTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate("reviews");
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Tour fetched successfully",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tour",
      error: error.message,
    });
  }
};

//Create new tour

export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Tour created successfully",
      data: savedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create tour",
      error: error.message,
    });
  }
};

//update

export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
    const newDataUpdateTour = await Tour.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: newDataUpdateTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update tour",
      error: error.message,
    });
  }
};

//delete tour
export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete tour",
      error: error.message,
    });
  }
};

//get tour by searching

export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");
    if (!tours) {
      return res.status(404).json({
        success: false,
        message: "Tours not found",
      });
    }
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Tours fetched successfully",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tours",
      error: error.message,
    });
  }
};

//get featured tours
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({
      featured: true,
    })
      .populate("reviews")
      .limit(8);
    if (!tours) {
      return res.status(404).json({
        success: false,
        message: "Tours not found",
      });
    }
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Tours fetched successfully",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tours",
      error: error.message,
    });
  }
};

//get tours count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      message: "Tour count fetched successfully",
      data: tourCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tour count",
      error: error.message,
    });
  }
};


export const getMostBookedTours = async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run(
      'MATCH (t:Tour) ' +
      'RETURN t.id AS tourId, t.bookings AS bookings ' +
      'ORDER BY t.bookings DESC ' +
      'LIMIT 10'
    );

    const tours = result.records.map(record => ({
      tourId: record.get('tourId'),
      bookings: record.get('bookings')
    }));

    res.status(200).json({
      success: true,
      message: "Most booked tours fetched successfully",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch most booked tours",
      error: err.message,
    });
  } finally {
    await session.close();
  }
};
