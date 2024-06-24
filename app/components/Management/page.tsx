"use client"

import AuthHeader from '../layout/AuthHeader/page';
import Footer from '../layout/Footer/page';
import SupabaseListener from '../supabase_listener';

export default function Manager() {
    return (
        <section className="flex-1">
            <SupabaseListener />
            <AuthHeader session={null} />
            <Footer />
        </section>
    );
}