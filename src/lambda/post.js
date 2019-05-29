export function handler(event, context, callback) {
    console.log("queryStringParameters", event.queryStringParameters)
    const data = JSON.parse(event.body)

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    })
  }