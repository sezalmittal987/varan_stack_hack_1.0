var router = require('express').Router();
var mongo = require('mongodb')

const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost'
	
router.get('/:id', (req, res, next)=>{

	var id = req.params.id;
	mongo.MongoClient.connect(MONGO_URL, (error, client)=>{

		if(error)
			res.status(200).json({"msg" : "Internal Server Error"});
		else{
			var user_db = client.db('varan').collection('user');
			var event_db = client.db('varan').collection('event');
			var self = 0;
                        var corporate = 0;
                        var group = 0;
                        var others = 0;
			var count = 0;

			event_db.findOne({ _id : new mongo.ObjectId(id) }, (error_event, event)=>{


				for(var i = 0; i < event.users.length; i++){


					user_db.findOne({_id : new mongo.ObjectId(event.users[i]._id)}, (err, user)=>{



						var type = user.registration_type;
	
						count += 1;
						if(type == "Self")
						{
							self += 1;
						} else{
							if(type == "Group"){
								group += 1;
							} else {
								if(type == "Corporate"){
									corporate += 1;
								}
								if(type == "Others"){
									others += 1;
								}
							}
						}

				
						if((count) == event.users.length){
	
							var data = {
								self : self,
								group : group,
								corporate : corporate,
								others: others
							};


							res.status(200).json(data);
						}
					});
				}
			});
		}
	});
});

module.exports = router;
