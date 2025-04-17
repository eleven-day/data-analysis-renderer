// src/utils/markdownRenderer.ts
import { marked } from 'marked';

// HTML code block regex
const htmlBlockRegex = /<pre><code class="language-html">([\s\S]*?)<\/code><\/pre>/g;

export function renderMarkdown(text: string): string {
  marked.setOptions({
    breaks: true,
    gfm: true,
    // sanitize: false, // Be cautious with this if input is untrusted
  });

  let html = marked.parse(text) as string;

  // Replace HTML code blocks with placeholders
  html = html.replace(htmlBlockRegex, (match, htmlContent) => {
    try {
      // Decode HTML entities that Marked might have introduced within the code block
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      const decodedHtml = tempDiv.textContent || tempDiv.innerText || "";

      // Encode the decoded HTML for the data attribute
      const encodedHtml = encodeURIComponent(decodedHtml);

      // Debug输出
      // console.log("markdownRenderer - encodedHtml:", encodedHtml);

      // Create a div container, storing the original, decoded HTML content as a data attribute
      return `<div class="html-container" data-html="${encodedHtml}"></div>`;
    } catch (error) {
      console.error('Error processing HTML code block:', error);
      return `<div class="html-container error">Error processing HTML content</div>`;
    }
  });

  return html;
}