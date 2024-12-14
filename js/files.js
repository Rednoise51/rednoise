const url = "pdf/my-resume.pdf"; // Path to PDF

    let pdfDoc = null,
        currentPage = 1;

    const scale = 1.5,
          pdfPagesContainer = document.getElementById("pdfPages");

    // Load the PDF
    pdfjsLib.getDocument(url).promise.then((pdf) => {
      pdfDoc = pdf;
      document.getElementById("totalPages").textContent = pdf.numPages;

      // Render all pages initially
      renderAllPages();
    });

    function renderAllPages() {
      pdfPagesContainer.innerHTML = ''; // Clear previous pages
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        pdfDoc.getPage(i).then((page) => {
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };

          page.render(renderContext).promise.then(() => {
            pdfPagesContainer.appendChild(canvas);
          });
        });
      }
    }

    document.getElementById("prevPage").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        document.getElementById("currentPage").textContent = currentPage;
        renderAllPages();
      }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
      if (currentPage < pdfDoc.numPages) {
        currentPage++;
        document.getElementById("currentPage").textContent = currentPage;
        renderAllPages();
      }
    });