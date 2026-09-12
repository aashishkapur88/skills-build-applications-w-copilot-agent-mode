import CollectionPage from './CollectionPage'

export default function Activities() {
  return (
    <CollectionPage
      collection="activities"
      title="Activity log"
      description="See the latest movement logged by your OctoFit community."
      emptyMessage="No activities have been logged yet."
      renderItem={(activity) => (
        <article className="collection-card" key={activity._id || activity.id}>
          <div className="card-kicker">{activity.type || 'Activity'}</div>
          <h2>{activity.durationMinutes || 0} minutes</h2>
          <p>{activity.points || 0} points earned</p>
          <small>{activity.userId || 'Unassigned athlete'}</small>
        </article>
      )}
    />
  )
}