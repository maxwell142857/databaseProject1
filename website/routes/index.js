let express = require("express");
let router = express.Router();

const {
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
  createTrip,
  getComments,
  getComment,
  updateComment,
  deleteComment,
  createComment,
  //
  getTitles,
  getTitle,
  updateTitle,
  deleteTitle,
  deleteCopy,
  createTitle,
  getCopies
} = require("../db/dbConnector_Sqlite.js");

/* GET home page. */
// router.get("/", async function (req, res) {
//   try {
//     const trips = await getTrips();
//     console.log("route / called  -  trips.length", trips.length);
//     res.render("index", { trips, err: null, type: "success" });
//   } catch (exception) {
//     console.log("Error exceuting sql", exception);
//     res.render("index", {
//       trips: [],
//       err: `Error executing SQL ${exception}`,
//       type: "danger",
//     });
//   }
// });

router.get("/titles", async function (req, res) {
  try {
    const titles = await getTitles();
    res.render("index", { titles, err: null, type: "success" });
  } catch (exception) {
    res.render("index", {
      trips: [],
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});
router.get("/", async function (req, res) {
  try {
    res.render("login", {err: null, type: "success" });
  } catch (exception) {
    res.render("index", {
      trips: [],
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});

// Render the edit interface
// router.get("/trips/:ride_id/edit", async function (req, res) {
//   console.log("Edit route", req.params.ride_id);

//   try {
//     const sqlRes = await getTrip(req.params.ride_id);
//     console.log("trips edit found trip", sqlRes);

//     if (sqlRes.length === 1) {
//       res.render("trips_edit", { trip: sqlRes[0], err: null, type: "success" });
//     } else if (sqlRes.length > 1) {
//       res.render("trips_edit", {
//         trip: sqlRes[0],
//         err: "There is more than one ride with that id =" + req.params.ride_id,
//         type: "danger",
//       });
//     } else {
//       res.render("trips_edit", {
//         trip: null,
//         err: "Error finding the ride = " + req.params.ride_id,
//         type: "danger",
//       });
//     }
//   } catch (exception) {
//     console.log("Error exceuting sql", exception);
//     res.render("trips_edit", {
//       trip: null,
//       err: `Error executing SQL ${exception}`,
//       type: "danger",
//     });
//   }
// });


router.get("/titles/:titleID/edit", async function (req, res) {

  try {

    const sqlRes = await getTitle(req.params.titleID);

    if (sqlRes.length === 1) {
      res.render("trips_edit", { title: sqlRes[0], err: null, type: "success" });
    } else if (sqlRes.length > 1) {
      res.render("trips_edit", {
        trip: sqlRes[0],
        err: "There is more than one ride with that id =" + req.params.titleID,
        type: "danger",
      });
    } else {
      res.render("trips_edit", {
        trip: null,
        err: "Error finding the ride = " + req.params.titleID,
        type: "danger",
      });
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("trips_edit", {
      trip: null,
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});

// Actually update the trip
// router.post("/trips/:ride_id/edit", async function (req, res) {
//   console.log("Edit route", req.params.ride_id, req.body);

//   const ride_id = req.params.ride_id;
//   const newTrip = req.body;

//   try {
//     const sqlResUpdate = await updateTrip(ride_id, newTrip);
//     console.log("Updating trip", sqlResUpdate);

//     if (sqlResUpdate.changes === 1) {
//       const sqlResFind = await getTrip(req.params.ride_id);
//       res.render("trips_edit", {
//         trip: sqlResFind[0],
//         err: "Trip modified",
//         type: "success",
//       });
//     } else {
//       res.render("trips_edit", {
//         trip: null,
//         err: "Error updating the ride = " + ride_id,
//         type: "danger",
//       });
//     }
//   } catch (exception) {
//     console.log("Error exceuting sql", exception);
//     res.render("trips_edit", {
//       trip: null,
//       err: `Error executing SQL ${exception}`,
//       type: "danger",
//     });
//   }
// });

router.post("/titles/:titleID/edit", async function (req, res) {
  const titleID = req.params.titleID;
  const newtitle = req.body;

  
  try {
    const sqlResUpdate = await updateTitle(titleID, newtitle);
    console.log(sqlResUpdate)
    if (sqlResUpdate.changes === 1) {
      const sqlResFind = await getTitle(req.params.titleID);
      res.render("trips_edit", {
        title: sqlResFind[0],
        err: "Title modified",
        type: "success",
      });
    } else {
      res.render("trips_edit", {
        title: null,
        err: "Error updating the ride = " + titleID,
        type: "danger",
      });
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("trips_edit", {
      title: null,
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});

// Render the details interface
router.get("/trips/:ride_id", async function (req, res) {
  console.log("Trips detail route", req.params.ride_id);

  // Do we have any message to show?
  const msg = req.query.msg || null;

  try {
    const sqlRes = await getTrip(req.params.ride_id);
    const comments = await getComments(req.params.ride_id);
    console.log(
      "trips edit found trip",
      sqlRes,
      " comments.length ",
      comments.length
    );

    if (sqlRes.length === 1) {
      res.render("trips_details", {
        trip: sqlRes[0],
        comments: comments,
        err: msg,
        type: "success",
      });
    } else if (sqlRes.length > 1) {
      res.render("trips_details", {
        trip: sqlRes[0],
        comments: comments,
        err: "There is more than one ride with that id =" + req.params.ride_id,
        type: "danger",
      });
    } else {
      res.render("trips_details", {
        trip: null,
        comments: [],
        err: "Error finding the ride = " + req.params.ride_id,
        type: "danger",
      });
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("trips_details", {
      trip: null,
      comments: [],
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});

// Render the edit interface
// router.get("/trips/:ride_id/delete", async function (req, res) {
//   console.log("Delete route", req.params.ride_id);

//   try {
//     const sqlResDelete = await deleteTrip(req.params.ride_id);
//     console.log("Delete trip res=", sqlResDelete);
//     const trips = await getTrips();
//     if (sqlResDelete.changes === 1) {
//       res.render("index", { trips, err: "Trip deleted", type: "success" });
//     } else {
//       res.render("index", {
//         trips,
//         err: "Error deleting the trip",
//         type: "danger",
//       });
//     }
//   } catch (exception) {
//     console.log("Error exceuting sql", exception);
//     const trips = await getTrips();
//     res.render("index", {
//       trips,
//       err: "Error executing the SQL",
//       type: "danger",
//     });
//   }
// });

router.get("/titles/:titleID/delete", async function (req, res) {

  try {
    const sqlResDelete = await deleteTitle(req.params.titleID);
    await deleteCopy(req.params.titleID);
    const titles = await getTitles();
    if (sqlResDelete.changes === 1) {
      res.render("index", { titles, err: "Book deleted", type: "success" });
    } else {
      res.render("index", {
        titles,
        err: "Error deleting the book",
        type: "danger",
      });
    }
  } catch (exception) {
    const titles = await getTitles();
    res.render("index", {
      titles,
      err: "Error executing the SQL",
      type: "danger",
    });
  }
});

// Render the create interface
// router.get("/trips/create", async function (req, res) {
//   console.log("Create route", req.params.ride_id);

//   res.render("trips_create", { err: null, type: "success" });
// });

router.get("/titles/create", async function (req, res) {

  res.render("trips_create", { err: null, type: "success" });
});

// Actually create the trip
// router.post("/trips/create", async function (req, res) {
//   console.log("Create route", req.body);

//   const newTrip = req.body;

//   try {
//     const sqlResCreate = await createTrip(newTrip);
//     console.log("Updating trip", sqlResCreate);
//     const trips = await getTrips();

//     if (sqlResCreate.changes === 1) {
//       res.render("index", {
//         trips,
//         err: "Trip created " + sqlResCreate.lastID,
//         type: "success",
//       });
//     } else {
//       res.render("trips_create", {
//         err: "Error inserting the ride ",
//         type: "danger",
//       });
//     }
//   } catch (exception) {
//     console.log("Error exceuting sql", exception);
//     res.render("trips_create", {
//       err: "Error inserting the ride " + exception,
//       type: "danger",
//     });
//   }
// });

router.post("/titles/create", async function (req, res) {

  const newTitle = req.body;

  try {
    const sqlResCreate = await createTitle(newTitle);
    const titles = await getTitles();

    if (sqlResCreate.changes === 1) {
      res.render("index", {
        titles,
        err: "Title created " + sqlResCreate.lastID,
        type: "success",
      });
    } else {
      res.render("trips_create", {
        err: "Error inserting the ride ",
        type: "danger",
      });
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("trips_create", {
      err: "Error inserting the ride " + exception,
      type: "danger",
    });
  }
});

// ********  Comments routes ********

// Update the comment from the trips_details view, returns to trips_details
router.post("/comments/:comment_id/edit", async function (req, res) {
  console.log("Edit comment route", req.params.comment_id, req.body);

  const comment_id = req.params.comment_id;
  const newComment = req.body;

  try {
    const sqlResUpdate = await updateComment(comment_id, newComment);
    console.log("Updating comment", sqlResUpdate);

    const editedComment = (await getComment(comment_id))[0];

    console.log("Edited Comment", editedComment);

    if (sqlResUpdate.changes === 1) {
      res.redirect(`/trips/${editedComment.ride_id}/?msg=Comment modified`);
    } else {
      // More than one comment found
      res.redirect(`/trips/${editedComment.ride_id}/?msg=Error editing comment`);
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("trips_details", {
      trip: null,
      comments: [],
      err: "Error editing the comment " + exception,
      type: "danger",
    });
  }
});

// Update the comment from the trips_details view, returns to trips_details
router.get("/comments/:comment_id/delete", async function (req, res) {
  console.log("Delete comment route", req.params.comment_id);

  const comment_id = req.params.comment_id;

  try {
    // Get the comment before we delete it to get the ride_id
    const sqlResFindComment = await getComment(req.params.comment_id);
    const oldComment = sqlResFindComment[0];

    const sqlResUpdate = await deleteComment(comment_id);
    console.log("Deleting comment", sqlResUpdate);

    if (sqlResUpdate.changes === 1) {
      res.redirect(`/trips/${oldComment.ride_id}/?msg=Comment deleted`);
    } else {
      res.redirect(`/trips/${oldComment.ride_id}/?msg=Error deleting comment`);
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("trips_details", {
      trip: null,
      comments: [],
      err: "Error deleting the comment " + exception,
      type: "danger",
    });
  }
});

// Create a comment from the trips_detail view. Content comes in the body, including the ride_id
router.post("/comments/create", async function (req, res) {
  console.log("Create comments route", req.body);

  const newComment = req.body;

  try {
    const sqlResCreate = await createComment(newComment);
    console.log("creating comment result", sqlResCreate);

    res.redirect(`/trips/${newComment.ride_id}/?msg=Comment inserted`);
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("trips_create", {
      err: "Error inserting the ride " + exception,
      type: "danger",
    });
  }
});


router.get("/titles/:titleID/copies", async function (req, res) {

  try {

    const result = await getCopies(req.params.titleID);

    res.render("copies", { copies: result, err: null, type: "success" });
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("trips_edit", {
      trip: null,
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});


module.exports = router;
