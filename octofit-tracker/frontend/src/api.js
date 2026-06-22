const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const usesLocalApiFallback = !codespaceName;

function getArrayFromPayload(payload, resourceName) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.[resourceName])) {
    return payload[resourceName];
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.[resourceName])) {
    return payload.data[resourceName];
  }

  return [];
}

export async function fetchResource(resourceName) {
  const response = await fetch(`${apiBaseUrl}/${resourceName}/`);

  if (!response.ok) {
    throw new Error(`Request failed for ${resourceName}: ${response.status}`);
  }

  const payload = await response.json();
  return getArrayFromPayload(payload, resourceName);
}
