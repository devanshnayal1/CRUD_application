
import Users from '../model/userModel.js';

export const create = async (req, res) => {

    try {
        console.log("Recieved data:", req.body);


        const newUser = new Users(req.body);
        const { email } = newUser;

        // Check if user already exists
        const userExist = await Users.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const savedData = await newUser.save();
        console.log("Saved data to DB:", savedData);

        // Return the saved data
        res.status(200).json(savedData);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




export const getAllUsers = async (req, res) => {
    try {

        console.log("/api/user endpoint was called")
        const userData = await Users.find();
        if (!userData || userData.length == 0) {
            return res.status(404).json({ message: "User data not found" });

        }
        console.log(`Fetched ${userData.length} users from the database`);
        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}


export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`fetching user by id ${id}`);

        const userExist = await Users.findById(id);
        if (!userExist) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}


export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`Updating user by id ${id}`);

        const userExist = await Users.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await Users.findByIdAndUpdate(id, req.body,{
            new:true
        })
            console.log("Updated user data:", updatedUser);
        res.status(200).json(updatedUser);



    } catch (error) {
        console.log("Error updating user:", error);
        res.status(500).json({ errorMessage: error.message });
    }
}

export const deleteUser= async (req, res) => {
    try{

        const id = req.params.id;
        console.log(`Updating user by id ${id}`);

        const userExist = await Users.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        const deleteUser= await Users.findByIdAndDelete(id);
        console.log("Deleted user data:", deleteUser);
        res.status(200).json({ message: "User deleted successfully" });

    }
    catch (error) {
        console.log("Error updating user:", error);
        res.status(500).json({ errorMessage: error.message });
    }}
    