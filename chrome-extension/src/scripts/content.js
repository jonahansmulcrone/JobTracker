import { scrapeJobDetails, sendJobToBackend } from '../utils/jobScrapper'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'SCRAPE_JOB') {
    try {
      const jobDetails = scrapeJobDetails();
      console.log(sender)
      
      sendJobToBackend(jobDetails)
        .then(savedJob => {
          sendResponse({ success: true, job: savedJob });
        })
        .catch(error => {
          sendResponse({ 
            success: false, 
            error: error.message 
          });
        });

      return true;
    } catch (error) {
      sendResponse({
        success: false,
        error: 'error'
      });
      return true;
    }
  }
});