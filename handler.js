let axios = require('axios')

module.exports.proxy = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  console.log('Incoming event:', JSON.stringify(event))

  // Extract path and determine if the response should be JSON
  let isJsonResponse = event.queryStringParameters && event.queryStringParameters.json
  let path = event.queryStringParameters && event.queryStringParameters.url

  if (!path) {
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' },
      body: 'Error: URL path parameter is required',
    })
    return
  }

  let targetUrl = decodeURIComponent(path)

  // Make sure the URL starts with "http://" or "https://"
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'http://' + targetUrl
  }

  try {
    let response = await axios.get(targetUrl, { timeout: 30000 }) // Set timeout to 30 seconds
    let body = isJsonResponse ? JSON.stringify(response.data) : response.data

    callback(null, {
      statusCode: 200,
      headers: { 'Content-Type': isJsonResponse ? 'application/json' : 'text/plain', 'Access-Control-Allow-Origin': '*' },
      body: body,
    })
  } catch (error) {
    console.error('Error fetching data:', error)

    callback(null, {
      statusCode: error.response ? error.response.status : 500,
      headers: { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' },
      body: error.message,
    })
  }
}

