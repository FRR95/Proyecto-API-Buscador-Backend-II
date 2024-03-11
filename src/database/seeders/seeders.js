import User from "../../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import 'dotenv/config'
import { dbConnection } from "../../database/db.js";
import Post from "../../models/Post.js";

const userSeeder = async () => {
	try {
		mongoose.connect(process.env.MONGO_URI, {})
		console.log("Connected to MongoDB");

		const user = await User.create([
			{
				_id: new mongoose.Types.ObjectId("65eebde6af5c0f55427ff54e"),
				email: "admin@admin.com",
				password: bcrypt.hashSync('12345678', 10),
				role: "admin",
			},
			{
				_id: new mongoose.Types.ObjectId("65eebde6af5c0f55427ff54f"),
				email: "superadmin@superadmin.com",
				password: bcrypt.hashSync('12345678', 10),
			},
		]);

		console.log("Users created");
	} catch (error) {
		console.log(error);
	} 
};
const postSeeder = async () => {
	try {
		
		console.log("Connected to MongoDB");

		const post = await Post.create([
			{

				title: "title1",
				description: "description1",
				userId:"65eebde6af5c0f55427ff54e"
			},
			{
				title: "title2",
				description: "description2",
				userId:"65eebde6af5c0f55427ff54f"

			},
		]);

		console.log("Posts created");
	} catch (error) {
		console.log(error);
	} finally {
		mongoose.disconnect();
	}
};

const executeSeeders = async () => {
	await userSeeder();
	await postSeeder();

}
executeSeeders()
//65eebde6af5c0f55427ff54e
//65eebde6af5c0f55427ff54f