export default {
  queryStrings(params) {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&')
  },
  getUrl(root, path, query) {
    return `${root}/${path}?${this.queryStrings(query)}`
  },
  noImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
  perPageCount: 10,
  mapZoom: 14
}