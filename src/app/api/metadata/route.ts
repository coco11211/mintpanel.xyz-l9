import { put, head } from '@vercel/blob'
import { NextResponse } from 'next/server'

// Store metadata
export async function POST(request: Request) {
  try {
    const { mint, metadata } = await request.json()

    if (!mint || !metadata) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    // Create standard token metadata format
    const tokenMetadata = {
      name: metadata.name,
      symbol: metadata.symbol,
      description: metadata.description,
      image: metadata.image,
      // Optional fields for better compatibility
      attributes: [],
      properties: {
        files: [
          {
            uri: metadata.image,
            type: 'image/png',
          },
        ],
        category: 'fungible',
      },
    }

    // Store as JSON blob
    const blob = await put(`metadata/${mint}.json`, JSON.stringify(tokenMetadata, null, 2), {
      access: 'public',
      contentType: 'application/json',
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Metadata storage error:', error)
    return NextResponse.json(
      { error: 'Failed to store metadata' },
      { status: 500 }
    )
  }
}

// Retrieve metadata
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const mint = url.searchParams.get('mint')

    if (!mint) {
      return NextResponse.json({ error: 'Mint address required' }, { status: 400 })
    }

    // Try to get the metadata blob
    const blobUrl = `metadata/${mint}.json`
    
    try {
      const metadata = await head(blobUrl)
      
      // Fetch and return the actual content
      const response = await fetch(metadata.url)
      const data = await response.json()
      
      return NextResponse.json(data)
    } catch {
      return NextResponse.json({ error: 'Metadata not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Metadata retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve metadata' },
      { status: 500 }
    )
  }
}
