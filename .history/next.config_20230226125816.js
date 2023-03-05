/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify:true,
  images:{
    domains:["ddr-nftmarketplace.infura-ipfs.io",".infura-ipfs.io"]
  }
}

module.exports = nextConfig
