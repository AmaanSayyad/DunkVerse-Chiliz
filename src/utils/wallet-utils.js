import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { avalancheFuji, baseSepolia, polygon } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const chilizTestnet = {
  id: 88882,
  name: 'Chiliz Spicy Testnet',
  network: 'chilizTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'CHZ',
    symbol: 'CHZ',
  },
  rpcUrls: {
    public: { http: ['https://spicy-rpc.chiliz.com'] },
    default: { http: ['https://spicy-rpc.chiliz.com'] },
  },
  iconUrl: '/images/Chiliz.png',
  icon: {
    url: '/images/Chiliz.png',
    width: 512,
    height: 512,
    format: 'png'
  },
  blockExplorers: {
    default: { url: 'https://testnet.chiliscan.com' }
  }
};

const mantleSepoliaTestnet = {
  id: 5003,
  name: 'Mantle Sepolia Testnet',
  network: 'mantleSepoliaTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MNT',
    symbol: 'MNT',
  },
  rpcUrls: {
    public: { http: ['https://rpc.sepolia.mantle.xyz'] },
    default: { http: ['https://rpc.sepolia.mantle.xyz'] },
  },
  iconUrl: 'https://altcoinsbox.com/wp-content/uploads/2023/09/mantle-logo.svg',
  icon: {
    url: 'https://altcoinsbox.com/wp-content/uploads/2023/09/mantle-logo.svg',
    width: 512,
    height: 512,
    format: 'png'
  },
  blockExplorers: {
    default: { url: 'https://sepolia.mantlescan.xyz' }
  }
};

const opBNBTestnet = {
  id: 5611,
  name: 'opBNB Testnet',
  network: 'opBNBTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tBNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: { http: ['https://opbnb-testnet-rpc.bnbchain.org'] },
    default: { http: ['https://opbnb-testnet-rpc.bnbchain.org'] },
  },
  iconUrl: 'https://chainspot.io/api/1.0/image/view?path=497/927/op_bnb1687420235160.png',
  icon: {
    url: 'https://chainspot.io/api/1.0/image/view?path=497/927/op_bnb1687420235160.png',
    width: 512,
    height: 512,
    format: 'png'
  },
  blockExplorers: {
    default: { url: 'https://testnet.opbnbscan.com' }
  }
};

const unichainSepolia = {
  id: 1301,
  name: 'Unichain Sepolia Testnet',
  network: 'unichainSepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://sepolia.unichain.org'] },
    default: { http: ['https://sepolia.unichain.org'] },
  },
  iconUrl: 'https://img.cryptorank.io/coins/unichain1728632895218.png',
  icon: {
    url: 'https://img.cryptorank.io/coins/unichain1728632895218.png',
    width: 512,
    height: 512,
    format: 'png'
  },
  blockExplorers: {
    default: { url: 'https://sepolia.uniscan.xyz' }
  }
};

// Configure chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [chilizTestnet, mantleSepoliaTestnet, avalancheFuji , opBNBTestnet, polygon, baseSepolia, unichainSepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        switch (chain.id) {
          case chilizTestnet.id:
            return { http: 'https://spicy-rpc.chiliz.com' };
          case mantleSepoliaTestnet.id:
            return { http: 'https://rpc.sepolia.mantle.xyz' };
          case avalancheFuji.id:
            return { http: 'https://api.avax-test.network/ext/bc/C/rpc' };
          
          case opBNBTestnet.id:
            return { http: 'https://opbnb-testnet-rpc.bnbchain.org' };
          case polygon.id:
            return { http: 'https://polygon-mainnet.infura.io' };
          case baseSepolia.id:
            return { http: 'https://rpc.base-sepolia.org' };
          case unichainSepolia.id:
            return { http: 'https://sepolia.unichain.org' };
          default:
            return null;
        }
      },
    }),
  ]
);

// Configure wallet connectors
const { connectors } = getDefaultWallets({
  appName: 'DunkVerse',
  projectId: '87106bd465234d097b8a51ba585bf799',
  chains,
});

// Create Wagmi configuration
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains, wagmiConfig };
