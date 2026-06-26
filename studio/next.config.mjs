import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@root'] = rootDir
    return config
  },
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
}

export default nextConfig
