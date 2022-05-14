import React from "react"
import { Route } from "react-router-dom"
import { PostList } from "./post/PostList"
import { PostForm } from "./post/PostForm"
import { PostDetails } from "./post/PostDetail"

export const ApplicationViews = () => {
  return (
    <>
      <h1 >Welcome to Rare Publishing</h1>
      <Route exact path="/">
        <PostList />
      </Route>

      <Route exact path="/posts">
        <>
          <main className="postContainer">
            <h1>Posts</h1>
            <PostList />
          </main>
        </>
      </Route>

      <Route exact path="/posts/create">
        <PostForm />
      </Route>

      <Route path="/posts/:postId(\d+)">
        <PostDetails />
      </Route>

      <Route path="/posts/edit/:postId(\d+)">
        <PostForm />
      </Route>
    </>
  )
}
