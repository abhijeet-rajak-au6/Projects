const userModel = require('../models/user');
const boardModel = require('../models/board');
const {createTransport}= require("nodemailer");
const ObjectId = require('mongodb').ObjectID;

module.exports={
    async userRegister(req,res){

        // console.log('register',req.body);
        try {
			const newUser = new userModel({ ...req.body });
			await newUser.save();
			return res.status(200).send({
                status:'sucess',
				msg: "User registered sucessfully",
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
    },

    async userLogin(req,res){
        // console.log('login');
        const { password, userEmail } = req.body;
		if (!password || !userEmail)
			return res.status(404).send({ msg: "Pls give email and password" });
		try {
			const user = await userModel.findByEmailAndPassword(userEmail, password);
			// console.log("user",user)
			user[0].generateToken();
		 	await user[0].save({ validateBeforeSave: false });
			return res.status(200).send({
                status:'success',
				msg: `Welcome ${user[0].userName}`,
				userId: user[0].id,
				userName: user[0].userName,
				userEmail: user[0].userEmail,
				acessToken: user[0].token,
			});
		} catch (err) {
			return res.status(404).send({ msg: err });
		}
	},
	async logout(req, res) {
		// console.log('logout');
		try {

			const user = await userModel.findById(req.userId);
			if (user) {
				user.token = null;
				await user.save({ validateBeforeSave: false });
				return res.status(200).send({msg:"Thank you visit again"});
			} else {
				throw Error("Please Login first");
			}
		} catch (err) {
			return res.status(500).send(err.message);
		}
	},
	async uploadData(req,res){
		try{
			console.log("iam in upload data");
			// console.log(req.body);
			const {_id}=req.params;
			// console.log(_id);
			const boardData = await boardModel.findById(_id);
			let userData1;
			let userData2;
			// await boardModel.findOneAndUpdate({_id:_id},{...req.body},{new:true});
			// await boardModel.findOneAndUpdate({refBoardId:_id},{...req.body},{new:true});
			if(boardData.refBoardId){
				userData1 = await boardModel.findOneAndUpdate({_id:_id},{...req.body},{new:true});
				userData2 = await boardModel.findOneAndUpdate({_id:boardData.refBoardId},{...req.body},{new:true});
			}
			else{

				userData1= await boardModel.findByIdAndUpdate({_id:_id},{...req.body},{new:true});
				userData2= await boardModel.findOneAndUpdate({refBoardId:_id},{...req.body},{new:true});
			}
			// console.log('userData1',userData1);
			// console.log('userData2',userData2);
			return res.status(200).send({
				status:'sucess',
				// userData
			});
		}
		catch(err){
			console.log(err);
			return res.status(500).send(err.message);
		}
		
	},
	async sendMail(req,res){

		console.log('send Mail params',req.params)
		try{
			const user = await userModel.find({userEmail:req.params.email});
			console.log('user',user);
			if(!user[0]){
	
				return res.status(404).send({
					status:'fail',
					msg:'user should be registerd before sending invitation'
				})
			}
			const transport = createTransport({
				host:"smtp.gmail.com",
				port: 465,
				secure: true,
				debug:true,
				auth: {
					user: process.env.GMAIL_USER,
					pass: process.env.GMAIL_PWD,
				},
				tls: {
					// do not fail on invalid certs
					rejectUnauthorized: false
				}
			})
			let html =`<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>: A2ZWORK :</title>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
			</head>
			<body>
			<a href=https://tranquil-plains-09028.herokuapp.com/acceptInvitation/${user[0].userEmail}/${req.params.trelloId} ><button class="btn btn-primary" >Accept Invitation</button></a>
			<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
			</body>
        	</html>`;
			const response = await transport.verify();
			console.log(response);
				const mail = await transport.sendMail({
	
	
					from: process.env.GMAIL_USER,
					to: req.params.email,
					// text:`Node Mailer is done bro your email:${newUser.companyEmail} password:${password}`
					html: html
				})
			if(mail){

				return res.status(200).send({
					status:'success'
				})
			}
		}
		catch(err){
			console.log(err);
			return res.status(500).send(err.message);
		}
	},
	async acceptInvite(req,res){
		try{
			const {trelloId,email}=req.params;
			// console.log(ObjectId("hexString",trelloId))
			// let id = JSON.parse(trelloId)
			// console.log(trelloId,email);
			const board = await boardModel.find({_id:trelloId});
			const user = await userModel.find({userEmail:email});
			// console.log(user[0]._id);
			const boardBody={
				userId:user[0]._id,
				refBoardId:board[0]._id,
				boardName:board[0].boardName,
				onHoldItems:board[0].onHoldItems,
				progressItems:board[0].progressItems,
				backlogItems:board[0].backlogItems,
				completeItems:board[0].completeItems
			}
			// console.log(boardBody);
			const savedBoard = new boardModel({...boardBody});
			console.log(await savedBoard.save());
			return res.status(200).send({
				status:'success',
			})
		}
		catch(err){
			return res.status(500).send(err.message);
		}
		
	}
}	