import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dataService from "../appwrite/Data";
import { ColorRing } from "react-loader-spinner";

import mydelete from "../svg/mydelete.svg";
import Loader from "./Loader";
import editbutton from '../svg/editbutton.svg'

function CardDetail() {
  const { id } = useParams(); // Get the ID from the URL
  const [cardDetails, setCardDetails] = useState(null);
  const [image, setImage] = useState(null); // Initialize as null for the image URL
  const navigate = useNavigate();

  const dateStr = "2025-05-17T12:04:17.609+00:00";
  const formatted = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));


  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        // Fetch the card details
        const data = await dataService.getData(id);
        setCardDetails(data);

        // Only fetch the image if the card contains a fileId
        if (data && data.fileId) {
          const imageUrl = await dataService.getImage(data.fileId);
          setImage(imageUrl); // Set the image URL
        }
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    fetchCardDetails();
  }, [id]);

  const handleDelete = async () => {
    const fileId = cardDetails.fileId;
    await dataService.deleteContent(id);
    if (fileId) {
      await dataService.deleteImage(fileId);
    }
    navigate("/userhome");
  };

  const handleEdit = () => {
    navigate(`/addpost/${id}`);
  };

  // Loader when card details are not yet fetched
  if (!cardDetails) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full bg-slate-50 text-gray-900">
      <div className="w-full">
        {image ? (
          <img
            src={image}
            alt="Card Image"
            className=" w-screen h-96 content-center"
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className="  mt-5 px-3 md:px-48 text-wrap ">
        <div className=" ">
          <h1 className="my-5 text-5xl content-center p-2">{cardDetails.title}</h1>
          <p className="my-5 content-center p-2">{formatted}</p>
        </div>

        <div>
          <p className=" my-5 md:text-2xl content-center p-2">
            {cardDetails.content}
          </p>
        </div>
      </div>
      {/* <button
            onClick={handleEdit}
            type="button"
            
            // className="fixed  bottom-5 right-20 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <img width={50} src={editbutton} alt="" 
            className="fixed  bottom-5 right-20 invert hover:invert-0" />  
          </button>
      <button
      onClick={handleDelete}
        type="button"
        >
        <img src={mydelete} width={50} alt="No Image"
        className="fixed  bottom-5 right-5 invert hover:invert-0 "
        />
      </button> */}
    </div>
  );
}

export default CardDetail;
