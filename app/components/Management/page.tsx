"use client"

import AuthHeader from '../layout/AuthHeader/page';
import Footer from '../layout/Footer/page';

export default function Manager() {
    return (
        <section className="flex-1">
            <AuthHeader />
            <Footer />
        </section>
    );
}