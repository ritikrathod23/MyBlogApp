export const conf = {
    appwriteUrl : String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProjectId : String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDatabase : String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteStorage : String(process.env.REACT_APP_APPWRITE_STORAGE_ID),
    appwriteCollection : String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
}

export default conf;
