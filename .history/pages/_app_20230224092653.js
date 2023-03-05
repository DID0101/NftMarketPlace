import '@/styles/globals.css'

import { NavBar,Footer } from '@/components/componentsindex';
import { NFTMarketplaceProvider } from '@/Context/NFTMarketplaceContext';
const App = ({Component, pageProps}) =>(
   <div>
      <NFTMarketplaceProvider>
      <NavBar></NavBar>
      <Component {...pageProps} />
      <Footer/>
      </NFTMarketplaceProvider>
   </div>
   
)
export default App;