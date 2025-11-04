import PropTypes from 'prop-types'
import { Post } from './Post.jsx'
import styles from './PostList.module.css'

export function PostList({ posts = [] }) {
    if (posts.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>No posts yet</h3>
                <p>Be the first to create a post!</p>
            </div>
        )
    }

    return (
        <div className={styles.postGrid}>
            {posts.map((post) => (
                <Post key={post._id} {...post} />
            ))}
        </div>
    )
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}