import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import styles from "./Post.module.css";
import { User } from "./User.jsx";

export function Post({ id, title, contents, author, currentPrice, status }) {
  return (
    <article className={styles.postCard}>
      <h3 className={styles.postTitle}>{title}</h3>
      <div className={styles.postContent}>{contents}</div>

      <div className={styles.postAuctionMeta}>
        <div className={styles.currentPrice}>
          Current price: <strong>{currentPrice ?? 0}</strong> tokens
        </div>
        <div className={styles.status}>
          Status: <strong>{status}</strong>
        </div>
      </div>

      {author && (
        <div className={styles.postMeta}>
          <span className={styles.authorLabel}>Written by</span>
          <span className={styles.author}>
            <User id={author} />
          </span>

          <Link to={`/dm/${author}`} className={styles.messageSellerBtn}>
            Message Seller
          </Link>
        </div>
      )}

      <div className={styles.actionsRow}>
        <Link to={`/posts/${id}`} className={styles.bidPageButton}>
          View &amp; Bid
        </Link>
      </div>
    </article>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  currentPrice: PropTypes.number,
  status: PropTypes.string,
};
