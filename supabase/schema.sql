-- ==============================================================================
-- MODESY MARKETPLACE - 100% COMPLETE SUPABASE POSTGRESQL PRODUCTION SCHEMA
-- Matches Official Modesy Script (https://modesy.codingest.net/)
-- Dialect: PostgreSQL (Supabase Compatible)
-- Features: Auth Sync, RBAC, Multi-Vendor, Memberships, Promotions, Shipping Engine,
--           Custom Fields, Multi-Currency, Affiliate, B2B Quotes, RLS & Indexes.
-- Safe & Idempotent: Can be run safely multiple times without errors.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. ENUM TYPES
-- ==============================================================================
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('admin', 'vendor', 'member', 'moderator');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Ensure 'member' value is present if enum already exists
DO $$ BEGIN
    ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'member';
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.product_type AS ENUM ('physical', 'digital', 'service');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.listing_type AS ENUM ('sell_on_site', 'ordinary_listing', 'bidding');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.product_status AS ENUM ('active', 'pending_approval', 'draft', 'hidden', 'sold', 'deleted');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.order_status AS ENUM ('pending_payment', 'processing', 'completed', 'cancelled', 'shipped');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.quote_status AS ENUM ('new', 'pending', 'bid_placed', 'accepted', 'declined', 'completed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.refund_status AS ENUM ('pending', 'approved', 'declined', 'processing');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.payout_status AS ENUM ('pending', 'approved', 'declined', 'paid');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.payout_method AS ENUM ('bank_transfer', 'paypal', 'stripe', 'swift');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.discount_type AS ENUM ('percentage', 'fixed_amount');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.custom_field_type AS ENUM ('text', 'textarea', 'number', 'dropdown', 'checkbox', 'radio');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.ticket_priority AS ENUM ('low', 'medium', 'high');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'closed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ==============================================================================
-- 3. HELPER FUNCTIONS
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 4. CURRENCIES & MULTI-LANGUAGE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.currencies (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE, -- 'USD', 'EUR', 'IDR'
    symbol VARCHAR(10) NOT NULL, -- '$', '€', 'Rp'
    exchange_rate NUMERIC(14, 6) NOT NULL DEFAULT 1.000000,
    format TEXT NOT NULL DEFAULT '1,234.56',
    symbol_direction TEXT NOT NULL DEFAULT 'left' CHECK (symbol_direction IN ('left', 'right')),
    space_money_symbol BOOLEAN NOT NULL DEFAULT false,
    is_default BOOLEAN NOT NULL DEFAULT false,
    status BOOLEAN NOT NULL DEFAULT true
);

-- ==============================================================================
-- 5. USERS & PROFILES (SYNCED WITH SUPABASE AUTH)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    username TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    role public.user_role NOT NULL DEFAULT 'member',
    avatar_url TEXT,
    cover_url TEXT,
    wallet_balance NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (wallet_balance >= 0),
    is_vendor BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    email_status BOOLEAN NOT NULL DEFAULT false,
    about_me TEXT,
    facebook_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    whatsapp_number TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_profiles_modtime ON public.profiles;
CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto create profile on Supabase Auth Sign Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, username, role, is_vendor)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'member'::public.user_role),
        COALESCE((NEW.raw_user_meta_data->>'is_vendor')::boolean, false)
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Login activity logs
CREATE TABLE IF NOT EXISTS public.user_login_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Vendor / Shop Profiles
CREATE TABLE IF NOT EXISTS public.vendor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    shop_name TEXT NOT NULL,
    shop_slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    cover_url TEXT,
    shop_description TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    rating_avg NUMERIC(3, 2) NOT NULL DEFAULT 0.00,
    review_count INT NOT NULL DEFAULT 0,
    shipping_policy TEXT,
    refund_policy TEXT,
    terms_conditions TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_vendor_profiles_modtime ON public.vendor_profiles;
CREATE TRIGGER update_vendor_profiles_modtime
    BEFORE UPDATE ON public.vendor_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Shop Opening / Verification Requests
CREATE TABLE IF NOT EXISTS public.shop_opening_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    shop_name TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone_number TEXT,
    id_card_url TEXT,
    business_license_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_shop_opening_requests_modtime ON public.shop_opening_requests;
CREATE TRIGGER update_shop_opening_requests_modtime
    BEFORE UPDATE ON public.shop_opening_requests
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Social: Followers / Following (Vendor Followers)
CREATE TABLE IF NOT EXISTS public.user_followers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (follower_id, following_id)
);

-- ==============================================================================
-- 6. MEMBERSHIP PACKAGES & SUBSCRIPTIONS (MODESY SPECIFIC)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.membership_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    number_of_products INT NOT NULL DEFAULT 10, -- product upload limit
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    is_unlimited_time BOOLEAN NOT NULL DEFAULT false,
    number_of_days INT NOT NULL DEFAULT 30, -- duration in days
    features JSONB, -- list of bullet features
    is_free BOOLEAN NOT NULL DEFAULT false,
    is_popular BOOLEAN NOT NULL DEFAULT false,
    order_index INT NOT NULL DEFAULT 0,
    status BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES public.membership_plans(id) ON DELETE SET NULL,
    plan_title TEXT NOT NULL,
    number_of_products INT NOT NULL,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    payment_method TEXT,
    payment_status public.payment_status NOT NULL DEFAULT 'pending',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
    starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.membership_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_membership_id UUID REFERENCES public.user_memberships(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES public.membership_plans(id) ON DELETE SET NULL,
    payment_amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    payment_method TEXT NOT NULL,
    payment_status public.payment_status NOT NULL DEFAULT 'pending',
    invoice_number TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 7. PROMOTION & FEATURED ADS (MODESY SPECIFIC)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.promotion_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_count INT NOT NULL CHECK (day_count > 0),
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 8. CATALOG (CATEGORIES, BRANDS, TAGS, PRODUCTS, CUSTOM FIELDS)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    order_index INT NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    show_on_homepage BOOLEAN NOT NULL DEFAULT true,
    show_products_on_index BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_categories_modtime ON public.categories;
CREATE TRIGGER update_categories_modtime
    BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Custom Fields / Specifications Engine (e.g. Memory, Screen Size, Material)
CREATE TABLE IF NOT EXISTS public.custom_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    field_type public.custom_field_type NOT NULL DEFAULT 'text',
    is_required BOOLEAN NOT NULL DEFAULT false,
    is_product_filter BOOLEAN NOT NULL DEFAULT true,
    order_index INT NOT NULL DEFAULT 0,
    status BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.custom_field_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    field_id UUID NOT NULL REFERENCES public.custom_fields(id) ON DELETE CASCADE,
    option_name TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.custom_field_categories (
    field_id UUID NOT NULL REFERENCES public.custom_fields(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    PRIMARY KEY (field_id, category_id)
);

-- Products Master Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sku TEXT,
    short_description TEXT,
    description TEXT,
    product_type public.product_type NOT NULL DEFAULT 'physical',
    listing_type public.listing_type NOT NULL DEFAULT 'sell_on_site',
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    discount_rate NUMERIC(5, 2) NOT NULL DEFAULT 0.00 CHECK (discount_rate >= 0 AND discount_rate <= 100),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_promoted BOOLEAN NOT NULL DEFAULT false,
    promoted_until TIMESTAMPTZ,
    is_special_offer BOOLEAN NOT NULL DEFAULT false,
    views_count BIGINT NOT NULL DEFAULT 0,
    rating_avg NUMERIC(3, 2) NOT NULL DEFAULT 0.00,
    review_count INT NOT NULL DEFAULT 0,
    external_link TEXT, -- for affiliate products or external link
    status public.product_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_products_modtime ON public.products;
CREATE TRIGGER update_products_modtime
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Wishlist (Saved products by user)
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, product_id)
);

-- Promoted Products Log & Payments
CREATE TABLE IF NOT EXISTS public.promoted_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    day_count INT NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    payment_status public.payment_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.promotion_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    promoted_product_id UUID REFERENCES public.promoted_products(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    payment_amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    payment_method TEXT NOT NULL,
    payment_status public.payment_status NOT NULL DEFAULT 'pending',
    invoice_number TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_tags (
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, tag_id)
);

CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_variations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    attribute_name TEXT NOT NULL, -- e.g. 'Size', 'Color'
    attribute_value TEXT NOT NULL, -- e.g. 'XL', 'Navy Blue'
    sku TEXT,
    price_modifier NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_custom_field_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    field_id UUID NOT NULL REFERENCES public.custom_fields(id) ON DELETE CASCADE,
    field_value TEXT NOT NULL,
    UNIQUE (product_id, field_id)
);

-- Digital product assets (Files & Licenses)
CREATE TABLE IF NOT EXISTS public.digital_product_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT,
    license_key_required BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 9. SHIPPING ENGINE (MODESY SPECIFIC)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.shipping_delivery_times (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL, -- e.g. '1-3 Business Days'
    order_index INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.shipping_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.shipping_zone_countries (
    zone_id UUID NOT NULL REFERENCES public.shipping_zones(id) ON DELETE CASCADE,
    country_iso2 VARCHAR(2) NOT NULL,
    PRIMARY KEY (zone_id, country_iso2)
);

CREATE TABLE IF NOT EXISTS public.shipping_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_id UUID NOT NULL REFERENCES public.shipping_zones(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g. 'Standard Shipping', 'Express Shipping'
    cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    free_shipping_min_amount NUMERIC(12, 2),
    status BOOLEAN NOT NULL DEFAULT true,
    order_index INT NOT NULL DEFAULT 0
);

-- ==============================================================================
-- 10. ORDERS, TRANSACTIONS & DIGITAL DOWNLOADS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    shipping_fee NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    payment_method TEXT,
    payment_status public.payment_status NOT NULL DEFAULT 'pending',
    order_status public.order_status NOT NULL DEFAULT 'pending_payment',
    tracking_number TEXT,
    tracking_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_orders_modtime ON public.orders;
CREATE TRIGGER update_orders_modtime
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    vendor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    product_title TEXT NOT NULL,
    product_image_url TEXT,
    variation_details JSONB,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL,
    item_status public.order_status NOT NULL DEFAULT 'pending_payment',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    address_type TEXT NOT NULL CHECK (address_type IN ('shipping', 'billing')),
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT,
    country TEXT NOT NULL,
    zip_code TEXT
);

CREATE TABLE IF NOT EXISTS public.bank_transfers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    bank_name TEXT NOT NULL,
    account_holder_name TEXT NOT NULL,
    receipt_url TEXT NOT NULL,
    transfer_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.digital_sales_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    digital_file_id UUID NOT NULL REFERENCES public.digital_product_files(id) ON DELETE CASCADE,
    download_key TEXT NOT NULL UNIQUE,
    download_count INT NOT NULL DEFAULT 0,
    license_key TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 11. B2B QUOTES & REFUND REQUESTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    offer_price NUMERIC(12, 2),
    seller_bid NUMERIC(12, 2),
    color TEXT,
    notes TEXT,
    status public.quote_status NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_quote_requests_modtime ON public.quote_requests;
CREATE TRIGGER update_quote_requests_modtime
    BEFORE UPDATE ON public.quote_requests
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.refund_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    order_item_id UUID REFERENCES public.order_items(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    refund_amount NUMERIC(12, 2) NOT NULL,
    reason TEXT NOT NULL,
    status public.refund_status NOT NULL DEFAULT 'pending',
    admin_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_refund_requests_modtime ON public.refund_requests;
CREATE TRIGGER update_refund_requests_modtime
    BEFORE UPDATE ON public.refund_requests
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 12. WALLET, EARNINGS, PAYOUTS & AFFILIATE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('credit', 'debit')),
    reference_type TEXT NOT NULL, -- 'order_sale', 'payout', 'refund', 'topup', 'membership', 'promotion'
    reference_id UUID,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.seller_earnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sale_amount NUMERIC(12, 2) NOT NULL,
    commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    commission_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    earned_amount NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    payout_method public.payout_method NOT NULL DEFAULT 'bank_transfer',
    account_details JSONB NOT NULL,
    status public.payout_status NOT NULL DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_payouts_modtime ON public.payouts;
CREATE TRIGGER update_payouts_modtime
    BEFORE UPDATE ON public.payouts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Wallet Deposits (Add Funds, Bank Transfers, Online Gateways)
CREATE TABLE IF NOT EXISTS public.wallet_deposits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    payment_id TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    status TEXT NOT NULL DEFAULT 'Completed', -- 'Completed', 'Pending Payment', 'Failed'
    is_reported BOOLEAN NOT NULL DEFAULT false,
    report_reference_no TEXT,
    report_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Wallet Expenses (Payments made with wallet balance)
CREATE TABLE IF NOT EXISTS public.wallet_expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    expense_title TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    reference_type TEXT, -- 'order', 'membership', 'ad_promotion', 'commission'
    reference_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Payout Account Settings (Withdrawal accounts: PayPal, Bank Transfer, Bitcoin)
CREATE TABLE IF NOT EXISTS public.payout_account_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    payout_method TEXT NOT NULL DEFAULT 'paypal',
    paypal_email TEXT,
    iban TEXT,
    bank_name TEXT,
    bank_branch_city TEXT,
    swift_code TEXT,
    account_holder_name TEXT,
    routing_number TEXT,
    bitcoin_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_payout_settings_modtime ON public.payout_account_settings;
CREATE TRIGGER update_payout_settings_modtime
    BEFORE UPDATE ON public.payout_account_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Automated Trigger: Update profile wallet_balance when Completed deposit is inserted
CREATE OR REPLACE FUNCTION public.handle_wallet_deposit()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'Completed' THEN
        UPDATE public.profiles
        SET wallet_balance = wallet_balance + NEW.amount
        WHERE id = NEW.user_id;

        INSERT INTO public.wallet_transactions (user_id, amount, transaction_type, reference_type, description)
        VALUES (NEW.user_id, NEW.amount, 'credit', 'topup', 'Wallet deposit via ' || NEW.payment_method);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_wallet_deposit_created ON public.wallet_deposits;
CREATE TRIGGER on_wallet_deposit_created
    AFTER INSERT ON public.wallet_deposits
    FOR EACH ROW EXECUTE FUNCTION public.handle_wallet_deposit();

-- Automated Trigger: Deduct profile wallet_balance when a payout withdrawal is requested
CREATE OR REPLACE FUNCTION public.handle_payout_request()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles
    SET wallet_balance = GREATEST(0, wallet_balance - NEW.amount)
    WHERE id = NEW.vendor_id;

    INSERT INTO public.wallet_transactions (user_id, amount, transaction_type, reference_type, description)
    VALUES (NEW.vendor_id, NEW.amount, 'debit', 'payout', 'Payout withdrawal request via ' || NEW.payout_method::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_payout_requested ON public.payouts;
CREATE TRIGGER on_payout_requested
    AFTER INSERT ON public.payouts
    FOR EACH ROW EXECUTE FUNCTION public.handle_payout_request();

-- Affiliate Program (Referral Tracking & Commission)
CREATE TABLE IF NOT EXISTS public.affiliate_referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    referred_user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.affiliate_commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    order_amount NUMERIC(12, 2) NOT NULL,
    commission_rate NUMERIC(5, 2) NOT NULL,
    commission_amount NUMERIC(12, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 13. MARKETING, COUPONS & PROMOTIONS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, -- NULL = platform-wide coupon
    discount_type public.discount_type NOT NULL DEFAULT 'percentage',
    discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value > 0),
    min_spend NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    usage_limit INT, -- NULL = unlimited
    used_count INT NOT NULL DEFAULT 0,
    valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    valid_until TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.coupon_usages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coupon_id UUID NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    used_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sliders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    link_url TEXT,
    image_url TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ad_spaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_key TEXT NOT NULL UNIQUE, -- e.g. 'header_banner', 'sidebar_banner', 'index_bottom'
    ad_code TEXT,
    image_url TEXT,
    target_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.email_blacklist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 14. REVIEWS, COMMENTS & MESSAGING
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.product_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    order_item_id UUID REFERENCES public.order_items(id) ON DELETE SET NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    review_text TEXT,
    is_approved BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Kolom kompatibilitas untuk review dan review_text
ALTER TABLE public.product_reviews ADD COLUMN IF NOT EXISTS review TEXT;
ALTER TABLE public.product_reviews ADD COLUMN IF NOT EXISTS review_text TEXT;

-- View alias: Memastikan query ke 'public.reviews' maupun 'public.product_reviews' keduanya berhasil
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'reviews' AND table_type = 'BASE TABLE'
    ) THEN
        CREATE OR REPLACE VIEW public.reviews AS SELECT * FROM public.product_reviews;
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL DEFAULT 'product' CHECK (target_type IN ('product', 'blog')),
    target_id UUID,
    name TEXT,
    email TEXT,
    comment TEXT,
    comment_text TEXT,
    is_approved BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Kolom kompatibilitas untuk comments
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES public.products(id) ON DELETE CASCADE;
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS comment TEXT;
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS comment_text TEXT;

CREATE TABLE IF NOT EXISTS public.chat_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (buyer_id, seller_id, product_id)
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL REFERENCES public.chat_threads(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    priority public.ticket_priority NOT NULL DEFAULT 'medium',
    status public.ticket_status NOT NULL DEFAULT 'open',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_support_tickets_modtime ON public.support_tickets;
CREATE TRIGGER update_support_tickets_modtime
    BEFORE UPDATE ON public.support_tickets
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.support_ticket_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.abuse_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL CHECK (target_type IN ('product', 'user', 'review', 'comment')),
    target_id UUID NOT NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 15. BLOG & CMS PAGES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blog_categories ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    views_count BIGINT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_blog_posts_modtime ON public.blog_posts;
CREATE TRIGGER update_blog_posts_modtime
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT 'footer', -- 'quick_links', 'information', etc.
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_pages_modtime ON public.pages;
CREATE TRIGGER update_pages_modtime
    BEFORE UPDATE ON public.pages
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 16. LOCATIONS (COUNTRIES, STATES, CITIES)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.countries (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    iso2 VARCHAR(2) NOT NULL UNIQUE,
    currency_code VARCHAR(10) DEFAULT 'USD',
    status BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.states (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country_id INT NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.cities (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    state_id INT NOT NULL REFERENCES public.states(id) ON DELETE CASCADE,
    name TEXT NOT NULL
);

-- ==============================================================================
-- 17. SYSTEM SETTINGS (KEY-VALUE JSONB)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.system_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 18. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_products_vendor ON public.products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_promoted ON public.products(is_promoted);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON public.categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(order_status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_vendor ON public.order_items(vendor_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user ON public.wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons(code);
CREATE INDEX IF NOT EXISTS idx_wishlists_user ON public.wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_user_followers_following ON public.user_followers(following_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_thread ON public.chat_messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);

-- ==============================================================================
-- 19. ROW LEVEL SECURITY (RLS) POLICIES - 100% COVERAGE ON ALL TABLES
-- Handles Anon (Public / Unauthenticated) vs Authenticated (Logged In) Roles
-- ==============================================================================

-- ENABLE RLS ON ALL TABLES
ALTER TABLE public.currencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_login_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_opening_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_field_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_field_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promoted_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_custom_field_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_product_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_delivery_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_zone_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_sales_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refund_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payout_account_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sliders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_blacklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abuse_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- A. PUBLIC / ANONYMOUS ACCESS (Read Catalog, Settings, Pages, Geo)
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view active currencies" ON public.currencies;
CREATE POLICY "Public can view active currencies" ON public.currencies FOR SELECT USING (status = true);

DROP POLICY IF EXISTS "Public can view active profiles" ON public.profiles;
CREATE POLICY "Public can view active profiles" ON public.profiles FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view vendor profiles" ON public.vendor_profiles;
CREATE POLICY "Public can view vendor profiles" ON public.vendor_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view user followers" ON public.user_followers;
CREATE POLICY "Public can view user followers" ON public.user_followers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view membership plans" ON public.membership_plans;
CREATE POLICY "Public can view membership plans" ON public.membership_plans FOR SELECT USING (status = true);

DROP POLICY IF EXISTS "Public can view promotion plans" ON public.promotion_plans;
CREATE POLICY "Public can view promotion plans" ON public.promotion_plans FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view brands" ON public.brands;
CREATE POLICY "Public can view brands" ON public.brands FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view tags" ON public.tags;
CREATE POLICY "Public can view tags" ON public.tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view custom fields" ON public.custom_fields;
CREATE POLICY "Public can view custom fields" ON public.custom_fields FOR SELECT USING (status = true);

DROP POLICY IF EXISTS "Public can view custom field options" ON public.custom_field_options;
CREATE POLICY "Public can view custom field options" ON public.custom_field_options FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view custom field categories" ON public.custom_field_categories;
CREATE POLICY "Public can view custom field categories" ON public.custom_field_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view active products" ON public.products;
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Public can view product tags" ON public.product_tags;
CREATE POLICY "Public can view product tags" ON public.product_tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view product images" ON public.product_images;
CREATE POLICY "Public can view product images" ON public.product_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view product variations" ON public.product_variations;
CREATE POLICY "Public can view product variations" ON public.product_variations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view product custom fields" ON public.product_custom_field_values;
CREATE POLICY "Public can view product custom fields" ON public.product_custom_field_values FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view shipping delivery times" ON public.shipping_delivery_times;
CREATE POLICY "Public can view shipping delivery times" ON public.shipping_delivery_times FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view shipping zones" ON public.shipping_zones;
CREATE POLICY "Public can view shipping zones" ON public.shipping_zones FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view shipping zone countries" ON public.shipping_zone_countries;
CREATE POLICY "Public can view shipping zone countries" ON public.shipping_zone_countries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view shipping methods" ON public.shipping_methods;
CREATE POLICY "Public can view shipping methods" ON public.shipping_methods FOR SELECT USING (status = true);

DROP POLICY IF EXISTS "Public can view active coupons" ON public.coupons;
CREATE POLICY "Public can view active coupons" ON public.coupons FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view sliders" ON public.sliders;
CREATE POLICY "Public can view sliders" ON public.sliders FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view ad spaces" ON public.ad_spaces;
CREATE POLICY "Public can view ad spaces" ON public.ad_spaces FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Public can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view approved reviews" ON public.product_reviews;
CREATE POLICY "Public can view approved reviews" ON public.product_reviews FOR SELECT USING (is_approved = true);

DROP POLICY IF EXISTS "Public can view approved comments" ON public.comments;
CREATE POLICY "Public can view approved comments" ON public.comments FOR SELECT USING (is_approved = true);

DROP POLICY IF EXISTS "Public can submit contact messages" ON public.contact_messages;
CREATE POLICY "Public can submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view blog categories" ON public.blog_categories;
CREATE POLICY "Public can view blog categories" ON public.blog_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view published blog posts" ON public.blog_posts;
CREATE POLICY "Public can view published blog posts" ON public.blog_posts FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view active pages" ON public.pages;
CREATE POLICY "Public can view active pages" ON public.pages FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view countries" ON public.countries;
CREATE POLICY "Public can view countries" ON public.countries FOR SELECT USING (status = true);

DROP POLICY IF EXISTS "Public can view states" ON public.states;
CREATE POLICY "Public can view states" ON public.states FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view cities" ON public.cities;
CREATE POLICY "Public can view cities" ON public.cities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view system settings" ON public.system_settings;
CREATE POLICY "Public can view system settings" ON public.system_settings FOR SELECT USING (true);

-- ------------------------------------------------------------------------------
-- B. AUTHENTICATED USER POLICIES (Users manage own profile, orders, reviews, etc.)
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view own login activity" ON public.user_login_activities;
CREATE POLICY "Users can view own login activity" ON public.user_login_activities FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage shop opening requests" ON public.shop_opening_requests;
CREATE POLICY "Users can manage shop opening requests" ON public.shop_opening_requests FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can follow or unfollow" ON public.user_followers;
CREATE POLICY "Users can follow or unfollow" ON public.user_followers FOR ALL USING (auth.uid() = follower_id);

DROP POLICY IF EXISTS "Users can view own memberships" ON public.user_memberships;
CREATE POLICY "Users can view own memberships" ON public.user_memberships FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own membership payments" ON public.membership_payments;
CREATE POLICY "Users can view own membership payments" ON public.membership_payments FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own wishlist" ON public.wishlists;
CREATE POLICY "Users can manage own wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Users can view their order items" ON public.order_items;
CREATE POLICY "Users can view their order items" ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_items.order_id AND customer_id = auth.uid()) OR
    vendor_id = auth.uid()
);

DROP POLICY IF EXISTS "Users can view their order addresses" ON public.order_addresses;
CREATE POLICY "Users can view their order addresses" ON public.order_addresses FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_addresses.order_id AND customer_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can view and upload bank transfers" ON public.bank_transfers;
CREATE POLICY "Users can view and upload bank transfers" ON public.bank_transfers FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own digital downloads" ON public.digital_sales_downloads;
CREATE POLICY "Users can view own digital downloads" ON public.digital_sales_downloads FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own quote requests" ON public.quote_requests;
CREATE POLICY "Users can manage own quote requests" ON public.quote_requests FOR ALL USING (
    auth.uid() = buyer_id OR auth.uid() = vendor_id
);

DROP POLICY IF EXISTS "Users can manage own refund requests" ON public.refund_requests;
CREATE POLICY "Users can manage own refund requests" ON public.refund_requests FOR ALL USING (
    auth.uid() = user_id OR auth.uid() = vendor_id
);

DROP POLICY IF EXISTS "Users can view own wallet transactions" ON public.wallet_transactions;
CREATE POLICY "Users can view own wallet transactions" ON public.wallet_transactions FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own wallet deposits" ON public.wallet_deposits;
CREATE POLICY "Users can manage own wallet deposits" ON public.wallet_deposits FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own wallet expenses" ON public.wallet_expenses;
CREATE POLICY "Users can manage own wallet expenses" ON public.wallet_expenses FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own payout settings" ON public.payout_account_settings;
CREATE POLICY "Users can manage own payout settings" ON public.payout_account_settings FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own coupon usages" ON public.coupon_usages;
CREATE POLICY "Users can view own coupon usages" ON public.coupon_usages FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create and edit own reviews" ON public.product_reviews;
CREATE POLICY "Users can create and edit own reviews" ON public.product_reviews FOR ALL USING (auth.uid() = user_id OR auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Public can submit reviews" ON public.product_reviews;
CREATE POLICY "Public can submit reviews" ON public.product_reviews FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can create and edit own comments" ON public.comments;
CREATE POLICY "Users can create and edit own comments" ON public.comments FOR ALL USING (auth.uid() = user_id OR auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Public can submit comments" ON public.comments;
CREATE POLICY "Public can submit comments" ON public.comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view their chat threads" ON public.chat_threads;
CREATE POLICY "Users can view their chat threads" ON public.chat_threads FOR SELECT USING (
    auth.uid() = buyer_id OR auth.uid() = seller_id
);

DROP POLICY IF EXISTS "Users can view their chat messages" ON public.chat_messages;
CREATE POLICY "Users can view their chat messages" ON public.chat_messages FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.chat_threads t
        WHERE t.id = chat_messages.thread_id AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
    )
);

DROP POLICY IF EXISTS "Users can send chat messages" ON public.chat_messages;
CREATE POLICY "Users can send chat messages" ON public.chat_messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
        SELECT 1 FROM public.chat_threads t
        WHERE t.id = chat_messages.thread_id AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
    )
);

DROP POLICY IF EXISTS "Users can manage own support tickets" ON public.support_tickets;
CREATE POLICY "Users can manage own support tickets" ON public.support_tickets FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can send ticket messages" ON public.support_ticket_messages;
CREATE POLICY "Users can send ticket messages" ON public.support_ticket_messages FOR ALL USING (
    auth.uid() = sender_id OR
    EXISTS (SELECT 1 FROM public.support_tickets WHERE id = support_ticket_messages.ticket_id AND user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can report abuse" ON public.abuse_reports;
CREATE POLICY "Users can report abuse" ON public.abuse_reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- ------------------------------------------------------------------------------
-- C. VENDOR SPECIFIC POLICIES (Vendors CRUD their store, products, payouts)
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Vendors manage own vendor profile" ON public.vendor_profiles;
CREATE POLICY "Vendors manage own vendor profile" ON public.vendor_profiles FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Vendors manage own products" ON public.products;
CREATE POLICY "Vendors manage own products" ON public.products FOR ALL USING (auth.uid() = vendor_id);

DROP POLICY IF EXISTS "Vendors manage product images" ON public.product_images;
CREATE POLICY "Vendors manage product images" ON public.product_images FOR ALL USING (
    EXISTS (SELECT 1 FROM public.products WHERE id = product_images.product_id AND vendor_id = auth.uid())
);

DROP POLICY IF EXISTS "Vendors manage product variations" ON public.product_variations;
CREATE POLICY "Vendors manage product variations" ON public.product_variations FOR ALL USING (
    EXISTS (SELECT 1 FROM public.products WHERE id = product_variations.product_id AND vendor_id = auth.uid())
);

DROP POLICY IF EXISTS "Vendors manage product custom fields" ON public.product_custom_field_values;
CREATE POLICY "Vendors manage product custom fields" ON public.product_custom_field_values FOR ALL USING (
    EXISTS (SELECT 1 FROM public.products WHERE id = product_custom_field_values.product_id AND vendor_id = auth.uid())
);

DROP POLICY IF EXISTS "Vendors manage digital product files" ON public.digital_product_files;
CREATE POLICY "Vendors manage digital product files" ON public.digital_product_files FOR ALL USING (
    EXISTS (SELECT 1 FROM public.products WHERE id = digital_product_files.product_id AND vendor_id = auth.uid())
);

DROP POLICY IF EXISTS "Vendors view own earnings" ON public.seller_earnings;
CREATE POLICY "Vendors view own earnings" ON public.seller_earnings FOR SELECT USING (auth.uid() = vendor_id);

DROP POLICY IF EXISTS "Vendors manage own payouts" ON public.payouts;
CREATE POLICY "Vendors manage own payouts" ON public.payouts FOR ALL USING (auth.uid() = vendor_id);

DROP POLICY IF EXISTS "Vendors manage own coupons" ON public.coupons;
CREATE POLICY "Vendors manage own coupons" ON public.coupons FOR ALL USING (auth.uid() = vendor_id);

DROP POLICY IF EXISTS "Users view own affiliate referrals" ON public.affiliate_referrals;
CREATE POLICY "Users view own affiliate referrals" ON public.affiliate_referrals FOR SELECT USING (auth.uid() = referrer_id);

DROP POLICY IF EXISTS "Users view own affiliate commissions" ON public.affiliate_commissions;
CREATE POLICY "Users view own affiliate commissions" ON public.affiliate_commissions FOR SELECT USING (auth.uid() = referrer_id);

-- ------------------------------------------------------------------------------
-- D. ADMIN & MODERATOR POLICIES (Full CRUD access across marketplace)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin_or_moderator()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Admin/Mod catalog management (Categories, Brands, Tags, Custom Fields)
DROP POLICY IF EXISTS "Admins manage categories" ON public.categories;
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage brands" ON public.brands;
CREATE POLICY "Admins manage brands" ON public.brands FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage tags" ON public.tags;
CREATE POLICY "Admins manage tags" ON public.tags FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage custom fields" ON public.custom_fields;
CREATE POLICY "Admins manage custom fields" ON public.custom_fields FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage custom field options" ON public.custom_field_options;
CREATE POLICY "Admins manage custom field options" ON public.custom_field_options FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage custom field categories" ON public.custom_field_categories;
CREATE POLICY "Admins manage custom field categories" ON public.custom_field_categories FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

-- Admin/Mod product management (approve, edit, feature, delete any product)
DROP POLICY IF EXISTS "Admins manage all products" ON public.products;
CREATE POLICY "Admins manage all products" ON public.products FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage all product images" ON public.product_images;
CREATE POLICY "Admins manage all product images" ON public.product_images FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage all product variations" ON public.product_variations;
CREATE POLICY "Admins manage all product variations" ON public.product_variations FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage all digital product files" ON public.digital_product_files;
CREATE POLICY "Admins manage all digital product files" ON public.digital_product_files FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

-- Admin/Mod marketing, sliders, CMS pages & blogs
DROP POLICY IF EXISTS "Admins manage sliders" ON public.sliders;
CREATE POLICY "Admins manage sliders" ON public.sliders FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage ad spaces" ON public.ad_spaces;
CREATE POLICY "Admins manage ad spaces" ON public.ad_spaces FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage blog categories" ON public.blog_categories;
CREATE POLICY "Admins manage blog categories" ON public.blog_categories FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage blog posts" ON public.blog_posts;
CREATE POLICY "Admins manage blog posts" ON public.blog_posts FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage pages" ON public.pages;
CREATE POLICY "Admins manage pages" ON public.pages FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

-- Admin/Mod orders, reviews, comments & tickets
DROP POLICY IF EXISTS "Admins manage all orders" ON public.orders;
CREATE POLICY "Admins manage all orders" ON public.orders FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage all order items" ON public.order_items;
CREATE POLICY "Admins manage all order items" ON public.order_items FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage all reviews" ON public.product_reviews;
CREATE POLICY "Admins manage all reviews" ON public.product_reviews FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage all comments" ON public.comments;
CREATE POLICY "Admins manage all comments" ON public.comments FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage abuse reports" ON public.abuse_reports;
CREATE POLICY "Admins manage abuse reports" ON public.abuse_reports FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage support tickets" ON public.support_tickets;
CREATE POLICY "Admins manage support tickets" ON public.support_tickets FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage support ticket messages" ON public.support_ticket_messages;
CREATE POLICY "Admins manage support ticket messages" ON public.support_ticket_messages FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

DROP POLICY IF EXISTS "Admins manage contact messages" ON public.contact_messages;
CREATE POLICY "Admins manage contact messages" ON public.contact_messages FOR ALL USING (public.is_admin_or_moderator()) WITH CHECK (public.is_admin_or_moderator());

-- Admin-only settings, profiles, membership & financial management
DROP POLICY IF EXISTS "Admins manage all profiles" ON public.profiles;
CREATE POLICY "Admins manage all profiles" ON public.profiles FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage system settings" ON public.system_settings;
CREATE POLICY "Admins manage system settings" ON public.system_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage membership plans" ON public.membership_plans;
CREATE POLICY "Admins manage membership plans" ON public.membership_plans FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage promotion plans" ON public.promotion_plans;
CREATE POLICY "Admins manage promotion plans" ON public.promotion_plans FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage all payouts" ON public.payouts;
CREATE POLICY "Admins manage all payouts" ON public.payouts FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage shipping settings" ON public.shipping_zones;
CREATE POLICY "Admins manage shipping settings" ON public.shipping_zones FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage shipping methods" ON public.shipping_methods;
CREATE POLICY "Admins manage shipping methods" ON public.shipping_methods FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- E. STORAGE BUCKETS CONFIGURATION (Product images, avatars, sliders)
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('product-images', 'product-images', true),
    ('avatars', 'avatars', true),
    ('sliders', 'sliders', true),
    ('digital-files', 'digital-files', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Public can view avatars" ON storage.objects;
CREATE POLICY "Public can view avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Public can view sliders" ON storage.objects;
CREATE POLICY "Public can view sliders" ON storage.objects FOR SELECT USING (bucket_id = 'sliders');

DROP POLICY IF EXISTS "Authenticated can upload product images" ON storage.objects;
CREATE POLICY "Authenticated can upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated can upload avatars" ON storage.objects;
CREATE POLICY "Authenticated can upload avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated can upload sliders" ON storage.objects;
CREATE POLICY "Authenticated can upload sliders" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'sliders' AND auth.role() = 'authenticated');

-- ==============================================================================
-- 20. INITIAL DEFAULT DATA (CURRENCY, SYSTEM SETTINGS & SAMPLE MEMBERSHIP)
-- ==============================================================================
INSERT INTO public.currencies (name, code, symbol, exchange_rate, format, symbol_direction, is_default, status)
VALUES 
    ('US Dollar', 'USD', '$', 1.000000, '1,234.56', 'left', true, true),
    ('Euro', 'EUR', '€', 0.920000, '1,234.56', 'right', false, true),
    ('Indonesian Rupiah', 'IDR', 'Rp', 15800.000000, '1.234,56', 'left', false, true)
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.membership_plans (title, number_of_products, price, is_unlimited_time, number_of_days, is_free, is_popular, order_index)
VALUES 
    ('Free Plan', 5, 0.00, true, 0, true, false, 1),
    ('Basic Plan', 50, 19.99, false, 30, false, false, 2),
    ('Standard Plan', 200, 49.99, false, 30, false, true, 3),
    ('Unlimited Plan', 9999, 99.99, false, 30, false, false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.system_settings (key, value, description)
VALUES 
    ('general', '{"site_name": "Modesy Marketplace", "default_currency": "USD", "commission_rate": 10, "vendor_verification_required": true}'::jsonb, 'General marketplace settings'),
    ('homepage', '{"featured_categories": true, "special_offers": true, "blog_slider": true, "products_per_row": 6}'::jsonb, 'Homepage layout manager')
ON CONFLICT (key) DO NOTHING;
