import { useQuery } from '@tanstack/react-query'
import { getTournaments } from '../api/tournaments.js'
import { TournamentList } from '../components/TournamentList'
import { CreateTournament } from '../components/CreateTournament.jsx'
import { TournamentFilter } from '../components/TournamentFilter.jsx'
import { TournamentSorting } from '../components/TournamentSorting.jsx'
import { useState } from 'react'
import { Header } from '../components/Header.jsx'
import styles from './Blog.module.css'


export function Tournaments() {
    const [organizer, setOrganizer] = useState('')
    const [sortBy, setSortBy] = useState('startTime')
    const [sortOrder, setSortOrder] = useState('ascending')
    const tournamentsQuery = useQuery({
            queryKey: ['tournaments', {organizer, sortBy, sortOrder} ],
            queryFn: () => getTournaments({ organizer, sortBy, sortOrder }),
        })

        const tournaments = tournamentsQuery.data ?? []
    return (
        <div className={styles.marketplacePage}>
            <Header />

            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>♟️ Chess Tournaments</h1>
                    <p className={styles.pageSubtitle}>
                        Browse and join competitive chess tournaments
                    </p>
                </div>

                <section className={styles.createListingSection}>
                    <h2 className={styles.sectionTitle}>Create Tournament</h2>
                    <CreateTournament />
                </section>

                <div className={styles.toolbar}>
                    <div className={styles.filterGroup}>
                        <span className={styles.toolbarLabel}>Filter by Organizer</span>
                        <TournamentFilter
                            field='organizer'
                            value={organizer}
                            onChange={(value) => setOrganizer(value)}
                        />
                    </div>

                    <div className={styles.sortGroup}>
                        <span className={styles.toolbarLabel}>Sort Tournaments</span>
                        <TournamentSorting
                            fields={['startTime', 'name', 'createdAt']}
                            value={sortBy}
                            onChange={(value) => setSortBy(value)}
                            orderValue={sortOrder}
                            onOrderChange={(orderValue) => setSortOrder(orderValue)}
                        />
                    </div>
                </div>

                <div className={styles.listingsSection}>
                    <h2 className={styles.listingsTitle}>
                        Available Tournaments <span className={styles.count}>({tournaments.length})</span>
                    </h2>
                    <TournamentList tournaments={tournaments} />
                </div>
            </div>
        </div>
    )
}
