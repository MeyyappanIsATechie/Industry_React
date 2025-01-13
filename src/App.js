import React from 'react'
import VirtualizedList from './components/virtualizedList'
import './components/styles.css'

const App = () => {
  return (
    <div className='app'>
      <header className='app-header'>Virtualized Twitter Feed</header>
      <VirtualizedList/>
    </div>
  )
}

export default App