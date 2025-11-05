import {useMutation, useQueryClient } from '@tanstack/react-query'
import {useState} from 'react'
import { createPost } from '../api/posts.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import styles from './CreatePost.module.css'


export function CreatePost() {
    const [token] = useAuth()
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('')
    const queryClient = useQueryClient()
    const createPostMutation = useMutation({
        mutationFn: () => createPost(token, { title, contents}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"]})
            setTitle('')
            setContents('')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        createPostMutation.mutate({})
    }

    if (!token) {
        return (
            <div className={styles.loginPrompt}>
                Please log in to create a listing.
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className={styles.createForm}>
            <div className={styles.formGroup}>
                <label htmlFor="create-title" className={styles.label}>Title</label>
                <input
                    type='text'
                    name='create-title'
                    id='create-title'
                    placeholder='Give your listing a title...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.titleInput}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="create-contents" className={styles.label}>Content</label>
                <textarea
                    id='create-contents'
                    placeholder='Share your listing...'
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                    className={styles.contentTextarea}
                />
            </div>

            <button
                type='submit'
                disabled={!title || createPostMutation.isPending}
                className={styles.submitButton}
            >
                {createPostMutation.isPending ? 'Creating...' : 'Create Listing'}
            </button>

            {createPostMutation.isSuccess && (
                <div className={styles.successMessage}>
                    ✓ Post created successfully!
                </div>
            )}
        </form>
    )
}

