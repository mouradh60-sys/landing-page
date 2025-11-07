Netlify deployment package (proxy)
Files:
- index.html                  => frontend, posts to /.netlify/functions/order
- netlify/functions/order.js  => Netlify Function that proxies requests to your Google Apps Script Web App

How to deploy:
1) Create a GitHub repo and push this folder's contents (index.html and netlify/ folder).
2) In Netlify, "Create site" -> "Import from Git" -> connect the GitHub repo.
   Netlify will detect functions in netlify/functions and deploy them.
3) After deployment, open your site URL, fill the form and submit.
   The function will forward requests to the Google Apps Script URL and return the response.

Notes:
- Netlify Drop does NOT support Functions. Use Git-based deploy or Netlify CLI.
- The proxy adds Access-Control-Allow-Origin header for browser compatibility.
