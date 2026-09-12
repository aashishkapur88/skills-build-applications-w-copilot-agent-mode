import { useEffect, useState } from 'react'
import { apiConfigurationMessage, fetchCollection } from '../api'

export default function CollectionPage({ collection, title, description, renderItem, emptyMessage }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    if (apiConfigurationMessage) {
      setStatus('configuration')
      return () => {
        active = false
      }
    }

    fetchCollection(collection)
      .then((records) => {
        if (!active) return
        setItems(records)
        setStatus('ready')
      })
      .catch((requestError) => {
        if (!active) return
        setError(requestError.message)
        setStatus('error')
      })

    return () => {
      active = false
    }
  }, [collection])

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1>{title}</h1>
          <p className="section-description">{description}</p>
        </div>
        {status === 'ready' && <span className="record-count">{items.length} records</span>}
      </div>

      {status === 'loading' && <div className="state-panel">Loading {title.toLowerCase()}...</div>}
      {status === 'configuration' && <div className="state-panel warning-panel">{apiConfigurationMessage}</div>}
      {status === 'error' && <div className="state-panel error-panel">{error}</div>}
      {status === 'ready' && items.length === 0 && <div className="state-panel">{emptyMessage}</div>}
      {status === 'ready' && items.length > 0 && <div className="collection-grid">{items.map(renderItem)}</div>}
    </section>
  )
}