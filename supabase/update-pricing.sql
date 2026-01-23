-- Update existing fee configuration to correct pricing
UPDATE public.fee_config
SET basic_fee_sol = 0.03, advanced_fee_sol = 0.05
WHERE network = 'devnet';

UPDATE public.fee_config
SET basic_fee_sol = 0.03, advanced_fee_sol = 0.05
WHERE network = 'mainnet-beta';
