import mongoose, {Schema} from "mongoose"
import {Post} from "../types/services/mongo.types"

class MongooseService {
    constructor() {
        console.log("> MongoDB initiated...")
    }

    private postSchema = new Schema<Post>(
        {
            content: {type: String, required: true, unique: true},
            author: {type: String, required: true},
            category: {type: String, required: true},
            slug: {type: String, required: true},
        },
        {timestamps: true, versionKey: false}
    )

    private postStorage = mongoose.model<Post>("posts", this.postSchema)

    connectWithRetry = async (
        count: number = 0,
        retryAttempt: number = 5,
        retrySeconds: number = 5
    ): Promise<boolean> => {
        if (count >= retryAttempt) {
            console.log("Connection to Mongo DB failed")
            return false
        }
        try {
            await mongoose.connect(
                process.env.MONGO_CONNECTION_STRING as string,
                {
                    dbName: "blogue",
                }
            )
            console.log("> MongoDB connection... ok")
            return true
        } catch (err: any) {
            count++
            console.log(
                `MongoDB connection failed, will retry ${count}/${retryAttempt} attempt after ${retrySeconds} seconds`,
                err.message
            )
            await new Promise(resolve => setTimeout(resolve, retrySeconds * 1000));
            return this.connectWithRetry(count, retryAttempt, retrySeconds);
        }
    }

    // findPostsByAuthor = async (author: string): Promise<Array<Post>> =>
    //     this.postStorage.find({author}, {_id: 0}).lean().exec()

    // findPostsByCategories = async (category: string): Promise<Array<Post>> =>
    //     this.postStorage.find({category}, {_id: 0}).lean().exec()

    fetchAllPosts = async (): Promise<Array<Post>> =>
        this.postStorage.find({}, {_id: 0}).lean().exec()

    // addUser = async (userFields: CreateUserDto): Promise<User> => {
    //     const instance = new this.userStorage({
    //         ...userFields,
    //     })
    //     await instance.save()
    //     return instance
    // }

    // findUserByEmail = async (email: string): Promise<User> => {
    //     return this.userStorage.findOne({email}).exec()
    // }

    // findUserByUsername = async (username: string): Promise<User> => {
    //     return this.userStorage.findOne({username}).exec()
    // }
}

export default new MongooseService()
