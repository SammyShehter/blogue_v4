import mongoose, {Schema} from "mongoose"
import {Post, rawEditPost} from "../types/services/mongo.types"

class MongooseService {
    constructor() {
        console.log("> MongoDB initiated...")
    }

    private postSchema = new Schema<Post>(
        {
            title: {type: String, required: true, unique: true},
            description: {type: String, required: true, unique: true},
            content: {type: String, required: true, unique: true},
            author: {type: String, required: true},
            category: {type: String, required: true},
            slug: {type: String, required: true, unique: true},
            views: {type: Number},
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
                    dbName: process.env.DBNAME,
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
            await new Promise((resolve) =>
                setTimeout(resolve, retrySeconds * 1000)
            )
            return this.connectWithRetry(count, retryAttempt, retrySeconds)
        }
    }

    findPostsByAuthor = async (author: string): Promise<Array<Post>> =>
        this.postStorage.find({author}, {_id: 0}).lean().exec()

    findPostsByCategories = async (category: string): Promise<Array<Post>> =>
        this.postStorage.find({category}, {_id: 0}).lean().exec()

    fetchLastPosts = async (): Promise<Array<Post>> =>
        this.postStorage
            .find({}, {_id: 0, content: 0})
            .limit(20)
            .sort({createdAt: -1})
            .lean()
            .exec()

    fetchPost = async (slug: string): Promise<Post> =>
        this.postStorage.findOne({slug}, {_id: 0}).lean().exec()

    deletePost = async (slug: string): Promise<mongoose.mongo.DeleteResult> =>
        this.postStorage.deleteOne({slug}).lean().exec()

    addPost = async (rawPost: Post): Promise<Post> => {
        const newPost = new this.postStorage(rawPost)
        await newPost.save()
        return newPost
    }

    editPost = async (editPost: rawEditPost): Promise<Post> => {
        const post = await this.postStorage.findOneAndUpdate(
            {slug: editPost.slug},
            {$set: editPost}
        )
        return post
    }
}

export default new MongooseService()
