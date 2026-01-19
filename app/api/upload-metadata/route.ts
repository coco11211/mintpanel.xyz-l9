import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

interface TokenMetadata {
  name: string
  symbol: string
  description: string
  image: string
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get("name") as string
    const symbol = formData.get("symbol") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as File | null

    if (!name || !symbol) {
      return NextResponse.json(
        { error: "Name and symbol are required" },
        { status: 400 }
      )
    }

    // Generate a unique ID for this token's assets
    const tokenId = `${symbol.toLowerCase()}-${Date.now()}`
    let imageUrl = ""

    // Upload image if provided
    if (image && image.size > 0) {
      const imageBlob = await put(`tokens/${tokenId}/image.${image.type.split("/")[1] || "png"}`, image, {
        access: "public",
        contentType: image.type,
      })
      imageUrl = imageBlob.url
    }

    // Create metadata object following the Metaplex Token Metadata Standard
    const metadata: TokenMetadata = {
      name,
      symbol,
      description: description || "",
      image: imageUrl,
    }

    // Upload metadata JSON
    const metadataBlob = await put(
      `tokens/${tokenId}/metadata.json`,
      JSON.stringify(metadata, null, 2),
      {
        access: "public",
        contentType: "application/json",
      }
    )

    return NextResponse.json({
      success: true,
      metadataUri: metadataBlob.url,
      imageUri: imageUrl,
    })
  } catch (error) {
    console.error("Metadata upload error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload metadata" },
      { status: 500 }
    )
  }
}
