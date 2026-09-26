import { useEffect, useState } from 'react'
import RiotApiCall from '../../API/RiotAPI.js'

// true = last League game won, false = lost, null = unknown/not loaded.
export function useMatchOutcome() {
    const [matchOutcome, setMatchOutcome] = useState(null)

    useEffect(() => {
        let cancelled = false
        RiotApiCall()
            .then((result) => {
                if (!cancelled) setMatchOutcome(result)
            })
            .catch((err) => {
                if (!cancelled) console.error('RiotApiCall failed:', err)
            })
        return () => { cancelled = true }
    }, [])

    return matchOutcome
}
