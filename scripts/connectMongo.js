require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

async function getContracts(studentId) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    

    try {
        await client.connect();
        const db = await client.db('student');
        const contracts = await db.collection("contracts").find({ studentId }).toArray();
        console.log("contracts from db: ", contracts);
        return contracts;
    }
    catch (e) {
        console.log("error in db: ", e);
    }
    finally {
        
    }

}
function connectMongo(uri) {
    //TODO: connect to mongoDB seperately
}
uri= "mongodb+srv://test:DER9099@cluster0.lhdk2.mongodb.net/student?retryWrites=true&w=majority";
async function uploadtoMongo( studentId,contractId) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    

    try {
        await client.connect();
        const db = await client.db('student');
        const collection = await db.collection("contracts");
        await collection.insertOne({ studentId,contractId }, (err, result) => {
            if (err) {
                console.log("Error occured while inserting data to MongoDB: ", err);
            }
            else {
                console.log("Data inserted to MongoDB", result);
            }
        });
    }
    catch (e) {
        console.log("error in db: ", e);
    }
    finally {
        
    }
}





module.exports = { uploadtoMongo,getContracts };

