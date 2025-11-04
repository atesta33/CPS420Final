import PropTypes from 'prop-types'
import {User} from './User.jsx'
import styles from './Post.module.css'

export function Post({title, contents, author}) {
    return (
        <article className={styles.postCard}>
            <h3 className={styles.postTitle}>{title}</h3>
            <div className={styles.postContent}>{contents}</div>
            {author && (
                <div className={styles.postMeta}>
                    <span className={styles.authorLabel}>Written by</span>
                    <span className={styles.author}>
                        <User id={author} />
                    </span>
                </div>
            )}
        </article>
    )
}

Post.propTypes = {
    title: PropTypes.string.isRequired,
    contents: PropTypes.string,
    author: PropTypes.string,
}