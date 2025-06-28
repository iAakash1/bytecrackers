import { http, createConfig } from 'wagmi'
import { mainnet, polygon, sepolia, polygonMumbai } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

// Get the project ID from environment variables
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

export const config = createConfig({
  chains: [mainnet, polygon, sepolia, polygonMumbai],
  connectors: [
    injected(),
    walletConnect({
      projectId: projectId || '',
    }),
  ],
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_ETHEREUM_RPC_URL),
    [polygon.id]: http(import.meta.env.VITE_POLYGON_RPC_URL),
    [sepolia.id]: http(import.meta.env.VITE_SEPOLIA_RPC_URL),
    [polygonMumbai.id]: http(import.meta.env.VITE_MUMBAI_RPC_URL),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
