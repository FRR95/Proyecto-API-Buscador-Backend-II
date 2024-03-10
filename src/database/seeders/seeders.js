import User from "../../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import 'dotenv/config'
import { dbConnection } from "../../database/db.js";

const userSeeder = async () => {
	try {
		mongoose.connect(process.env.MONGO_URI,{})
		console.log("Connected to MongoDB");

		const user = await User.create([
			{
				email: "admin@admin.com",
        password: bcrypt.hashSync('12345678', 10),
        role: "admin",
			},
			{
				email: "superadmin@superadmin.com",
				password: bcrypt.hashSync('12345678', 10),
			},
		]);

		console.log("User created");
	} catch (error) {
		console.log(error);
	} finally {
		mongoose.disconnect();
	}
};

userSeeder();