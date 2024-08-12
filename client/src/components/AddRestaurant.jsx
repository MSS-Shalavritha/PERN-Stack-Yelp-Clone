import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const {addRestaurant} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange
            })
            addRestaurant(response.data.body.restaurants);
        }catch(err){}
        
    }

  return (
    <div className="container mb-4">
        <div className="form-row">
            <div className="col">
                <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" />
            </div>
            <div className="col">
                <input type="text" onChange={(e) => setLocation(e.target.value)} className="form-control" placeholder="Location" />
            </div>
            <div className="col">
                <select onChange={(e) => setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2">
                    <option disabled>Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">Add</button>
        </div>
    </div>
  );
}

export default AddRestaurant;
