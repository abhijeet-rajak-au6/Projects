const userModel = require('../models/user');

module.exports={

    async userRegister(req,res){

        console.log('register',req.body);
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
        console.log('login');
        const { password, userEmail } = req.body;
		if (!password || !userEmail)
			return res.status(404).send({ msg: "Pls give email and password" });
		try {
			const user = await userModel.findByEmailAndPassword(userEmail, password);
			console.log("user",user)
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
		console.log('logout');
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
			console.log(req.body);
			const userData = await userModel.findByIdAndUpdate(req.userId,{...req.body},{new:true});
			return res.status(200).send({
				status:'sucess',
				userData
			})
		}
		catch(err){
			return res.status(500).send(err.message);
		}
		
	},
	async getUserData(req,res){

		try{
			const trelloData = await userModel.findById(req.userId);
			return res.status(200).send({
				status:'success',
				user:trelloData
			})
		}
		catch(err){

		}
	}
}