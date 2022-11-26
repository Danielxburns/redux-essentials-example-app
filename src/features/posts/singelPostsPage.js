import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPostById } from './postsSlice'
import { PostAuthor } from './postAuthor'
import { ReactionButtons } from './reactionButtons'
import { TimeAgo } from './timeAgo'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h1>Post not found :(</h1>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h1>{post.title}</h1>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${postId}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
