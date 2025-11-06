import { useState } from "react";


const useFatching = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setErrorMassage] = useState()

const fatching = async (...args) => {
    try{
            setIsLoading(true)
            await callback(...args)
        } catch(e) {
            setErrorMassage(e.message)
        } finally{
            setIsLoading(false)
        }
    }
    
  return [fatching, isLoading, error]
}


export default useFatching;