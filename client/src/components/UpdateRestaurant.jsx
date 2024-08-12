import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = () => {
   const { id } = useParams();
   let navigate = useNavigate();
   const [name, setName] = useState("");
   const [location, setLocation] = useState("");
   const [priceRange, setPriceRange] = useState("");

   useEffect(() => {
    const fetchData = async() => {
        const response = await RestaurantFinder.get(`/${id}`);
        setName(response.data.data.restaurants.name);
        setLocation(response.data.data.restaurants.location);
        setPriceRange(response.data.data.restaurants.price_range);
    }
    fetchData();

   },[]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    const updateRestaurant = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange
    });
    navigate('/');
   };

  return (
    <div>
        <form action ="">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id ="name" onChange={(e)=> setName(e.target.value)} className="form-control" type="text"/>
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input id ="location" onChange={(e)=> setLocation(e.target.value)} className="form-control" type="text"/>
            </div>

            <div className="form-group">
                <label htmlFor="price_range">Price Range</label>
                <input id ="price_range" onChange={(e)=> setPriceRange(e.target.value)} className="form-control" type="number"/>
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant