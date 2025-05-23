import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../appwrite/Auth";
import dataService from "../appwrite/Data";
import Card from "./Card";
import AddIcon from "../svg/AddIcon.png";
import Loader from "./Loader";

function UserHome() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [usernotes, setUsernotes] = useState([]);
  // const [ image, setImage ] = useState([])

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      // Step 1: Fetch User Session
      const getSession = await AuthService.getUserSession();
      setSession(getSession); 

      if (!getSession) {
        return; // If no session, exit early
      }

      // Step 2: Fetch User ID
      const currentUser = await AuthService.getCurrentUser();
      const myuserId = currentUser.$id;

      // Step 3: Fetch Notes
      const response = await dataService.getUserData(myuserId);
      const filteredNotes = response.documents.filter(
        (note) => note.userId === myuserId
      );

      // Step 4: Fetch image for each note
      const notesWithImages = await Promise.all(
        filteredNotes.map(async (note) => {
          if (note.fileId) {
            const imageUrl = await dataService.getImage(note.fileId);
            return { ...note, imageUrl }; // Add image URL to the note object
          }
          return note;
        })
      );

      setUsernotes(notesWithImages); // Set notes along with their images
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="static flex flex-wrap justify-center">
        {session && (
          <div className="mt-5 userHome mb-28  grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {/* Display Notes if Available */}
            {usernotes.length > 0 ? (
              usernotes.map((note) => (
                <div
                  key={note.$id}
                  onClick={() => navigate(`/content/${note.$id}`)}
                  className=""
                >
                  <Card full={note} note={note.title} image={note.imageUrl} />
                </div>
              ))
            ) : (
              <p>No posts available. Add a new one!</p>
            )}
            <div
              onClick={() => navigate("/addpost")}
              className="rounded-lg bg-slate-200 cursor-pointer hover:opacity-65  w-80 h-52 p-2  flex justify-center items-center content-center 
                      shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-[hsla(0,0%,98%,0.15) "
            >
              <img className="opacity-65 hover:opacity-100" width={100} src={AddIcon} alt="Add" />
            </div>

<<<<<<< HEAD
            {/* "Add Post" Button Styled to Align with Cards */}
            
          </div>
        )}
      </div>
=======
          {/* "Add Post" Button Styled to Align with Cards */}
          <div
            onClick={() => navigate("/addpost")}
            className="w-14 fixed bottom-10 right-10 h-14 bg-blue-900  rounded-xl shadow-md flex justify-center items-center cursor-pointer hover:opacity-70"
          >
            <img className="" width={20} src={AddIcon} alt="Add" />
          </div>
          {/* <div
            onClick={() => navigate("/allpost")}
            className="w-14 fixed bottom-10 right-28 h-14 bg-blue-900  rounded-xl shadow-md flex justify-center items-center cursor-pointer hover:opacity-70"
          >
            <img className="" width={20} src={AddIcon} alt="Add" />
          </div> */}
        </div>
      )}
    </div>
>>>>>>> 925ee5b0da14f9fd2d39b311561cfd20d8353a68
    </>
  );
}

export default UserHome;
