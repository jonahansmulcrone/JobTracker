import axios from 'axios';

export interface JobDetails {
    title: string;
    company: string;
    location?: string;
    description?: string;
    url: string;
    scrapedAt: string;
    salary?: {
        min?: number;
        max?: number;
    };
};

export const scrapeJobDetails = (): JobDetails => {

    const extractText = (selectors: string[]) => {
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element && element.textContent?.trim()) {
                return element.textContent.trim();
            };
        };
        return ''
    };

    const titleSelectors = [
        'h1.jobsearch-JobInfoHeader-title',
        'h1.job-title',
        'h1',
        'title',
        'job-title',
        '#job-title'
    ];

    const companySelectors = [
        '.company-name',
        '.employer-name',
        'a.company',
        '.jobsearch-InlineCompanyRating-companyHeader',
        'span[data-company]',
        'h2'
    ];

    return {
        title: extractText(titleSelectors),
        company: extractText(companySelectors),
        url: window.location.href,
        scrapedAt: new Date().toISOString()
    };
};

export const sendJobToBackend = async (jobDetails: JobDetails) => {
    await axios.post('http://localhost:5000/api/jobs', jobDetails)
        .then(res => {
            console.log('Job details saved successfully:', res.data)
        })
        .catch(error => {
            console.log('Error saving job details:', error)
        });
};

