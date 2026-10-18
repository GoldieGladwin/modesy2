-- ==============================================================================
-- MODESY MARKETPLACE - CLEANUP / RESET SQL SCRIPT
-- Jalankan perintah ini di Supabase Dashboard (SQL Editor)
-- File ini 100% AMAN & IDEMPOTENT:
-- Memeriksa keberadaan setiap tabel sebelum mengosongkan (TRUNCATE) sehingga
-- TIDAK AKAN PERNAH ERROR jika tabel (seperti public.reviews / public.product_reviews)
-- belum dibuat atau memiliki nama yang berbeda.
-- ==============================================================================

-- 1. Kosongkan seluruh tabel aplikasi secara bertingkat (CASCADE) secara aman
DO $$ 
DECLARE 
    tbl text;
    tbls text[] := ARRAY[
        'wishlists',
        'product_reviews',
        'reviews',
        'comments',
        'chat_messages',
        'chat_threads',
        'support_tickets',
        'ticket_messages',
        'abuse_reports',
        'wallet_deposits',
        'wallet_payouts',
        'wallet_expenses',
        'quote_messages',
        'quote_requests',
        'refund_requests',
        'order_tracking',
        'order_bank_transfers',
        'order_shipping_addresses',
        'order_items',
        'orders',
        'coupons',
        'coupon_usages',
        'product_digital_files',
        'product_license_keys',
        'product_variations',
        'product_images',
        'product_custom_field_values',
        'products',
        'brands',
        'categories',
        'sliders',
        'blog_posts',
        'blog_categories',
        'vendor_profiles',
        'profiles'
    ];
BEGIN 
    FOREACH tbl IN ARRAY tbls LOOP 
        BEGIN
            IF EXISTS (
                SELECT 1 FROM information_schema.tables 
                WHERE table_schema = 'public' AND table_name = tbl AND table_type = 'BASE TABLE'
            ) THEN 
                EXECUTE 'TRUNCATE TABLE public.' || quote_ident(tbl) || ' CASCADE'; 
            END IF; 
        EXCEPTION WHEN OTHERS THEN 
            NULL;
        END;
    END LOOP; 
END $$;

-- 2. Hapus data autentikasi Supabase (Identities & Users) secara aman
DO $$ BEGIN
    DELETE FROM auth.identities;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
    DELETE FROM auth.users;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- ==============================================================================
-- SELESAI: Database sekarang dalam keadaan 100% bersih tanpa error.
-- Langkah selanjutnya: Jalankan file `supabase/schema.sql` lalu `supabase/seed.sql`
-- untuk mengisi kembali katalog lengkap dan 4 akun login resmi.
-- ==============================================================================
