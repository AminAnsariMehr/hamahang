import axios from 'axios'
import { useAppStore } from '@/stores/app.store'
import { useToast } from 'vue-toastification'
// import { messages } from '@/shared/locales';

const toast = useToast()

// مدیریت درخواست‌های قابل لغو
const controllers = new Map()

const getToken = () => localStorage.getItem('token')

// کنسل کردن دستی یک درخواست خاص
export const cancelRequest = (key) => {
  const controller = controllers.get(key)
  if (controller) {
    controller.abort()
    controllers.delete(key)
    console.warn(`[axiosHandler] Request manually canceled: ${key}`)
  }
}

// کنسل کردن همه درخواست‌ها
export const clearAllRequests = () => {
  controllers.forEach((controller, key) => {
    controller.abort()
    console.warn(`[axiosHandler] Aborted: ${key}`)
  })
  controllers.clear()
}

// تابع اتصال مدیریت درخواست‌ها به یک axios instance
export function applyAxiosHandler(instance) {
  instance.interceptors.request.use(
    (config) => {
      const appStore = useAppStore()

      const requestKey = config.requestKey || `${config.method}-${config.url}`
      config.requestKey = requestKey

      // جلوگیری از درخواست تکراری
      if (controllers.has(requestKey)) {
        controllers.get(requestKey).abort()
        controllers.delete(requestKey)
      }

      const controller = new AbortController()
      config.signal = controller.signal
      controllers.set(requestKey, controller)

      // افزودن توکن
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        // config.headers.Authorization =
        //     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk3MDdiOS1lZTE0LTcxMzktYTRiZS05NWZiZjU1YWIyNWIiLCJqdGkiOiJkZDNmNDlkNTdmMjAwN2I5NWUwOTk0OGM0OGQzNmRkNmI4MjA3Zjc3MmI2NjNiZTk1YjJkNDdlZTg4ZTRhNDRmNDVhYzEzZTJiMjFhM2RlYSIsImlhdCI6MTc0ODE4NDgwMS43NDM4OTksIm5iZiI6MTc0ODE4NDgwMS43NDM5MDQsImV4cCI6MTc1MDc3NjgwMS43MzM1MSwic3ViIjoiMTM0Iiwic2NvcGVzIjpbXX0.oMhwYWpqpqDk1kIqT4yzaweZ9q8fxOIPLnOQt6Z6ufHl4E_5oVxK8J3OWed5TQ6xUIMkCCLjPQygJpK5554w5WIn4PQGBZocn3ihmNx7xBI9LzNtpT3nUmPIP_87oNUlD5AVyG1xeKeQrRV3qe4VuCW6OIzTSCpwgP3jRqiuC_soHgLwpRjVHdX2CJRuN-xxboSIjyihCmJrVwZtMfNo_E8-9inTdmV50jD870NM82r6kmJbVghQfa0XBcMMjbkDo_75BZFmB8NFWPy1wWUW52SkLri8HIsmm26JzFjkuC6Wb4SessFauwdSkgWfMEj34huGtNoV-tDWTruyKA2bURGy95Sou4CSJefp76SkE7FO-v-MwQPBLiCt8e04TVp2g12ykkj1yYmr6SzVV0X2d0RujOsYd3GunVQmS7Eb3LVE94xpYPuM9XLDjHCZCA-H7fQoReWmdRcntoHKONr5RP2-Kd7pXXM5e9y6GaI2hAnnfsoEhGfMewecrs71OMQidPE6ExTwjjg1qcMlB-uuoxcJpM797TcCaH6BMjV6eet_LMgzrPltVeP9os29_CFoU8n9inrCoaPHmhQCpHkIe5NM6Rlss7YNKUtNxm863kJ4TLKCzYspL35B2K0voUh7sst92c3lcwozcGPoWbXEx7aST2FHzBFjnFZMvp9BjhM';
      }

      // لودینگ سراسری
      appStore.startLoading()

      // console.log(`[axiosHandler] REQUEST:`, {
      //     url: config.url,
      //     method: config.method,
      //     data: config.data
      // });

      return config
    },
    (error) => Promise.reject(error),
  )

  instance.interceptors.response.use(
    (response) => {
      const appStore = useAppStore()
      const requestKey = response.config.requestKey
      controllers.delete(requestKey)
      appStore.stopLoading()

      // نمایش پیام موفقیت (در صورتی که message وجود داشته باشد)
      const successMessage = response.data.message
      if (successMessage && response.config.method !== 'get') {
        toast.success(successMessage)
      }

      // console.log(`[axiosHandler] RESPONSE:`, {
      //     url: response.config.url,
      //     status: response.status,
      //     data: response.data
      // });

      return response
    },

    async (error) => {
      const appStore = useAppStore()
      const config = error.config || {}
      const requestKey = config.requestKey
      const status = error?.response?.status

      controllers.delete(requestKey)
      appStore.stopLoading()

      if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
        console.warn(`[axiosHandler] Request canceled: ${requestKey}`)
        return Promise.reject({ canceled: true })
      }

      // const errorMessage = error?.response?.data?.message || 'خطای ناشناخته‌ای رخ داده است';
      const errorMessage = response.data.massage

      // نمایش پیام خطا
      toast.error(errorMessage)

      // نمایش پیام خطا
      if (config.method === 'get' && !errorMessage) {
        toast.error('دریافت اطلاعات با خطا مواجه شد ، دوباره تلاش کنید')
      } else {
        toast.error(errorMessage)
      }

      console.error(`[axiosHandler] ERROR:`, {
        url: config?.url,
        status,
        message: errorMessage,
      })

      if (status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }

      // سیاست retry
      const RETRY_STATUS_CODES = [408, 429, 502, 503, 504]
      const MAX_RETRIES = 2

      config.__retryCount = config.__retryCount || 0
      if (RETRY_STATUS_CODES.includes(status) && config.__retryCount < MAX_RETRIES) {
        config.__retryCount += 1
        console.warn(`[axiosHandler] Retrying request (${config.__retryCount})...`)
        return instance(config)
      }

      return Promise.reject(error)
    },
  )
}
