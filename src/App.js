import Header from "./components/Header"
import ProductSection from "./components/ProductSection"
import Services from "./components/Services"
import OurProcess from "./components/OurProcess"
import Inspiration from "./components/Inspiration"
import "./App.css"
import ContactUs from "./components/ContactUs"

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <ProductSection />
      </main>
      <main className="App-main">
        <Services />
      </main>
      <main className="App-main">
        < OurProcess/>
      </main>
      <main className="App-main">
        < Inspiration/>
      </main>
      <main className="App-main">
        < ContactUs/>
      </main>
    </div>
  )
}

export default App

