// src/utils/htmlRenderer.ts
import * as d3 from 'd3';

// 渲染HTML内容到指定容器
export function renderHtmlContent(container: HTMLElement): void {
  // Ensure global d3 is available
  (window as any).d3 = d3;

  const htmlContainers = container.querySelectorAll('.html-container');

  htmlContainers.forEach(htmlContainer => {
    htmlContainer.innerHTML = '';

    try {
      const dataHtml = htmlContainer.getAttribute('data-html');
      if (!dataHtml) {
        htmlContainer.innerHTML = `<div class="error" style="color:red;">No data-html found.</div>`;
        return;
      }

      const htmlCode = decodeURIComponent(dataHtml);

      // Debug
      // console.log('htmlRenderer - htmlCode:', htmlCode);

      const template = document.createElement('template');
      template.innerHTML = htmlCode.trim();

      const scripts: HTMLScriptElement[] = [];
      const contentNodes: Node[] = [];

      template.content.childNodes.forEach(node => {
        if (node.nodeName.toLowerCase() === 'script') {
          scripts.push(node as HTMLScriptElement);
        } else {
          contentNodes.push(node);
        }
      });

      // Append non-script content
      contentNodes.forEach(node => {
        htmlContainer.appendChild(document.importNode(node, true));
      });

      // Append and execute scripts
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        if (script.textContent) {
          newScript.textContent = script.textContent;
        }
        htmlContainer.appendChild(newScript);
      });

    } catch (error) {
      console.error('Error rendering HTML content:', error);
      const errorMsg = error instanceof Error ? error.message : String(error);
      htmlContainer.innerHTML = `<div class="error" style="color: red; padding: 10px; border: 1px solid red; font-family: sans-serif;">Error rendering HTML block: ${errorMsg}</div>`;
    }
  });
}