import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

export async function createPost(userId, {title, contents, tags}) {
    console.log('inside services createPost')
    const post = new Post({title, author: userId, contents, tags})
    return await post.save()
}


async function listPosts(
    query = {},
    {sortBy = 'createdAt', sortOrder = 'descending'} = {},
){

    return await Post.find(query).sort({[sortBy]: sortOrder})
}

export async function listAllPosts(options){
    return await listPosts({}, options)
}

export async function listPostsByAuthor(authorUsername, options) {
    const user = await User.findOne({username: authorUsername})
    if (!user) return []
    return await listPosts({author: user._id}, options)
}

export async function listPostsByTag(tags, options){
    return await listPosts({tags}, options)
}

export async function getPostById(postID) {
    return await Post.findById(postID)
}

export async function updatePost(userID, postID, {title, contents, tags}) {
    return await Post.findByIdAndUpdate(
        {_id: postID, author: userID},
        {$set: {title, contents, tags}},
        {new: true},
    )
}

export async function deletePost(userID, postID) {
    return await Post.deleteOne({_id: postID, author: userID})
}