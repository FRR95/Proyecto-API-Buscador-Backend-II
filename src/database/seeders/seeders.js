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
			{
				_id: new mongoose.Types.ObjectId("65eebde6af5c1f55427ff54f"),
				email: "user@user.com",
				password: bcrypt.hashSync('12345678', 10),
				role: "user"
			},
			{
				_id: new mongoose.Types.ObjectId("65eebde6af5c2f55427ff54f"),
				email: "superadmin2@superadmin2.com",
				password: bcrypt.hashSync('12345678', 10),
			},
		]);

		console.log("-------------");
		console.log("Users created");
		console.log("-------------");
	} catch (error) {
		console.log(error);
	}
};
const postSeeder = async () => {
	try {


		const post = await Post.create([
			{
				title: "title1",
				description: "description1",
				userId: new mongoose.Types.ObjectId("65eebde6af5c0f55427ff54e"),
			},
			{
				title: "title2",
				description: "description2",
				userId: new mongoose.Types.ObjectId("65eebde6af5c0f55427ff54f"),

			},
			{
				title: "title3",
				description: "description3",
				userId: new mongoose.Types.ObjectId("65eebde6af5c1f55427ff54f"),

			},
			{
				title: "title4",
				description: "description4",
				userId: new mongoose.Types.ObjectId("65eebde6af5c2f55427ff54f"),
			},
		]);
		console.log("-------------");
		console.log("Posts created");
		console.log("-------------");

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
