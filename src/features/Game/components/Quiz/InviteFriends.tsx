import React, { useState, useEffect } from 'react';
import { BiBarcodeReader } from 'react-icons/bi';
import { BsArrowLeft } from 'react-icons/bs';
import { RiContactsLine } from 'react-icons/ri';
import { ethers } from 'ethers';
import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';
import QRCodeInvitation from '@/features/Game/components/qr-code-invitation/QRCodeInvitation';
import { friends as initialFriends } from '@/features/Game/constants/friends';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';
import { inviteFriend, listenToInvitationSent, checkTokenBalance } from '@/utils/metamask';

type Friend = {
  imgSrc: string;
  name: string;
  phone: string;
  invited: boolean;
};

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const InviteFriends = ({ setOpen }: Props) => {
  const [showQrCodeInvitation, setShowQrCodeInvitation] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [customAddress, setCustomAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [isInviting, setIsInviting] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const { makeRefferal } = useQuizContext();

  useEffect(() => {
    listenToInvitationSent();
    fetchTokenBalance();
  }, []);

  // Fetch token balance
  const fetchTokenBalance = async () => {
    setIsLoadingBalance(true);
    try {
      const balance = await checkTokenBalance();
      setTokenBalance(balance);
    } catch (error) {
      console.error('Error fetching token balance:', error);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  // Validate address when it changes
  useEffect(() => {
    if (customAddress && !isValidEthereumAddress(customAddress)) {
      setAddressError('Please enter a valid Ethereum address');
    } else {
      setAddressError('');
    }
  }, [customAddress]);

  // Validate amount when it changes
  useEffect(() => {
    if (amount <= 0) {
      setAmountError('Amount must be greater than 0');
    } else if (parseFloat(tokenBalance) < amount) {
      setAmountError(`Insufficient balance. You have ${parseFloat(tokenBalance).toFixed(2)} tokens.`);
    } else {
      setAmountError('');
    }
  }, [amount, tokenBalance]);

  const isValidEthereumAddress = (address: string): boolean => {
    return ethers.utils.isAddress(address);
  };

  const handleInvite = async (friendIndex: number | null = null) => {
    if (friendIndex !== null) {
      // Set loading state for this specific friend
      setLoadingStates((prev) => ({ ...prev, [friendIndex]: true }));
    } else {
      // Validate before proceeding
      if (!customAddress) {
        setAddressError('Please enter a wallet address');
        return;
      }

      if (!isValidEthereumAddress(customAddress)) {
        setAddressError('Please enter a valid Ethereum address');
        return;
      }

      if (amount <= 0) {
        setAmountError('Please enter an amount greater than 0');
        return;
      }

      // Set loading state for custom address invitation
      setIsInviting(true);
    }

    try {
      if (friendIndex !== null) {
        // Simulate a delay for friend invites
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Update the friend's invited status
        setFriends((prev) =>
          prev.map((friend, idx) =>
            idx === friendIndex ? { ...friend, invited: true } : friend
          )
        );
        
        // Show success message
        alert(`Invitation sent to ${friends[friendIndex].name}!`);
      } else if (customAddress) {
        // Use the simplified mock inviteFriend function
        await inviteFriend(customAddress, amount);
        
        // Clear the form after successful invitation
        setCustomAddress('');
        setAmount(0);
      }
    } catch (error) {
      console.error('Error in handleInvite:', error);
      alert('An error occurred while sending the invitation. Please try again.');
    } finally {
      if (friendIndex !== null) {
        // Clear loading state for friend
        setLoadingStates((prev) => ({ ...prev, [friendIndex]: false }));
      } else {
        // Clear loading state for custom address
        setIsInviting(false);
      }
    }
  };

  const main = () => {
    return (
      <div>
        {/* Token Balance Display */}
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-white">Your Token Balance:</span>
            <div className="flex items-center">
              {isLoadingBalance ? (
                <span className="text-gray-400">Loading...</span>
              ) : (
                <span className="text-gradient-primary font-bold">
                  {parseFloat(tokenBalance).toFixed(2)} FTO
                </span>
              )}
              <button 
                onClick={fetchTokenBalance}
                className="ml-2 text-xs text-primary-500 hover:text-primary-400"
                disabled={isLoadingBalance}
              >
                ↻ Refresh
              </button>
            </div>
          </div>
        </div>

        {friends.map((friend, index) => {
          const isLoading = loadingStates[index];

          return (
            <div
              key={index}
              className='mt-10 flex items-center justify-between gap-1'
            >
              <div className='flex items-center gap-4'>
                <NextImage
                  src={friend.imgSrc}
                  alt=''
                  className='relative aspect-square h-[60px] rounded-full'
                  imgClassName='object-cover rounded-full'
                  fill
                />
                <div>
                  <span className='block text-lg'>{friend.name}</span>
                  <span className='text-sm'>{friend.phone}</span>
                </div>
              </div>
              {friend.invited ? (
                <Button
                  size='base'
                  className='w-max bg-primary-500 text-white'
                  variant='outline'
                >
                  Invited
                </Button>
              ) : (
                <Button
                  onClick={() => handleInvite(index)}
                  disabled={isLoading}
                  size='base'
                  className='w-max'
                  variant='outline'
                >
                  {isLoading ? 'Inviting...' : 'Invite'}
                </Button>
              )}
            </div>
          );
        })}
        <div className='mt-10'>
          <h3 className='text-lg font-bold text-white'>Invite via Wallet Address</h3>
          <div className='mt-2'>
            <input
              type='text'
              placeholder="Friend's Wallet Address"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className={`w-full rounded border p-2 bg-gray-800 text-white ${
                addressError ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {addressError && (
              <p className='mt-1 text-sm text-red-500'>{addressError}</p>
            )}
          </div>
          
          <div className='mt-2'>
            <input
              type='number'
              placeholder='Amount of Tokens'
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={`w-full rounded border p-2 bg-gray-800 text-white ${
                amountError ? 'border-red-500' : 'border-gray-600'
              }`}
              min="1"
            />
            {amountError && (
              <p className='mt-1 text-sm text-red-500'>{amountError}</p>
            )}
          </div>
          
          <Button
            onClick={() => handleInvite()}
            disabled={isInviting || !customAddress || amount <= 0 || !!addressError || !!amountError}
            size='base'
            className='mt-2 w-full bg-primary-500 text-white'
            variant='outline'
          >
            {isInviting ? 'Inviting...' : 'Invite'}
          </Button>
        </div>
      </div>
    );
  };

  const renderInviteFriends = () => {
    if (showQrCodeInvitation) {
      return <QRCodeInvitation />;
    }
    return main();
  };

  const handleBack = () => {
    if (showQrCodeInvitation) {
      setShowQrCodeInvitation(false);
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className='z-40 flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <span onClick={() => handleBack()} className='text-2xl'>
            <BsArrowLeft />
          </span>
          <span className='font-primary text-xl font-bold text-white'>Invite Friends</span>
        </div>
      </div>
      {renderInviteFriends()}
    </>
  );
};

export default InviteFriends;