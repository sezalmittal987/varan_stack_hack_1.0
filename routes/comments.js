var router = require('express').Router()
var mongo = require('mongodb')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost'

router.post('/', (req, res, next)=>{

	mongo.MongoClient.connect(MONGO_URI, (error, client)=>{

		var event_db = client.db('varan').collection('event')

		event_db.findOne({ _id : new mongo.ObjectId(req.body._id)}, (err, event)=>{
			var comment = event.comments;
			var data = {
				user : req.body.name,
				comment : req.body.comment,
				date : new Date().toISOString().slice(0,10)
			};
			

			if(comment === undefined)
				comment = [data];
			else
				comment.push(data);

			event_db.updateOne({ _id : new mongo.ObjectId(req.body._id)}, { $set : { comments : comment } }, (error_update, update)=>{

				if(error_update)
					res.status(400).json({"msg" : "Cannot make Comment"});
			});

			event_db.findOne({ _id : new mongo.ObjectId(req.body._id)}, (error_event, updated_event)=>{

				res.status(200).json(updated_event);
			});

		});
	});
});

module.exports = router;
