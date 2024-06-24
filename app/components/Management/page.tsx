"use client"

import { useState } from 'react';
import Footer from '../layout/Footer/page';
import ComHeader from '../layout/ComHeader/page';
import Link from 'next/link';

export default function Manager() {
    return (
        <section className="flex-1">
            <ComHeader />
            <Footer />
        </section>
    );
}