import React, { useState, useEffect }from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import Meta from "./Meta";
import Comment from "./comment"
import Author from "./Author";
import NextPrev from "./NextPrev";
import { comment } from "postcss";

const Post = props => {
  const data = useStaticQuery( graphql`
    query RepoQuery {
      site {
        siteMetadata {
          commentsGitHubRepo
        }
      }
    }
    `)
  const {
    post,
    post: {
      html,
      htmlAst,
      fields: { prefix, slug },
      frontmatter: { title, author, tags },
      parent: { modifiedTime }
    },
    authornote,
    next: nextPost,
    prev: prevPost,
    theme
  } = props;
  const commentBox = React.createRef()
  useEffect(() => {
    
    const commentScript = document.createElement('script')
    const repository = data.site.siteMetadata.commentsGitHubRepo

    commentScript.async = true
    commentScript.src = 'https://utteranc.es/client.js'
    commentScript.setAttribute('repo', repository) 
    commentScript.setAttribute('issue-term', 'title')
    commentScript.setAttribute('id', 'utterances')
    commentScript.setAttribute('theme', 'github-light')
    commentScript.setAttribute('crossorigin', 'anonymous')
    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(commentScript)
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`)
    }
  }, [])

  return (
    
    <React.Fragment>
      <header>
        <Headline title={title} theme={theme} />
        <Meta prefix={prefix} lastEdit={modifiedTime} author={author} tags={tags} theme={theme} />
      </header>
      <Bodytext content={post} theme={theme} />
      <Comment commentBox={commentBox} />
      <footer>
         {/*<Author note={authornote} theme={theme} /> */}
         <NextPrev next={nextPost} prev={prevPost} theme={theme} />
      </footer>
    </React.Fragment>
  );
};


Post.propTypes = {
  post: PropTypes.object.isRequired,
  authornote: PropTypes.string.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
  theme: PropTypes.object.isRequired
};


export default Post;
