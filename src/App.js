import {Component} from 'react'
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronRight,
  HiChevronLeft,
} from 'react-icons/hi'
import EachItem from './EachItem'
import PageNumber from './PageNumber'

import './App.css'

class App extends Component {
  state = {
    data: [],
    pages: [],
    activePageNumber: 1,
    checkedList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {pages} = this.state
    const url =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json?role="member"'
    const response = await fetch(url)
    const data = await response.json()
    const noOfPages = Math.round(data.length / 10)

    for (let index = 0; index < noOfPages; index += 1) {
      pages[index] = index + 1
    }
    this.setState({data, pages})
  }

  currentPageNumber = id => this.setState({activePageNumber: id})

  goToFirstPage = () => this.setState({activePageNumber: 1})

  goToLastPage = () => {
    const {pages} = this.state

    this.setState({activePageNumber: pages[pages.length - 1]})
  }

  goToLeftPage = () => {
    const {activePageNumber} = this.state
    if (activePageNumber > 1) {
      this.setState(prevState => ({
        activePageNumber: prevState.activePageNumber - 1,
      }))
    }
  }

  goToRightPage = () => {
    const {activePageNumber, pages} = this.state
    if (activePageNumber < pages[pages.length - 1]) {
      this.setState(prevState => ({
        activePageNumber: prevState.activePageNumber + 1,
      }))
    }
  }

  removeContactFromList = id => {
    const {data} = this.state
    const newData = data.filter(each => each.id !== id)
    const noOfPages = Math.round(newData.length / 10)
    console.log(noOfPages)
    const newPages = []
    for (let index = 0; index < noOfPages; index += 1) {
      newPages[index] = index + 1
    }
    console.log(newPages)
    this.setState({data: newData, pages: newPages})
  }

  addToCheckedList = id => {
    const {checkedList} = this.state
    checkedList.push(id)
    this.setState({checkedList})
  }

  toDeleteSelected = () => {
    const {checkedList, data} = this.state
    const newData = data.filter(
      each => !checkedList.find(value => value === each.id),
    )
    const noOfPages = Math.round(newData.length / 10)
    const newPages = []
    for (let index = 0; index < noOfPages; index += 1) {
      newPages[index] = index + 1
    }

    this.setState({data: newData, pages: newPages})
  }

  onChangeSearchInput = event => {
    const {data} = this.state
    const filteredData = data.filter(item =>
      Object.keys(item).some(key =>
        item[key].toLowerCase().includes(event.target.value.toLowerCase()),
      ),
    )
    const newPages = []
    const pageCount = Math.floor(filteredData.length / 10) + 1
    for (let index = 0; index < pageCount; index += 1) {
      newPages[index] = index + 1
    }
    this.setState({searchInput: event.target.value, pages: newPages})
  }

  render() {
    const {data, pages, activePageNumber, searchInput} = this.state

    const lowerLimit = (activePageNumber - 1) * 10
    const upperLimit = lowerLimit + 10
    const filteredData = data.filter(item =>
      Object.keys(item).some(key =>
        item[key].toLowerCase().includes(searchInput.toLowerCase()),
      ),
    )

    const updatedData = filteredData.slice(lowerLimit, upperLimit)

    return (
      <div className="background-con">
        <input
          type="search"
          onChange={this.onChangeSearchInput}
          className="search-bar"
        />
        <div>
          <ul className="heads">
            <li className="checkbox-head">
              <input type="checkbox" />
            </li>
            <li className="name-head">Name</li>
            <li className="email-head">Email</li>
            <li className="role-head">Role</li>
            <li className="actions-head">Actions</li>
          </ul>
        </div>
        <hr className="h-line" />
        <div>
          <ul className="contacts-main">
            {updatedData.map(each => (
              <EachItem
                key={each.id}
                removeContactFromList={this.removeContactFromList}
                eachContact={each}
                addToCheckedList={this.addToCheckedList}
              />
            ))}
          </ul>
        </div>
        <div className="bottom-con">
          <button
            onClick={this.toDeleteSelected}
            type="button"
            className="delete-button"
          >
            Delete Selected
          </button>
          <div className="pagination">
            <button
              onClick={this.goToFirstPage}
              type="button"
              className="double-left"
            >
              <HiChevronDoubleLeft />
            </button>
            <button
              onClick={this.goToLeftPage}
              type="button"
              className="single-left"
            >
              <HiChevronLeft />
            </button>
            <ul className="page-numbers">
              {pages.map(each => (
                <PageNumber
                  key={each}
                  currentPageNumber={this.currentPageNumber}
                  pageNo={each}
                />
              ))}
            </ul>
            <button
              onClick={this.goToRightPage}
              type="button"
              className="single-right"
            >
              <HiChevronRight />
            </button>
            <button
              onClick={this.goToLastPage}
              type="button"
              className="double-right"
            >
              <HiChevronDoubleRight />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
