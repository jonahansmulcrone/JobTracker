import React, { useState } from 'react';
import { JobDetails } from '../utils/jobScrapper';

const Popup: React.FC = () => {

    const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);

    const handleJobScrape = async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.tabs.sendMessage(
            tab.id!,
            { action: 'SCRAPE_JOB' },
            (response) => {
                if (response.success) {
                    setJobDetails(response.job);
                } else {
                    console.error('Scraping failed:', response.error)
                }
            }
        )
    }

    return (
        <div>
            <button onClick={handleJobScrape}>Add Job</button>
            {jobDetails && (
                <div>
                    <h3>{jobDetails.title}</h3>
                    <p>{jobDetails.company}</p>
                </div>
            )}
        </div>
    )
}

export default Popup;