import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { TooltipProvider } from '@/components/ui/tooltip'

function App() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-950">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  )
}

export default App
