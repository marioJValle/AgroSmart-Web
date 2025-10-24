import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import * as XLSX from 'xlsx';

const BotonExportarSeccion = ({ selectedCharts, chartRefs, chartData, chartNames }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleBulkExportPDF = async () => {
    setIsExporting(true);
    const pdf = new jsPDF('l', 'mm', 'a4');
    const selectedChartKeys = Object.keys(selectedCharts).filter(key => selectedCharts[key]);

    for (let i = 0; i < selectedChartKeys.length; i++) {
      const key = selectedChartKeys[i];
      const chartRef = chartRefs[key].current;

      if (chartRef) {
        const canvas = await html2canvas(chartRef);
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Margen
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) {
          pdf.addPage();
        }

        pdf.text(chartNames[key], 10, 15);
        pdf.addImage(imgData, 'PNG', 10, 20, pdfWidth, pdfHeight);
      }
    }

    pdf.save('Estadisticas_Agricolas.pdf'); // O Estadisticas_MML.pdf, dependiendo del contexto
    setIsExporting(false);
  };

  const handleBulkExportZIP = async (format) => {
    setIsExporting(true);
    const zip = new JSZip();
    const selectedChartKeys = Object.keys(selectedCharts).filter(key => selectedCharts[key]);

    for (const key of selectedChartKeys) {
      const chartRef = chartRefs[key].current;
      if (!chartRef) continue;

      if (format === 'png') {
        const canvas = await html2canvas(chartRef);
        const imgData = canvas.toDataURL('image/png').split(',')[1];
        zip.file(`${chartNames[key]}.png`, imgData, { base64: true });
      } else if (format === 'xlsx') {
        if (chartData[key] && chartData[key].length > 0) {
          const worksheet = XLSX.utils.json_to_sheet(chartData[key]);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, chartNames[key].substring(0, 31));
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          zip.file(`${chartNames[key]}.xlsx`, excelBuffer);
        }
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `Estadisticas_Agricolas_${format.toUpperCase()}.zip`;
    link.click();
    setIsExporting(false);
  };

  const handlePrint = () => {
    const selectedChartKeys = Object.keys(selectedCharts).filter(key => selectedCharts[key]);
    if (selectedChartKeys.length === 0) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor, permite las ventanas emergentes para imprimir.');
      return;
    }

    let printContentHtml = '';
    selectedChartKeys.forEach(key => {
      const chartRef = chartRefs[key].current;
      if (chartRef) {
        printContentHtml += `<div style="page-break-after: always;">${chartRef.innerHTML}</div>`;
      }
    });

    printWindow.document.write(`
      <html>
      <head>
        <title>Impresión de Estadísticas</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .card { border: 1px solid #ccc; border-radius: 5px; padding: 15px; margin-bottom: 20px; }
          .card-title { font-size: 1.2em; font-weight: bold; margin-bottom: 10px; }
          /* Estilos básicos para los gráficos de recharts si es necesario */
          .recharts-wrapper { width: 100% !important; height: auto !important; }
          @media print {
            body { margin: 0; }
            .card { border: none; page-break-inside: avoid; }
            .recharts-wrapper { page-break-inside: avoid; }
            div { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        ${printContentHtml}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    // No cerramos la ventana inmediatamente para que el usuario pueda ver la vista previa
    // printWindow.close(); // Se puede cerrar después de un tiempo si se desea
  };


  const count = Object.values(selectedCharts).filter(Boolean).length;

  return (
    <div className="mb-3 d-flex align-items-center flex-wrap">
      <Button variant="primary" disabled={count === 0 || isExporting} onClick={handleBulkExportPDF} className="me-2 mb-2">
        {isExporting ? 'Exportando...' : `Exportar ${count} a PDF`}
      </Button>
      <Button variant="secondary" disabled={count === 0 || isExporting} onClick={() => handleBulkExportZIP('png')} className="me-2 mb-2">
        {isExporting ? 'Exportando...' : `Exportar ${count} a ZIP (PNG)`}
      </Button>
      <Button variant="secondary" disabled={count === 0 || isExporting} onClick={() => handleBulkExportZIP('xlsx')} className="me-2 mb-2">
        {isExporting ? 'Exportando...' : `Exportar ${count} a ZIP (Excel)`}
      </Button>
      <Button variant="info" disabled={count === 0 || isExporting} onClick={handlePrint} className="mb-2">
        {isExporting ? 'Imprimiendo...' : `Imprimir ${count} seleccionados`}
      </Button>
    </div>
  );
};

export default BotonExportarSeccion;
