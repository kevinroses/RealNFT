import React, { useState, useEffect } from 'react'
import Login from './pages/Login'
import Error from './pages/Error'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import AboutUs from './pages/AboutUs'
import ComingSoon from './pages/ComingSoon'
import Maintenance from './pages/Maintenance'
import LockScreen from './pages/LockScreen'
import Support from './pages/Support'
import OverView from './pages/Overview'
import Guides from './pages/Guides'
import Faqs from './pages/Faqs'
import BlogDetail from './pages/BlogDetail'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import UploadWork from './pages/UploadWork'
import Collections from './pages/Collections'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import BecomeCreator from './pages/BecomeCreator'
import CreateProfile from './pages/CreatorProfile'
import Creator from './pages/Creator'
import Wallet from './pages/Walllet'
import Activity from './pages/Activity'
import ItemDetailOne from './pages/ItemDetailOne'
import ItemDetailTwo from './pages/ItemDetailTwo'
import Auction from './pages/Auction'
import ExploreFour from './pages/ExploreFour'
import ExploreThree from './pages/ExploreThree'
import ExploreTwo from './pages/ExploreTwo'
import DarkVersionOne from './pages/DarkVersionOne'
import DarkVersionTwo from './pages/DarkVersionTwo'
import DarkVersionFive from './pages/DarkVersionFive'
import DarkVersionThree from './pages/DarkVersionThree'
import DarkVersionFour from './pages/DarkVersionFour'
import BlogSidebar from './pages/BlogSidebar'
import ExploreOne from './pages/ExploreOne'
import CreatorProfileEdit from './pages/CreatorProfileEdit'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import ChangeLog from './pages/ChangeLog'
import nftData from './utils/Nft.json'
import marketplaceData from './utils/Marketplace.json'
import { ethers } from  "ethers"


export default function Router() {
  const [ account, setAccount ] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})

  //contract variables
  const nftAddress ="0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const nftABI = nftData.abi
  const marketplaceAddress ="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  const marketplaceABI = marketplaceData.abi

   //Metamask Login/Connect
   const web3Handler = async() =>{
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
    setAccount(accounts[0])
    //Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    //set signer
    const signer = provider.getSigner()
    console.log("clicked")
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    //get deployed copies of contract
    const marketplaceContract = new ethers.Contract(marketplaceAddress, marketplaceABI, signer)
    setMarketplace(marketplaceContract)
    const nftContract = new ethers.Contract(nftAddress, nftABI, signer)
    setNFT(nftContract)
  }
  console.log("marketplace: ",marketplace, "nft: ",nft)
  return (
    <BrowserRouter>
      <Routes>
   
        {/* auth router  */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/lock-screen" element={<LockScreen />} />

        {/* special router page  */}
        <Route exact path="/error" element={<Error />} />
        <Route exact path="/comingsoon" element={<ComingSoon />} />
        <Route exact path="/maintenance" element={<Maintenance />} />

        {/* help center routes */}
        <Route exact path="/helpcenter-support-request" element={<Support />} />
        <Route exact path="/helpcenter-overview" element={<OverView />} />
        <Route exact path="/helpcenter-guides" element={<Guides />} />
        <Route exact path="/helpcenter-faqs" element={<Faqs />} />

        {/* template page routes  */}
        <Route exact path="/blog-detail" element={<BlogDetail />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
        <Route exact path="/blogs" element={<Blog />} />
        <Route exact path="/blog-sidebar" element={<BlogSidebar />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/upload-work" element={<UploadWork marketplace={marketplace} nft={nft}/>} />
        <Route exact path="/collections" element={<Collections />} />
        <Route exact path="/become-creator" element={<BecomeCreator />} />
        <Route exact path="/creator-profile" element={<CreateProfile marketplace={marketplace} nft={nft}/>} />
        <Route
          exact
          path="/creator-profile-edit"
          element={<CreatorProfileEdit />}
        />
        <Route exact path="/creators" element={<Creator />} />
        <Route exact path="/wallet" element={<Wallet />} />
        <Route exact path="/activity" element={<Activity />} />
        <Route exact path="/item-detail-one" element={<ItemDetailOne />} />
        <Route exact path="/item-detail" element={<ItemDetailTwo  marketplace={marketplace} nft={nft}/>} />
        <Route exact path="/auction" element={<Auction />} />
        <Route exact path="/explore-four" element={<ExploreFour />} />
        <Route exact path="/explore-three" element={<ExploreThree />} />
        <Route exact path="/explore" element={<ExploreTwo marketplace={marketplace} nft={nft}/>} />
        <Route exact path="/explore-one" element={<ExploreOne />} />

        <Route exact path="/index-dark" element={<DarkVersionOne />} />
        <Route exact path="/index-dark-rtl" element={<DarkVersionOne />} />
        <Route exact path="/index" element={<DarkVersionOne />} />
        {/* <Route exact path="/" element={<DarkVersionOne />} /> */}
        <Route exact path="/index-rtl" element={<DarkVersionOne />} />

        <Route exact path="/index-two-dark" element={<DarkVersionTwo />} />
        <Route exact path="/index-two-dark-rtl" element={<DarkVersionTwo />} />
        <Route exact path="/index-two" element={<DarkVersionTwo />} />
        <Route exact path="/index-two-rtl" element={<DarkVersionTwo />} />

        <Route exact path="/index-three-dark" element={<DarkVersionThree />} />
        <Route
          exact
          path="/index-three-dark-rtl"
          element={<DarkVersionThree />}
        />
        <Route exact path="/" element={<DarkVersionThree marketplace={marketplace} nft={nft} web3Handler={web3Handler} account={account}/>} />
        <Route exact path="/index-three-rtl" element={<DarkVersionThree />} />

        <Route exact path="/index-four-dark" element={<DarkVersionFour />} />
        <Route
          exact
          path="/index-four-dark-rtl"
          element={<DarkVersionFour />}
        />
        <Route exact path="/index-four" element={<DarkVersionFour />} />
        <Route exact path="/index-four-rtl" element={<DarkVersionFour />} />

        <Route exact path="/index-five-dark" element={<DarkVersionFive />} />
        <Route
          exact
          path="/index-five-dark-rtl"
          element={<DarkVersionFive />}
        />
        <Route exact path="/index-five" element={<DarkVersionFive />} />
        <Route exact path="/index-five-rtl" element={<DarkVersionFive />} />

        <Route exact path="/terms" element={<Terms />} />
        <Route exact path="/privacy" element={<Privacy />} />
        <Route exact path="/changelog" element={<ChangeLog />} />
      </Routes>
    </BrowserRouter>
  )
}
