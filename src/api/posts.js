export const getPosts = async (queryParams) => {
    try {
        console.log('backend URL:', import.meta.env.VITE_BACKEND_URL)
        const url = new URL('posts', import.meta.env.VITE_BACKEND_URL)

        Object.entries(queryParams).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v)
        })

        const res = await fetch(
            url.toString(),
        )
        return await res.json()
    } catch (error) {
        console.error('Error fetching posts:', error)
    }
}

export const createPost = async (token, post) => {
    try {
        const url = new URL ('posts', import.meta.env.VITE_BACKEND_URL)
        const res = await fetch(url.toString(), {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(post),
        })
        return await res.json()
    } catch (error) {
        console.error('Error creating post:', error)
    }
}