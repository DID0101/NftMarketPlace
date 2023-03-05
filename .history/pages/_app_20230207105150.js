import '@/styles/globals.css'

import { NavBar,Footer } from '@/components/componentsindex';

const App = ({Component, pageProps}) =>(
   <div>
      <NavBar></NavBar>
      <Component {...pageProps} />
      <Footer/>
   </div>
   
)
export default App;