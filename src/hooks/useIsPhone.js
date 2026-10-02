import { useEffect, useState } from 'react'

const PHONE_MAX_WIDTH = 966

const checkIsPhone = () => window.innerWidth <= PHONE_MAX_WIDTH

// Width-based (not user-agent) so it follows window resizes.
export function useIsPhone() {
    const [isPhone, setIsPhone] = useState(checkIsPhone)

    useEffect(() => {
        const handleResize = () => setIsPhone(checkIsPhone())
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return isPhone
}
