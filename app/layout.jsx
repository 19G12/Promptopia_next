import Navbar from '@components/Navbar';
import Provider from '@components/Provider';
import '@styles/globals.css';

//Add in a metadata for SEO purposes
export const metadata = {
    title: "Promptopia",
    description: "Discover and share AI prompts"
}

const RootLayout = ({children}) => {
    return(
        <html lang='en'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient'/>
                    </div>
                    
                    <main className='app'>
                        {/*renders all other components here */}
                        <Navbar />
                        {children} 
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;