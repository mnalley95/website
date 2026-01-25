'use client'

import styles from '../styles/Home.module.css';
import Layout from '../components/PageLayout';
import { useState } from "react";
import { redirect } from 'next/navigation';


export default function Completions() {
    redirect('/')
    const [prompt, setPrompt] = useState<string>('');
    const [completion, setCompletion] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

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
