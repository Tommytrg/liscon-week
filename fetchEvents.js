import Papa from 'papaparse'

export function fetchEvents() {
  const fileUrl =
    process.env.FILE_URL ||
    'https://raw.githubusercontent.com/Tommytrg/liscon-week/fetch-events/content/events/data.csv'

  return new Promise((resolve, reject) => {
    Papa.parse(fileUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete(results) {
        if (results.data) {
          return resolve(
            results.data.map((event) => ({
              ...event,
              from: Number(event.from),
              to: Number(event.to),
            }))
          )
        } else {
          return reject(results.errors)
        }
      },
    })
  })
}
