export default function setupAxios(axios: any, store: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: {Sub},
      } = store.getState()

      if (Sub) {
        config.headers.Authorization = `Bearer ${Sub}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}
