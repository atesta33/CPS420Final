import PropTypes from 'prop-types'

export function TournamentFilter({field, value, onChange}) {
    return (
        <input
            type='text'
            name={`filter-${field}`}
            id={`filter-${field}`}
            placeholder={`Filter by ${field}...`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className='input'
        />
    )
}

TournamentFilter.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}
