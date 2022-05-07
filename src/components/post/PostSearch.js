import React from "react"

export const PostSearch = ({ searchTerms, onSearchTermChange }) => {

    return (
        <>
            <div>Search for a post</div>
            <input type="text" className="posts__search"
                value={searchTerms}
                onChange={
                    (changeEvent) => {
                        onSearchTermChange(changeEvent.target.value)
                    }
                }
                placeholder="Enter search string here..." />
        </>
    )
}