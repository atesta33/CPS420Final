import { createContext, useState, useContext } from "react"
import PropTypes from 'prop-types'


export const AuthContext = createContext({
    token: null,
    setToken: () => {},
})

export const AuthContentProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthContentProvider.propTypes = {
    children: PropTypes.element.isRequired,
}

export function useAuth() {
    const { token, setToken} = useContext(AuthContext)
    return [ token, setToken ]
}