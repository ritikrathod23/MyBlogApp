import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import mydelete from "../svg/mydelete.svg";
import { MdDeleteOutline } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import dataService from "../appwrite/Data";
import { useState } from "react";

function Card({ full }) {
  const navigate = useNavigate();

  


  const handleEdit = (e) => {
    e.preventDefault()
    e.stopPropagation();
    navigate(`/addpost/${full?.$id}`);
  };

  const handleDelete = async (e) => {
    // e.preventDefault()
    e.stopPropagation()
    const fileId = full.fileId;
    await dataService.deleteContent(full?.$id);
    if (fileId) {
      await dataService.deleteImage(fileId);
    }
  };
  return (
    <div
      className="flex rounded-md  bg-slate-200  w-80 h-72 hover:opacity-60
          shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-[hsla(0,0%,98%,0.15) "
    >
      <Link to={"/userhome"}>
        <div className="w-full  bg-cover bg-no-repeat  bg-fixed opacity-100 transition duration-300 ease-in-out  cursor-pointer ">
          <img
            className="rounded-t-md  w-screen object-cover h-40 "
            src={full.imageUrl}
            alt="no image"
          />
        </div>
        <div className="">
          <h5 className="grid grid-cols-2 py-4 mx-2 items-center  text-xl font-medium leading-tight">
            {full.title}
          </h5>
          <div className="flex pt-8 justify-end px-4 text-3xl gap-4 items-end">
            <MdEditNote onClick={handleEdit} />
            <MdDeleteOutline onClick={handleDelete} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
