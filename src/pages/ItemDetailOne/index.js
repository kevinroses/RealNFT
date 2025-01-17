import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Footer from '../../components/Footer'
import { useItemContext } from "../../contexts/ItemContext";
import nftData from "../../utils/Nft.json";
import marketplaceData from "../../utils/Marketplace.json";
import { ethers } from "ethers";
import Navbar from '../../components/Navbar'
import StyleSwitcher from '../../components/StyleSwitcher'
import Countdown from 'react-countdown'
import { client01, client02, client03, client08, client09, client10, item1, item2, gif1, gif2, itemDetail1,home9, home4, home5, home6, home7, home8,closeSvg } from '../../components/imageImport'

const ItemDetailOne = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { globalItems } = useItemContext();
  console.log("ROUTE ID => ", id);

  const [chooseItem, setChoosenItem] = useState({});

  useEffect(() => {
    if (!globalItems?.length) return;

    const item = globalItems.find((_item) => {
      const itemID = ethers.utils.formatEther(_item?.itemId);
      return itemID === id;
    });

    if (!item) return;
    setChoosenItem(item);
  }, [globalItems, id]);

  const activityData = [
    {
      title: 'Digital Art Collection',
      author: 'Panda',
      time: '1 hours ago',
      favorite: 'Started Following',
      image: item1,
    },
    {
      title: 'Skrrt Cobain Official',
      author: 'ButterFly',
      time: '2 hours ago',
      favorite: 'Liked by',
      image: gif1,
    },
    {
      title: 'Wow! That Brain Is Floating',
      author: 'ButterFly',
      time: '2 hours ago',
      favorite: 'Liked by',
      image: item2,
    },
  ]
  const createdData = [
    {
      image: home4,
      title: '1406 Chimney Rock Dr, Allen, TX 75002',
      id: 'May 29, 2022 6:0:0',
      type: 'GIFs',
      client: client01,
      author: 'StreetBoy',
    },
    {
      image: home5,
      title: '1407 Spring St, Allen, TX 75002',
      id: 'June 03, 2022 5:3:1',
      type: 'Arts',
      client: client09,
      author: 'PandaOne',
    },
    {
      image: home6,
      title: '1036 Margo Dr, Allen, TX 75013',
      id: 'June 10, 2022 1:0:1',
      type: 'GIFs',
      client: client02,
      author: 'CutieGirl',
    },
    {
      image: home7,
      title: '806 Walden Ct, Allen, TX 75002',
      id: 'June 18, 2022 1:2:1',
      type: 'Memes',
      client: client03,
      author: 'NorseQueen',
    },
  ]

  const [items, setItems] = useState([]);
  // const [marketplace1, setMarketplace1] = useState({});
  // const [nft1, setNft1] = useState({});
  const [marketplace2, setMarketplace2] = useState({});
  const [nft2, setNft2] = useState({});
  const [toggle, setToggle] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    console.log({ items });
  }, [items]);

  //

  const nftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const nftABI = nftData.abi;
  const marketplaceAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const marketplaceABI = marketplaceData.abi;

  const loadMarketplaceItems = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        // setMarketplace1(marketplace);
        // setNft1(nft);
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const nft2 = new ethers.Contract(nftAddress, nftABI, signer);
        setNft2(nft2);
        const marketplace2 = new ethers.Contract(
          marketplaceAddress,
          marketplaceABI,
          signer
        );
        setMarketplace2(marketplace2);
        // console.log("this is marketplace1", marketplace1);
        console.log("this is marketplace2", marketplace2);

        const itemCount = await marketplace2.itemCount();

        console.log("ITEM COUNT => ", itemCount);

        let items = [];
        for (let i = 1; i <= itemCount; i++) {
          const item = await marketplace2.items(i);
          if (!item.sold) {
            // get uri url from nft contract
            const uri = await nft2.tokenURI(item.tokenId);
            // use uri to fetch the nft metadata stored on ipfs
            const response = await fetch(uri);
            const metadata = await response.json();
            // get total price of item (item price + fee)
            const totalPrice = await marketplace2.getTotalPrice(item.itemId);
            // Add item to items array
            items.push({
              totalPrice,
              itemId: item.itemId,
              seller: item.seller,
              name: metadata.name,
              description: metadata.description,
              image: metadata.image,
            });
          }
        }

        setItems(items);
        console.log("these are items", items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyItems = async (chooseItem) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        // setMarketplace1(marketplace);
        // setNft1(nft);
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        
        setNft2(nft2);
        const marketplace2 = new ethers.Contract(
          marketplaceAddress,
          marketplaceABI,
          signer
        );
        
        await (await marketplace2.purchaseItem(chooseItem.itemId, { value: chooseItem.totalPrice })).wait()
        loadMarketplaceItems()
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* Navbar */}
      

      {/* Start */}
      <section className="bg-item-detail d-table w-100">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="sticky-bar">
                <img
                  src={chooseItem.image}
                  className="img-fluid rounded-md shadow"
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="ms-lg-5">
                <div className="title-heading">
                
                  <h4 className="h3 fw-bold mb-0">
                  {/* 600{' '}
                    <span className="text-gradient-primary">Grimsworth Ct</span><button className=' m-2 p-2'>
                    <h1>X</h1>
                </button> <br />{' '}
                    <span className="text-gradient-primary">Allen</span>{' '}
                    TX 75002 */}
                    {chooseItem.name}
                  </h4>
                </div>

                <div className="row">
                  <div className="col-md-6 mt-4 pt-2">
                    <h6>Current Price</h6>
                    {/* <h4 className="mb-0">{ethers.utils.formatEther(chooseItem.totalPrice)}  ETH</h4> */}
                    <small className="mb-0 text-muted">{chooseItem.price} eth</small>
                  </div>
                </div>

                <div className="row mt-4 pt-2">
                  <div className="col-12">
                    <ul
                      className="nav nav-tabs border-bottom"
                      id="myTab"
                      role="tablist"
                    >
                 

                  
                  
                    </ul>

                    <div className="tab-content mt-4 pt-2" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="detailItem"
                        role="tabpanel"
                        aria-labelledby="detail-tab"
                      >
                        <p className="text-muted">
                       Description: {chooseItem.description}
                        </p>
                      
                        <h6>Owner</h6>

                        <div className="creators creator-primary d-flex align-items-center">
                          <div className="position-relative">
                            <img
                              src={client09}
                              className="avatar avatar-md-sm shadow-md rounded-pill"
                              alt=""
                            />
                            <span className="verified text-primary">
                              <i className="mdi mdi-check-decagram"></i>
                            </span>
                          </div>

                          <div className="ms-3">
                            <h6 className="mb-0">
                              <a
                                href="/creators"
                                onClick={e => {
                                  e.preventDefault()
                                  navigate('/creators')
                                }}
                                className="text-dark name"
                              >
                                PandaOne
                              </a>
                            </h6>
                          </div>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="bids"
                        role="tabpanel"
                        aria-labelledby="bids-tab"
                      >
 
                      </div>

                      <div
                        className="tab-pane fade"
                        id="activity"
                        role="tabpanel"
                        aria-labelledby="activity-tab"
                      >
                        <div className="row g-4">
                          {activityData?.map(data => {
                            return (
                              <div className="col-12" key={data?.title}>
                                <div className="card activity activity-primary rounded-md shadow p-4">
                                  <div className="d-flex align-items-center">
                                    <div className="position-relative">
                                      <img
                                        src={data?.image}
                                        className="avatar avatar-md-md rounded-md shadow-md"
                                        alt=""
                                      />

                                      <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                        {data?.favorite ===
                                          'Started Following' ? (
                                          <i className="mdi mdi-account-check mdi-18px text-success"></i>
                                        ) : data?.favorite === 'Liked by' ? (
                                          <i className="mdi mdi-heart mdi-18px text-danger"></i>
                                        ) : (
                                          <i className="mdi mdi-format-list-bulleted mdi-18px text-warning"></i>
                                        )}
                                      </div>
                                    </div>
                                    <span className="content ms-3">
                                      <a
                                        href=""
                                        onClick={e => e.preventDefault()}
                                        className="text-dark title mb-0 h6 d-block"
                                      >
                                        {data?.time}
                                      </a>
                                      <small className="text-muted d-block mt-1">
                                        {data?.favorite}{' '}
                                        <a
                                          href=""
                                          onClick={e => e.preventDefault()}
                                          className="link fw-bold"
                                        >
                                          @{data?.author}
                                        </a>
                                      </small>

                                      <small className="text-muted d-block mt-1">
                                        {data?.time}
                                      </small>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                          {/*end col*/}
                        </div>
                        {/*end row*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}

        
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* End */}

      {/* Place Bid Modal */}
      <div
        className="modal fade"
        id="NftBid"
        aria-hidden="true"
        aria-labelledby="bidtitle"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="modal-header">
              <h5 className="modal-title" id="bidtitle">
                Place a Bid
              </h5>
              <button
                type="button"
                className="btn btn-close"
                data-bs-dismiss="modal"
                id="close-modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        Your Bid Price <span className="text-danger">*</span>
                      </label>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="00.00 ETH"
                      />
                      <small className="text-muted">
                        <span className="text-dark">Note:</span> Bid price at
                        least 1 ETH
                      </small>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-12">
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        Enter Your QTY <span className="text-danger">*</span>
                      </label>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="0"
                      />
                      <small className="text-muted">
                        <span className="text-dark">Note:</span> Max. Qty 5
                      </small>
                    </div>
                  </div>
                  {/*end col*/}
                </div>
              </form>

              <div className="pt-3 border-top">
                <div className="d-flex justify-content-between">
                  <p className="fw-bold small"> You must bid at least:</p>
                  <p className="text-primary"> 1.22 ETH </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fw-bold small"> Service free:</p>
                  <p className="text-primary"> 0.05 ETH </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fw-bold small"> Total bid amount:</p>
                  <p className="text-primary mb-0"> 1.27 ETH </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-pills btn-primary"
                data-bs-target="#placebid"
                data-bs-toggle="modal"
              >
                <i className="mdi mdi-gavel fs-5 me-2"></i> Place a Bid
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="placebid"
        aria-hidden="true"
        aria-labelledby="bidsuccess"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="modal-header">
              <h5 className="modal-title" id="bidsuccess">
                Bidding Successful
              </h5>
              <button
                type="button"
                className="btn btn-close"
                data-bs-dismiss="modal"
                id="close-modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body p-4">
              your bid (1.27ETH) has been listing to our database
            </div>
            <div className="modal-footer">
              <a
                href="/activity"
                onClick={e => {
                  e.preventDefault()
                  navigate('/activity')
                }}
                data-bs-toggle="modal"
                className="btn btn-pills btn-primary"
              >
                <i className="mdi mdi-basket-plus fs-5 me-2"></i> View Your Bid
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Place Bid Modal */}

      {/* Buy Now NFt Modal */}
      <div
        className="modal fade"
        id="NftBuynow"
        aria-hidden="true"
        aria-labelledby="buyNft"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="modal-header">
              <h5 className="modal-title" id="buyNft">
                Checkout
              </h5>
              <button
                type="button"
                className="btn btn-close"
                data-bs-dismiss="modal"
                id="close-modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        Your Price <span className="text-danger">*</span>
                      </label>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        className="form-control"
                        defaultValue="1.5ETH"
                      />
                    </div>
                  </div>
                  {/*end col*/}
                </div>
              </form>

              <div className="py-3 border-top">
                <div className="d-flex justify-content-between">
                  <p className="fw-bold small"> You must bid at least:</p>
                  <p className="text-primary"> 1.22 ETH </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fw-bold small"> Service free:</p>
                  <p className="text-primary"> 0.05 ETH </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fw-bold small"> Total bid amount:</p>
                  <p className="text-primary mb-0"> 1.27 ETH </p>
                </div>
              </div>

              <div className="bg-soft-danger p-3 rounded shadow">
                <div className="d-flex align-items-center">
                  <i className="uil uil-exclamation-circle h2 mb-0 me-2"></i>
                  <div className="flex-1">
                    <h6 className="mb-0">This creator is not verified</h6>
                    <small className="mb-0">
                      Purchase this item at your own risk
                    </small>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  className="btn btn-pills btn-primary w-100"
                  data-bs-target="#buyNftSuccess"
                  data-bs-toggle="modal"
                >
                  <i className="mdi mdi-cart fs-5 me-2"></i> Continue
                </button>
                <form>
                  <div className="form-check align-items-center d-flex mt-2">
                    <input
                      className="form-check-input mt-0"
                      type="checkbox"
                      id="AcceptT&C"
                    />
                    <label
                      className="form-check-label text-muted ms-2"
                      htmlFor="AcceptT&C"
                    >
                      I Accept{' '}
                      <a
                        href=""
                        onClick={e => e.preventDefault()}
                        className="text-primary"
                      >
                        Terms And Condition
                      </a>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="buyNftSuccess"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="position-absolute top-0 start-100 translate-middle z-index-1">
              <button
                type="button"
                className="btn btn-icon btn-pills btn-sm btn-light btn-close opacity-10"
                data-bs-dismiss="modal"
                id="close-modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body text-center p-4">
              <h3>Yahhhoooo! 🎉</h3>
              <h6 className="text-muted mb-0">
                You successfully purchased{' '}
                <a href="" className="text-reset">
                  <u>XYZ nft</u>
                </a>{' '}
                from Superex
              </h6>

              <ul className="rounded-md shadow p-4 border list-unstyled mt-4">
                <li className="d-flex justify-content-between">
                  <span className="fw-bold me-5">Status:</span>
                  <span className="text-warning">Processing</span>
                </li>

                <li className="d-flex justify-content-between mt-2">
                  <span className="fw-bold me-5">Transaction ID:</span>
                  <span className="text-muted">qhut0...hfteh45</span>
                </li>
              </ul>

              <ul className="list-unstyled social-icon mb-0 mt-4">
                {[
                  'uil uil-facebook-f',
                  'uil uil-instagram',
                  'uil uil-linkedin',
                  'uil uil-dribbble',
                  'uil uil-twitter',
                ]?.map((data, index) => {
                  return (
                    <li className="list-inline-item lh-1 mr-1" key={index}>
                      <a href="" className="rounded">
                        <i className={data}></i>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Buy Now NFt Modal */}
      {/* footer */}
      {/* <Footer /> */}

      {/* Style switcher  */}
      <StyleSwitcher />
    </>
  )
}

export default ItemDetailOne
