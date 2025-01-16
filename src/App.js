import React from 'react'
import VirtualizedList from './components/virtualizedList'
import './components/styles.css'
import PaginatedGames from './components/PaginatedGames'

const App = () => {
  return (
    <div className='app'>
      <header className='app-header'>Virtualized Twitter Feed</header>
      {/* <VirtualizedList/> */}
      <PaginatedGames/>
    </div>
  )
}

export default App