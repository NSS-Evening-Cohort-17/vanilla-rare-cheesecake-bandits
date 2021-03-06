import React, { useState, useEffect } from "react"
import { addPost, updatePost, getPostById } from "./PostManager"
import { useParams, useHistory } from 'react-router-dom'

export const PostForm = () => {
    // Use the required context providers for data
    const { postId } = useParams()
    // Component state
    const [post, setPost] = useState({})
    const history = useHistory()

    // Is there a a URL parameter??
    const editMode = postId ? true : false  // true or false

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newPost = Object.assign({}, post)          // Create copy
        newPost[event.target.name] = event.target.value    // Modify copy
        setPost(newPost)                                 // Set copy as new state
    }

    // Get posts from API when component initializes
    useEffect(() => {
        if (editMode) {
            getPostById(postId).then((res) => {
                setPost(res)
            })
        }
    })


    const constructNewPost = () => {

        if (editMode) {
            // PUT
            updatePost({
                id: post.id,
                title: post.title,
                user_id: post.user_id,
                category_id: post.category_id,
                publication_date: post.publication_date,
                content: post.content
            })
                .then(() => history.push("/posts"))
        } else {
            // POST
            addPost({
                id: post.id,
                title: post.title,
                user_id: post.user_id,
                category_id: post.category_id,
                publication_date: post.publication_date,
                content: post.content
            })
                .then(() => history.push("/posts"))
        }

    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">{editMode ? "Update Post" : "New Post"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Post title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        placeholder="Post title"
                        defaultValue={post.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="breed">Author: </label>
                    <input type="text" name="user_id" required className="form-control"
                        placeholder="Post author"
                        defaultValue={post.user_id}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Category: </label>
                    <select name="category_id" className="form-control"
                        value={post.category_id}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a category</option>
                        {
                            locations.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset> */}

            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="userId">Author: </label>
                    <select name="userId" className="form-control"
                        value={post.user_id}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select an author</option>
                        {
                            locations.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset> */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="publication_date">Category: </label>
                    <input type="text" name="category_id" required className="form-control"
                        placeholder="Category"
                        defaultValue={post.category_id}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="publication_date">Date posted: </label>
                    <input type="date" name="publication_date" required className="form-control"
                        placeholder="Post date"
                        defaultValue={post.publication_date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Post Content: </label>
                    <input type="text" name="content" required className="form-control"
                        placeholder="Write your post here!"
                        defaultValue={post.content}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewPost()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Save Post"}
            </button>
        </form>
    )
}