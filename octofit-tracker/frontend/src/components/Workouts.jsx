import CollectionPage from './CollectionPage'

// API endpoint: https://${CODESPACE_NAME}-8000.app.github.dev/api/workouts
export default function Workouts() {
  return (
    <CollectionPage
      collection="workouts"
      title="Workouts"
      description="Choose a focused session that meets you where you are."
      emptyMessage="No workouts have been published yet."
      renderItem={(workout, index) => (
        <article className="collection-card" key={workout._id ?? workout.id ?? `workout-${index}`}>
          <div className="card-kicker">{workout.fitnessLevel ?? 'All levels'}</div>
          <h2>{workout.title ?? 'Untitled workout'}</h2>
          <p>{workout.description ?? 'No description provided.'}</p>
          <small>{workout.durationMinutes ?? 0} minutes</small>
        </article>
      )}
    />
  )
}