import envData from '../env.json'
import AsyncStorage from '@react-native-community/async-storage';


export const getRefreshToken = async(token)=> {
    const url = `${envData.domain_name}${envData.refresh_token}`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        "content-type": "application/json",

      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: "kIoMJQ5bFNuWcLs4aQAHDhP7tPaVgOEGyCRdDSOA",
        client_secret: "MuB3SI9Sa7ARhzGNHVceBa7E0tR0sbXUl7xndvpvvoSo10g38SJXuCeej9qBeivfz1ITCHZbPTRY0EAVvXooVBO0NiYZZ0rKFmuXBaH8EVwoknhIV7yy7nJQTO02sZ84",
        // backend: "google-oauth2",
        refresh_token: token

      }),
    })
    const data = await res.json()
      .then((response) => {
        console.log('Refresh', response)

         AsyncStorage.setItem('Refresh', JSON.stringify(response));
      })
      .catch((err) => {
        console.log(TAG, "error", err)
      })
  }