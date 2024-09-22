import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dataService from "../appwrite/Data";
import { ColorRing } from "react-loader-spinner";

import mydelete from '../svg/mydelete.svg'
import Loader from "./Loader";

function CardDetail() {
  const { id } = useParams(); // Get the ID from the URL
  const [cardDetails, setCardDetails] = useState(null);
  const [image, setImage] = useState(null); // Initialize as null for the image URL
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        // Fetch the card details
        const data = await dataService.getData(id);
        console.log("data : ", data);
        setCardDetails(data);

        // Only fetch the image if the card contains a fileId
        if (data && data.fileId) {
          const imageUrl = await dataService.getImage(data.fileId);
          setImage(imageUrl); // Set the image URL
          console.log("img: ",image)
        }
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    fetchCardDetails();
  }, [id]);

  const handleDelete = async() =>{
    console.log("buttonCllicked")
    const fileId = cardDetails.fileId;
    console.log(fileId)
    console.log(id)
      await dataService.deleteContent(id)
    if(fileId){
      await dataService.deleteImage(fileId)
    }
    navigate('/userhome')
    
  }

  const handleEdit =() =>{
    navigate(`/addpost/${id}`)




  }

  // Loader when card details are not yet fetched
  if (!cardDetails) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="content">
      <div className="text-white card-details-container pl-5 mt-5 ">
        <div className=""> Title </div>
        <div className=" my-5 border-sky-200 border-2 rounded-md content-center sm:p-5  p-2">
          <h1>{cardDetails.title}</h1>
        </div>

        <div>
          <div> Content </div>
          <p className=" my-5 border-sky-200 border-2 rounded-md content-center  p-2">
           {cardDetails.content}
           
           
          </p>
          
          <div> Image </div>
          {image ? (
            <img
              src={image}
              alt="Card Image"
              className="  mb-20 border-sky-200 border-2 rounded-md content-center p-2"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
      </div>
      <button
            onClick={handleEdit}
            type="button"
            className="fixed  bottom-5 right-20 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
           Edit  
          </button>
      <button
      onClick={handleDelete}
        type="button"
        >
        <img src={mydelete} width={50} alt="No Image"
        className="fixed  bottom-5 right-5 opacity-100 hover:opacity-60  "
        />
      </button>
    </div>
  );
}

export default CardDetail;
