// --- CẤU HÌNH ---
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQzb8lLoTvEnqFOg1enqrvm95WodDNIyFj2_mWDYL1sy_xuIc3-j0BiDYXPJNqkCVtHELFMJpIQFN4m/pub?output=csv'; 

let database = [];
const searchInput = document.getElementById('searchInput');
const resultsArea = document.getElementById('resultsArea');

function smartCSVParser(text) {
    const results = [];
    let row = [];
    let currentCell = "";
    let inQuote = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuote && nextChar === '"') {
                currentCell += '"';
                i++; 
            } else {
                inQuote = !inQuote;
            }
        } 
        else if (char === ',' && !inQuote) {
            row.push(currentCell.trim()); 
            currentCell = ""; 
        } 
        else if ((char === '\n' || char === '\r') && !inQuote) {
            if (currentCell || row.length > 0) {
                row.push(currentCell.trim());
                if (row.length >= 2) {
                    results.push({
                        keywords: row[0],
                        answer: row[1]
                    });
                }
                row = [];
                currentCell = "";
            }
        } 
        else {
            currentCell += char;
        }
    }
    
    if (row.length > 0) {
        row.push(currentCell.trim());
        if (row.length >= 2) results.push({ keywords: row[0], answer: row[1] });
    }

    return results;
}

fetch(SHEET_URL)
  .then(response => response.text())
  .then(csvText => {
    database = smartCSVParser(csvText);
    console.log("Loaded", database.length, "answers.");
  })
  .catch(err => {
    resultsArea.innerHTML = '<div style="color:red; text-align:center;">Error loading data!</div>';
    console.error(err);
  });

// 2. Tìm kiếm và Hiển thị
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  resultsArea.innerHTML = ''; 

  if (query === '') return;

  const matches = database.filter(item => {
    const keywords = item.keywords ? item.keywords.toString().toLowerCase() : "";
    return keywords.includes(query);
  });

  matches.forEach(item => {
    const div = document.createElement('div');
    div.className = 'result-card';
    
    // Replace ký tự xuống dòng (\n) thành thẻ <br> để hiển thị đẹp trên HTML
    const displayAnswer = item.answer.replace(/\n/g, '<br>');

    div.innerHTML = `
      <div class="result-key">Từ khóa: ${item.keywords}</div>
      <div class="answer-text">${displayAnswer}</div>
      <span class="copy-hint">Đã copy!</span>
    `;

    div.addEventListener('click', () => {
      navigator.clipboard.writeText(item.answer);
      
      // Hiệu ứng
      const hint = div.querySelector('.copy-hint');
      hint.style.display = 'block';
      setTimeout(() => hint.style.display = 'none', 1000);
    });

    resultsArea.appendChild(div);
  });
  
  if(matches.length === 0) {
      resultsArea.innerHTML = '<div style="color:#666; text-align:center;">No results found</div>';
  }
});