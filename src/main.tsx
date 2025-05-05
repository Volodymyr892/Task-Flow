import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
