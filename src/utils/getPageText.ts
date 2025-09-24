export const getPageText = () => {
  const selectors = [
    'main',
    'article',
    '[role="main"]',
    '#content',
    '#main',
    '.content',
    '.main-content',
    '.post-body',
    '.entry-content',
    '#root',
    '#app',
    '.App',
    '.app',
    '.container',
    '.container-fluid',
    '.main-container',
    '.page',
    '.page-content',
    '.view',
    '.workspace',
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      return (element as HTMLElement).innerText;
    }
  }

  // Fallback to body if no main content element is found
  return document.body.innerText;
};