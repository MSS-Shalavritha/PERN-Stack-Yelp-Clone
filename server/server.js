require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

// Get all restaurants
app.get("/api/v1/getRestaurants", async (req, res) => {
    try {
        //const results = await db.query("select * from restaurants");
        const restaurantRatingsData = await db.query(
          "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
        );
    
        res.status(200).json({
          status: "success",
          results: restaurantRatingsData.rows.length,
          data: {
            restaurants: restaurantRatingsData.rows,
          },
        });
      } catch (err) {
        console.log(err);
      }
    });
    

// Get a Restaurant
app.get("/api/v1/getRestaurants/:id", async (req,res) => {
    try {
        const restaurant = await db.query(
          "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
          [req.params.id]
        );
        // select * from restaurants wehre id = req.params.id
    
        const reviews = await db.query(
          "select * from reviews where restaurant_id = $1",
          [req.params.id]
        );
        console.log(reviews);
    
        res.status(200).json({
          status: "succes",
          data: {
            restaurants: restaurant.rows[0],
            reviews: reviews.rows,
          },
        });
      } catch (err) {
        console.log(err);
      }
    });

// Create a restaurant
app.post("/api/v1/getRestaurants", async (req,res)=> {
    try{
        const results = await db.query("Insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        res.status(201).json({
            status: "Success",
            body: {
                restaurants: results.rows[0]
            }
        });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Internal error"
        });
    }

});

//Update a restaurant
app.put("/api/v1/getRestaurants/:id", async (req, res)=>{
    try{
        const results = await db.query("Update restaurants set name = $1, location = $2, price_range= $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results.rows[0]
            }
        });

    }catch(error){
        res.status(500).json({
            status:"Error",
            message:"Internal server error"
        });
    }
});

//Delete a restaurant
app.delete("/api/v1/getRestaurants/:id", async (req, res) => {
    try{
        const results = await db.query("Delete from restaurants where id = $1", [req.params.id]);
        res.status(204).json({
            status: "Success",

        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"Error",
            message: "Internal server error"
        });
    }

});

//Add Reviews

app.post("/api/v1/getRestaurants/:id/addReview", async (req,res) =>{
    try{
        const result = await db.query("Insert into reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *", [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.status(204).json({
            status:"Success",
            data: {
                reviews: result.rows[0]
            }

        });

    }catch(err){
        console.error(err);

        res.status(500).json({
            status:"Error",
            message:"Internal server error"
        });

    }

});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and running on ${port}`);
});