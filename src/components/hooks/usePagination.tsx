import { useMemo } from "react"



const usePagination = (totalPages) => {
    
    const paginationMemo = useMemo(() => {
        const result = [];
        for (let i = 1; i <= totalPages; i++) {
        result.push(i)
        console.log('usePagination в работе')
    }  return result
    }, [totalPages])
    return paginationMemo
    

   
}

export default usePagination