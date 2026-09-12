import CollectionPage from './CollectionPage'

export default function Users() {
  return (
    <CollectionPage
      collection="users"
      title="Athletes"
      description="Meet the people making room for healthier routines."
      emptyMessage="No athlete profiles are available yet."
      renderItem={(user, index) => (
        <article className="collection-card" key={user._id ?? user.id ?? `user-${index}`}>
          <div className="card-kicker">{user.fitnessLevel ?? 'Beginner'}</div>
          <h2>{user.name ?? 'Unnamed athlete'}</h2>
          <p>{user.email ?? 'No email provided'}</p>
          <small>Team: {user.teamId ?? 'Independent'}</small>
        </article>
      )}
    />
  )
}