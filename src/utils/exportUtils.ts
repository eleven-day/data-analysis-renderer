import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';

export function exportToTxt(rawText: string): void {
  const blob = new Blob([rawText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data-analysis.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function exportToPdf(previewRef: React.RefObject<HTMLDivElement | null>): Promise<void> {
  if (!previewRef.current) return;
  
  const dataUrl = await htmlToImage.toPng(previewRef.current);
  const img = new Image();
  img.src = dataUrl;
  
  await new Promise((resolve) => {
    img.onload = resolve;
  });
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [img.width, img.height]
  });
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('data-analysis.pdf');
} 