import CollectionPage from './CollectionPage'

export default function Teams() {
  return (
    <CollectionPage
      collection="teams"
      title="Teams"
      description="Find the crews turning consistent effort into shared progress."
      emptyMessage="No teams have been created yet."
      renderItem={(team, index) => (
        <article className="collection-card" key={team._id ?? team.id ?? `team-${index}`}>
          <div className="card-kicker">Team</div>
          <h2>{team.name ?? 'Unnamed team'}</h2>
          <p>{team.memberIds?.length || 0} members</p>
          <small>Captain: {team.captainId ?? 'Unassigned'}</small>
        </article>
      )}
    />
  )
}