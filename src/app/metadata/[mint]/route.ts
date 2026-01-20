import { head } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { mint: string } }
) {
  try {
    const { mint } = params

    // Try to get the metadata blob
    const blobUrl = `metadata/${mint}.json`
    
    try {
      const metadata = await head(blobUrl)
      
      // Fetch the actual content
      const response = await fetch(metadata.url)
      const data = await response.json()
      
      return NextResponse.json(data)
    } catch {
      return NextResponse.json(
        { error: 'Metadata not found' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Metadata retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve metadata' },
      { status: 500 }
    )
  }
}
