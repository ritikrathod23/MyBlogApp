import React, { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import DataService from "../appwrite/Data";
import AuthService from "../appwrite/Auth";
import { useNavigate, useParams } from "react-router-dom";

export default function AddPost() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [note, setNote] = useState([]); // Initialize as empty
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const getSession = await AuthService.getUserSession();
      setSession(getSession);
      setMessage("")

      if (id) {
        // If 'id' exists, fetch the note (we are in update mode)
          const mydata = await DataService.getData(id)
          if (mydata) { 
            const myImage = await DataService.getImagePreview(mydata.fileId)
            const noteWithImage = { ...mydata, myImage }
            setNote(noteWithImage)
            console.log("details: ",note.myImage)

          }
        }
    };
    checkSession();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, content } = event.target.elements;
    const update = {
      title: title.value,
      content: content.value,
    }

    if (session) {
      const userId = session.userId;

      try {
        let fileId = null;
        if (image) {
          const imageUploaded = await DataService.uploadFile(image);
          fileId = imageUploaded.$id;
        }

        if (id) {
          // Update mode
          const updated = await DataService.updateData(id, update);
          console.log("updated: ", updated)
          console.log("Post updated");
          setMessage("Post updated")
        } 
        else {
          // Create mode
          await DataService.createPost(userId, title.value, content.value, fileId);
          console.log("Post created");
          setMessage("Post created")
        }
      } catch (error) {
        console.log(error.message, "error");
      }
    }
    navigate('/userhome');
  };

  const handleImage = (event) => {
    const myImage = document.getElementById("file-upload").files[0];
      setImage(myImage)
  };

  const handleCancel = ()=>{
    navigate('/userhome');
  }

  return (
    <div className="bg-slate-200 p-10">
      <div className="h-6 text-green-500 text-center my-2" >
        { message && <p>
          helllo 
        </p>
        }
      </div>
      <form onSubmit={handleSubmit}>
        <p className=" text-sm leading-6 text-gray-600 pl-5 ">
          {id ? "Update Your Post" : "Create a New Post"}
        </p>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-10 pl-5">
          <div className="mt-5 col-span-2 gap-x-6 gap-y-8">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  defaultValue={note.title} // Pre-fill for update mode
                  className="block flex-1 w-5/6 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                Content
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  defaultValue={note.content} // Pre-fill for update mode
                  className="block pl-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="sm:grid-cols-1 w-80">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  
                    <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          onChange={handleImage}
                          id="file-upload"
                          name="fileUpload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>

            </div>
            <div className=" image mt-2 sm:grid-cols-1 rounded-md bg-slate-200  " >
              {note.myImage && (
              <img className="rounded-md bg-gray-500 " width={100} height={100} src={note.myImage} alt="no image" />
              )}
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button onClick={handleCancel} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
         
        </div>
      </form>
    </div>
  );
}
