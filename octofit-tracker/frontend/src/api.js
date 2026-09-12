const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : ''

export const apiConfigurationMessage = codespaceName
  ? ''
  : 'Set VITE_CODESPACE_NAME in frontend/.env.local to connect to the API.'

function getItems(payload) {
  if (Array.isArray(payload)) return payload

  for (const key of ['data', 'items', 'results', 'records']) {
    if (Array.isArray(payload?.[key])) return payload[key]
  }
  console.warn('Unable to find items in payload:', payload)

  return []
}

export async function fetchCollection(collection) {
  const response = await fetch(`${apiBaseUrl}/api/${collection}/`)
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.error || `Unable to load ${collection}.`)
  }

  return getItems(payload)
}