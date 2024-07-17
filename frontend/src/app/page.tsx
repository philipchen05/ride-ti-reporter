"use client"

import Login from '../components/login'
import { Provider } from 'react-redux'
import store from '../components/store'

export default function Home() {

  return (
    <Provider store={store}>
      <main className="bg-white flex min-h-screen flex-col items-center justify-center p-24">
        <Login />
      </main>
    </Provider>
  );
}
