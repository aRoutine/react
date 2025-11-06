import MyButton from "./UI/MyButton/MyButton"


const PaginationItems = ({paginationList, setPage, onPage}) => {
    setPage = setPage()
    const onClick = (page) => {
        setPage(page)
        console.log(page, onPage)
    }
    return paginationList.map(function (page, index) {
        return <button type="button" className={onPage === page ? 'page page__on' : 'page'} onClick={() => onClick(page)} key={page}>{page}</button> 
    })
}

export default PaginationItems