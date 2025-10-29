import { useQuery } from "@tanstack/react-query"
import PropTypes from "prop-types"
import { getUserInfo } from "../api/users.js"

export function User({id}) {
    const useInfoQuery = useQuery({
        queryKey: ['users', id],
        queryFn: () => getUserInfo(id),
    })
    const userInfo = useInfoQuery.data ?? {}
    return <strong>{userInfo?.username ?? id}</strong>
}

User.propTypes = {
    id: PropTypes.string.isRequired,
}