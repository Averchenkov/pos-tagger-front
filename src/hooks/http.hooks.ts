import {useState, useCallback} from "react"

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const request = useCallback(async (url: string, method: string = "GET", body = null, headers:Headers = new Headers({})) => {
	setLoading(true)
	try {
	  if (body){
		body = JSON.stringify(body)
		headers.append("Content-Type", "application/json")
	  }

	  const response = await fetch(/*"https://arcane-forest-49347.herokuapp.com/" + */url, {method, body, headers})
	  const data = await response.json()

	  if (!response.ok) {
		throw new Error(data.message || "Что-то пошло не так")
	  }
	  //console.log("loading")

	  setLoading(false)

	  return data

	} catch (e) {
	  setLoading(false)
	if (e instanceof Error) {
		setError(e.message)
	}
	  throw e
	}
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
