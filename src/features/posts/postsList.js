import { useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchPosts,
  /* selectAllPosts, */
  selectPostIds,
  selectPostById,
} from './postsSlice'
import { Spinner } from '../../components/Spinner'
import { PostAuthor } from './postAuthor'
import { ReactionButtons } from './reactionButtons'
import { TimeAgo } from './timeAgo'

let PostExerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

PostExerpt = memo(PostExerpt)

export const PostsList = () => {
  const dispatch = useDispatch()
  const orderedPostIds = useSelector(selectPostIds)
  //const posts = useSelector(selectAllPosts)
  const postsStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  let content

  if (postsStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postsStatus === 'success!') {
    content = orderedPostIds.map((postId) => (
      <PostExerpt key={postId} postId={postId} />
    ))
  } else if (postsStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
