export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      fee_config: {
        Row: {
          advanced_fee_sol: number
          basic_fee_sol: number
          created_at: string
          fee_wallet: string
          id: string
          is_active: boolean
          network: Database["public"]["Enums"]["solana_network"]
          updated_at: string
        }
        Insert: {
          advanced_fee_sol?: number
          basic_fee_sol?: number
          created_at?: string
          fee_wallet: string
          id?: string
          is_active?: boolean
          network: Database["public"]["Enums"]["solana_network"]
          updated_at?: string
        }
        Update: {
          advanced_fee_sol?: number
          basic_fee_sol?: number
          created_at?: string
          fee_wallet?: string
          id?: string
          is_active?: boolean
          network?: Database["public"]["Enums"]["solana_network"]
          updated_at?: string
        }
        Relationships: []
      }
      token_transactions: {
        Row: {
          created_at: string
          details: Json | null
          id: string
          network: Database["public"]["Enums"]["solana_network"]
          signature: string
          token_mint: string
          transaction_type: Database["public"]["Enums"]["token_transaction_type"]
          user_wallet: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          id?: string
          network?: Database["public"]["Enums"]["solana_network"]
          signature: string
          token_mint: string
          transaction_type: Database["public"]["Enums"]["token_transaction_type"]
          user_wallet: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          id?: string
          network?: Database["public"]["Enums"]["solana_network"]
          signature?: string
          token_mint?: string
          transaction_type?: Database["public"]["Enums"]["token_transaction_type"]
          user_wallet?: string
        }
        Relationships: []
      }
      tokens: {
        Row: {
          created_at: string
          creation_signature: string | null
          creator_wallet: string
          decimals: number
          description: string | null
          id: string
          image_url: string | null
          initial_supply: number
          is_metadata_mutable: boolean
          metadata_uri: string | null
          mint_address: string
          name: string
          network: Database["public"]["Enums"]["solana_network"]
          payment_amount: number | null
          payment_signature: string | null
          plan: Database["public"]["Enums"]["token_plan"]
          symbol: string
        }
        Insert: {
          created_at?: string
          creation_signature?: string | null
          creator_wallet: string
          decimals?: number
          description?: string | null
          id?: string
          image_url?: string | null
          initial_supply: number
          is_metadata_mutable?: boolean
          metadata_uri?: string | null
          mint_address: string
          name: string
          network?: Database["public"]["Enums"]["solana_network"]
          payment_amount?: number | null
          payment_signature?: string | null
          plan?: Database["public"]["Enums"]["token_plan"]
          symbol: string
        }
        Update: {
          created_at?: string
          creation_signature?: string | null
          creator_wallet?: string
          decimals?: number
          description?: string | null
          id?: string
          image_url?: string | null
          initial_supply?: number
          is_metadata_mutable?: boolean
          metadata_uri?: string | null
          mint_address?: string
          name?: string
          network?: Database["public"]["Enums"]["solana_network"]
          payment_amount?: number | null
          payment_signature?: string | null
          plan?: Database["public"]["Enums"]["token_plan"]
          symbol?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          wallet_address: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          wallet_address: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      solana_network: "mainnet-beta" | "devnet"
      token_plan: "basic" | "advanced"
      token_transaction_type:
        | "create"
        | "mint"
        | "burn"
        | "freeze"
        | "thaw"
        | "update_metadata"
        | "revoke_authority"
        | "transfer_authority"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      solana_network: ["mainnet-beta", "devnet"],
      token_plan: ["basic", "advanced"],
      token_transaction_type: [
        "create",
        "mint",
        "burn",
        "freeze",
        "thaw",
        "update_metadata",
        "revoke_authority",
        "transfer_authority",
      ],
    },
  },
} as const
