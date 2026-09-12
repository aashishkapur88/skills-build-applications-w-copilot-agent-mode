import CollectionPage from './CollectionPage'

export default function Leaderboard() {
  return (
    <CollectionPage
      collection="leaderboard"
      title="Leaderboard"
      description="A quick read on who is building momentum this season."
      emptyMessage="The leaderboard is waiting for its first score."
      renderItem={(entry, index) => (
        <article className="collection-card rank-card" key={entry._id ?? entry.id ?? `leaderboard-${index}`}>
          <span className="rank-number">{index + 1}</span>
          <div>
            <div className="card-kicker">{entry.period ?? 'All-time'}</div>
            <h2>{entry.userId ?? 'Unknown athlete'}</h2>
            <p>{entry.points ?? 0} points</p>
          </div>
        </article>
      )}
    />
  )
}