addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // Check if the request URI contains a specific path
  if (url.pathname.includes('klarna')) {

    // Clone the request and modify the headers
    const modifiedHeaders = new Headers(request.headers)
    modifiedHeaders.set('CF-Connecting-IP', '195.13.221.74')
    modifiedHeaders.set('X-Real-IP', '195.13.221.74')

    // Create a new request with the modified headers
    const modifiedRequest = new Request(request, {
      headers: modifiedHeaders
    })

    // Fetch the response with the modified request
    const response = await fetch(modifiedRequest)
    return response
  }

  // If the URI does not match, proceed with the original request
  const response = await fetch(request)
  return response
}
