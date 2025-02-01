import { Outlet } from 'react-router-dom'
import Footer from '../components/ui/Footer'
import Navigation from '../components/ui/Navigation'

function MainLayout() {
    return (
        <>
            <Navigation />
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default MainLayout