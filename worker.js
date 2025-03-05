addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // Check if the request URI contains a specific path
  if (url.pathname.includes('/specific-path')) {
    // Clone the request and modify the headers
    const modifiedHeaders = new Headers(request.headers)
    modifiedHeaders.set('CF-Connecting-IP', 'new.ip.address.here')

    // Create a new request with the modified headers
    const modifiedRequest = new Request(request, {
      headers: modifiedHeaders
    })

    // Fetch the response with the modified request
    return fetch(modifiedRequest)
  }

  // If the URI does not match, proceed with the original request
  return fetch(request)
}
