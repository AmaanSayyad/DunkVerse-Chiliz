import { Capacitor } from '@capacitor/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CiMedal } from 'react-icons/ci';
import { IoDiamondOutline } from 'react-icons/io5';
import { RiVipCrownLine } from 'react-icons/ri';
import { useAccount } from 'wagmi';

import Account from '@/components/account/Account';
import TextField from '@/components/inputs/TextField';
import Menu from '@/components/menu/Menu';
import NextImage from '@/components/NextImage';
import StoryBar from '@/components/story/StoryBar';
import Tab from '@/components/tabs/Tab';
import TabGroup from '@/components/tabs/TabGroup';
import TabPanel from '@/components/tabs/TabPanel';
import TabPanels from '@/components/tabs/TabPanels';
import Tabs from '@/components/tabs/Tabs';

import { storyData } from '@/constants/mocks/storiesMock';
import NFTS from '@/features/Game/components/leader-board/NFTS';
import NFTPreview from '@/features/Game/components/NFTpreview/NFTPreview';
import NFTThumbnail from '@/features/Game/components/NFTThumbnail';
import LeaderBoardTable from '@/features/Game/components/Quiz/leader-board-table/LeaderBoardTable';
import { categories } from '@/features/Game/constants/categories';

const LeaderBoard = () => {
  const [showNFTPreview, setShowNFTPreview] = useState(false);
  const [NFTFlowId, setNFTFlowId] = useState<string | undefined>();
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const { address, isConnected } = useAccount(); // Get the wallet address

  useEffect(() => {
    // Load previously uploaded videos for this wallet from localStorage
    const storedVideos = JSON.parse(
      localStorage.getItem('uploadedVideos') || '{}'
    );
    if (address && storedVideos[address]) {
      setUploadedVideos(storedVideos[address]);
    }
  }, [address]);

  const main = () => {
    return (
      <div>
        <div
          className={
            Capacitor.isNativePlatform()
              ? 'sticky top-0 z-[999] flex flex-col bg-dark pb-4'
              : 'flex flex-col gap-4 '
          }
        >
          <div className='flex items-center justify-between p-4'>
            {isConnected && (
              <div className="flex items-center gap-3">
                <div className="relative group">
                  {/* Profile Image Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                  
                  {/* Profile Image */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/50 group-hover:ring-purple-400 transition-all duration-300">
                    <NextImage
                      src='/images/demo-profile.png'
                      alt='Profile'
                      className='relative w-full h-full'
                      imgClassName='object-cover w-full h-full'
                      fill
                    />
                  </div>
                  
                  {/* Online Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark animate-pulse">
                    <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                  </div>
                </div>
                
                {/* User Info */}
                <div className="hidden sm:block">
                  <div className="text-gray-400 text-xs">
                  </div>
                </div>
              </div>
            )}

            {/* Wallet Connection */}
            <div className="flex items-center gap-2">
              <ConnectButton />
            </div>
          </div>

          {/* Search Bar - Now below the profile section */}
          <div className='mx-auto w-[85vw] mobile-demo:w-[450px] px-4'>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-1 shadow-2xl">
                <TextField
                  startAdornment='search'
                  placeHolder='Search by player or team...'
                  className="relative z-10"
                  inputClassName="bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 focus:border-none focus:outline-none text-base font-medium"
                />
              </div>
              
             
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="relative">
          <div className="mb-4 px-4">
          </div>
          
          {/* StoryBar below the search bar */}
          <StoryBar stories={storyData} />
        </div>

        {/* Tab List */}
        <div className='!mt-5 flex flex-col items-center gap-4 overflow-hidden mobile-m:flex-row'>
          {categories.map((category, index) => (
            <Tab
              key={index}
              className='flex w-48 rounded-full border-2 border-primary-500 p-2 hover:bg-primary-500'
            >
              <div className='flex h-full w-full items-center justify-center'>
                {category.image}
              </div>
            </Tab>
          ))}
        </div>

        <TabGroup>
          {Capacitor.getPlatform() === 'ios' ? (
            <Tabs className='m-6 mx-auto w-full'>
              <Tab>
                <div className='flex justify-center gap-2'>
                  <span className='text-xl'>
                    <IoDiamondOutline />
                  </span>
                  <span className='font-bold'>NFTs</span>
                </div>
              </Tab>
              <Tab>
                <div className='flex justify-center gap-2'>
                  <span className='text-xl'>
                    <RiVipCrownLine />
                  </span>
                  <span className='font-bold'>Leaderboard</span>
                </div>
              </Tab>
            </Tabs>
          ) : (
            <Tabs className='m-10 mx-auto w-full'>
              <Tab>
                <div className='flex justify-center gap-2'>
                  <span className='text-xl'>
                    <IoDiamondOutline />
                  </span>
                  <span className='font-bold'>NFTs</span>
                </div>
              </Tab>
              <Tab>
                <div className='flex justify-center gap-2'>
                  <span className='text-xl'>
                    <RiVipCrownLine />
                  </span>
                  <span className='font-bold'>Leaderboard</span>
                </div>
              </Tab>
            </Tabs>
          )}
          <TabPanels>
            <TabPanel>
              <NFTS
                setShowNFTPreview={setShowNFTPreview}
                setNFTFlowId={setNFTFlowId}
              />

              {/* Display Uploaded Videos */}
              {uploadedVideos.length > 0 && (
                <div className='mx-auto my-10 overflow-hidden rounded-2xl sm:w-[26rem] sm:max-w-lg'>
                  <div className='mt-4 flex flex-col items-center gap-6'>
                    {uploadedVideos.map((video, index) => (
                      <NFTThumbnail
                        key={index}
                        NFTFlowId='3208'
                        showPrice={true}
                      />
                    ))}
                  </div>
                </div>
              )}
            </TabPanel>
            <TabPanel>
              <Account />
              <LeaderBoardTable
                className='mt-8'
                figureClassName='border-transparent'
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
        {createPortal(<Menu />, document.body)}
      </div>
    );
  };

  const renderLeaderBoard = () => {
    if (showNFTPreview && NFTFlowId) {
      return (
        <NFTPreview
          setShowNFTPreview={setShowNFTPreview}
          NFTFlowId={NFTFlowId}
        />
      );
    }
    return main();
  };

  return renderLeaderBoard();
};

export default LeaderBoard;
