export function getLibs() {
  return fetch(`${process.env.REACT_APP_HOST_URL}/opendata/7705851331-libraries/data-2021-07-05T00-00-00-structure-2019-10-17T00-00-00.json`)
    .then(response => response.json())
}
