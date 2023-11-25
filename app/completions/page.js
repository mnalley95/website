'use client'

import Head from 'next/head';
//import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Layout, { siteTitle } from '../../components/layout';
import { useRef, useState } from "react";


export default function Completions() {
    const [prompt, setPrompt] = useState('');
    const [completion, setCompletion] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCompletion = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/generate',
                { // Update the URL to match your API endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt }),
                });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setCompletion(data.completion);
        } catch (error) {
            console.error('Error fetching completion:', error);
            setCompletion('Failed to fetch completion.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Head>
            </Head>
            <main className={styles.body}>

                <section className={styles.section}>
                    <h2>Completions</h2>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button onClick={fetchCompletion} disabled={loading}>
                        Generate
                    </button>

                    {/* Display the completion or loading message */}
                    {loading ? <p>Loading...</p> : <p>{completion}</p>}
                </section>
            </main>
        </Layout>
    );
}