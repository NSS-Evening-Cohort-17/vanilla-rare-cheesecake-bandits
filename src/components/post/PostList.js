import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getPosts, getPostsBySearchTerm } from "./PostManager"
import Post from "./Post"
import "./Post.css"
import { PostSearch } from "./PostSearch"

export const PostList = () => {

    const [ posts, setPosts ] = useState([])
    const [ searchTerm, setSearchTerm ] = useState('')
    const history = useHistory()

    // Initialization effect hook -> Go get post data
    useEffect(()=> {
        if (searchTerm.length > 1) {
            getPostsBySearchTerm(searchTerm).then((postsData) => setPosts(postsData))
        } else {
            getPosts().then((postsData) => setPosts(postsData))
        }
    }, [searchTerm])

    const onSearchTermChange = (value) => {
        setSearchTerm(value)
    }

    return (
        <>
            <PostSearch onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} />
            <div style={{ marginTop: "2rem"}}>
                <button onClick={() => history.push("/posts/create")}>
                    New Post
                </button>
                <div className="posts">
                    {
                        posts.map(post => <Post key={post.id} post={post} />)
                    }
                </div>
            </div>
        </>
    )
}