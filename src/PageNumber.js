const PageNumber = props => {
  const {pageNo, currentPageNumber} = props
  const onClickPageNumber = () => {
    currentPageNumber(pageNo)
  }
  return (
    <li>
      <button onClick={onClickPageNumber} className="page-no" type="button">
        {pageNo}
      </button>
    </li>
  )
}

export default PageNumber
