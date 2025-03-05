addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  console.log(`Request URL: ${url.href}`)

  // Check if the request URI contains a specific path
  if (url.pathname.includes('klarna')) {
    console.log('Path contains "klarna"')

    // Clone the request and modify the headers
    const modifiedHeaders = new Headers(request.headers)
    modifiedHeaders.set('CF-Connecting-IP', '195.13.221.74')
    modifiedHeaders.set('X-Real-IP', '195.13.221.74')
    console.log('Modified Headers:', [...modifiedHeaders.entries()])

    // Create a new request with the modified headers
    const modifiedRequest = new Request(request, {
      headers: modifiedHeaders
    })
    console.log('Modified Request:', modifiedRequest)

    // Fetch the response with the modified request
    const response = await fetch(modifiedRequest)
    console.log('Response Status:', response.status)
    return response
  }

  // If the URI does not match, proceed with the original request
  console.log('Path does not contain "klarna"')
  const response = await fetch(request)
  console.log('Response Status:', response.status)
  return response
}
