import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { selectPostsByUserId } from '../posts/postsSlice'
import { Link } from 'react-router-dom'

export const UserPage = ({ match }) => {
  const { userId } = match.params
  const user = useSelector((state) => selectUserById(state, userId))
  const userPosts = useSelector((state) => selectPostsByUserId(state, userId))

  const postTitles = userPosts.map((post) => {
    return (
      <li key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>
    )
  })

  return (
    <article className="user-page">
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </article>
  )
}
