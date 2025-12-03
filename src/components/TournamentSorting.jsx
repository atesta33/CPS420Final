import PropTypes from 'prop-types'
import styles from './PostSorting.module.css'

export function TournamentSorting({
    fields = [],
    value,
    onChange,
    orderValue,
    onOrderChange,
}) {
    return (
        <div className={styles.sortingContainer}>
            <div className={styles.selectGroup}>
                <label htmlFor='sortBy' className={styles.label}>Sort by</label>
                <select
                    name='sortBy'
                    id='sortBy'
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className='select'
                >
                    {fields.map((field) => (
                        <option key={field} value={field}>
                            {field}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.selectGroup}>
                <label htmlFor='sortOrder' className={styles.label}>Order</label>
                <select
                    name='sortOrder'
                    id='sortOrder'
                    value={orderValue}
                    onChange={(e) => onOrderChange(e.target.value)}
                    className='select'
                >
                    <option value={'ascending'}>Ascending</option>
                    <option value={'descending'}>Descending</option>
                </select>
            </div>
        </div>
    )
}

TournamentSorting.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    orderValue: PropTypes.string.isRequired,
    onOrderChange: PropTypes.func.isRequired,
}
