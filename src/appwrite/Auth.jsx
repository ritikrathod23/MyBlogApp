import { Client, Account } from "appwrite"; // Import Client and Account classes
import conf from '../conf'; // Ensure these keys are named correctly in your conf file

class AuthService {
    client; // Client instance
    account; // Account service instance

    constructor() {
        this.client = new Client(); // Initialize Client
        this.client
            .setEndpoint(conf.appwriteUrl) // Set your endpoint here
            .setProject(conf.appwriteProjectId); // Set your project ID here

        this.account = new Account(this.client); // Initialize Account service with the client
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create('unique()', email, password, name);
            console.log("Account created successfully:", userAccount);
            return userAccount;
        } catch (error) {
            console.error("Can't create account, please enter valid credentials:", error.message || error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const newSession = await this.account.createEmailPasswordSession(email, password); // Method renamed to createEmailSession
            console.log("Logged in successfully!", newSession);
            return newSession;
        } catch (error) {
            console.error("Cannot login:", error.message || error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            // console.log("Current user data:", user);
            return user;
        } catch (error) {
            console.error("Cannot fetch current user:", error.message || error);
        }
    }

    async getUserSession() {
        try {
            const session = await this.account.getSession('current');
            // console.log("Current session data:", session);
            return session;
        } catch (error) {
            console.error("Cannot get session:", error.message || error);
        }
    }

    async logOut() {
        try {
            await this.account.deleteSession('current'); // Specify 'current' to delete the current session
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Cannot log out:", error.message || error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
