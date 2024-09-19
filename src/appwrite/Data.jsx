import { Client, Databases, Storage, ID, Query } from "appwrite"; // Import necessary classes
import conf from "../conf"; // Ensure these keys are named correctly in your conf file

class DataService {
  client;
  databases;
  storage;

  constructor() {
    // Initialize the Appwrite client
    this.client = new Client();

    this.client
      .setEndpoint(conf.appwriteUrl) // Set your endpoint here
      .setProject(conf.appwriteProjectId); // Set your project ID here

    // Initialize the Appwrite services using the client
    this.databases = new Databases(this.client); // Use the Databases class with the client instance
    this.storage = new Storage(this.client); // Use the Storage class with the client instance
  }

  async createPost(userId, title, content, fileId) {
    try {
      // Ensure all data is properly formatted and is a valid JSON object
      return await this.databases.createDocument(
        conf.appwriteDatabase, // Database ID
        conf.appwriteCollection, // Collection ID
        ID.unique(), // Unique document ID generator
        {
          userId,
          title,
          content,
          fileId, 
        }
      );
    } catch (error) {
      console.error("Cannot create document:", error.message, error);
      
    }
  }

  async updateData(id, update) {
    try {
      const updatedDocument = await this.databases.updateDocument(
        conf.appwriteDatabase, // Database ID
        conf.appwriteCollection,
        id,
        update,
      );
      console.log("updated data:", updatedDocument);
      return updatedDocument;
    } catch (error) {
      console.error("Cannot Update data:", error.message || error);
      // throw error;
    }
  }
  async getUserData(myuserId) {
    try {
      // Fetch user-specific data from the database
      const documents = await this.databases.listDocuments(
        conf.appwriteDatabase, // Database ID
        conf.appwriteCollection, // Collection ID
        // Assuming you have a field named userId in your collection and want to filter by it
        // [Query.equal("userId", ["userId"])]
      );
      console.log("User data:", documents);
      return documents;
    } catch (error) {
      console.error("Cannot fetch user data:", error.message || error);
      throw error;
    }
  }

  async getData(documentId){
    try {
      const document = await this.databases.getDocument(
        conf.appwriteDatabase,
        conf.appwriteCollection,
        documentId,
      )
      return document;
    } catch (error) {
      console.error(error.message, "can not get data")
    }
  }

  async uploadFile(file,$id) {
    try {
      const upload = await this.storage.createFile(
        conf.appwriteStorage, // Bucket ID
        ID.unique(), // Unique file ID
        file,
        $id,
      
      );
      console.log("File uploaded successfully:");
      return upload;
    } catch (error) {
      console.error("Cannot upload file:", error.message || error);
      
    }
  }

  async getImage(fileId) {
    try {
      // Ensure to return the resolved URL
      const imageUrl = await this.storage.getFileView(
        conf.appwriteStorage,  // Storage bucket ID or constant
        fileId                 // File ID for the image
      );
      return imageUrl; // This will be the URL to the image
    } catch (error) {
      console.error("Error fetching image:", error.message || error);
    }
  }
  async getImagePreview(fileId) {
    try {
      // Ensure to return the resolved URL
      const imageUrl = await this.storage.getFilePreview(
        conf.appwriteStorage,  // Storage bucket ID or constant
        fileId                 // File ID for the image
      );
      return imageUrl; // This will be the URL to the image
    } catch (error) {
      console.error("Error fetching image:", error.message || error);
    }
  }

  async deleteImage(fileId) {
    try {
      const imageUrl = await this.storage.deleteFile(
        conf.appwriteStorage,  // Storage bucket ID or constant
        fileId                 // File ID for the image
      );
    } catch (error) {
      console.error("Error deleting post:", error.message || error);
    }
  }
  async deleteContent(id) {
    try {
      const mydocument = await this.databases.deleteDocument(
        conf.appwriteDatabase, // Database ID
        conf.appwriteCollection,
        id
      )
    } catch (error) {
      console.error("Error deleting post:", error.message || error);
    }
  }
}

const dataService = new DataService();

export default dataService;
