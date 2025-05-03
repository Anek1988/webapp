
function clearContainer() {
    document.getElementById("qrContainer").innerHTML = "";
  }

  function generateQRCodes() {
  clearContainer();

  const nameText = document.getElementById("nameText").value;
  const nameTextElem = document.createElement("div");
  const nameTextX = parseFloat(document.getElementById("nameTextX").value);
  const nameTextY = parseFloat(document.getElementById("nameTextY").value);

  const desText = document.getElementById("desText").value;
  const desTextElem = document.createElement("div");
  const desTextX = parseFloat(document.getElementById("desTextX").value);
  const desTextY = parseFloat(document.getElementById("desTextY").value);

  const date = document.getElementById("date").value;
  const dateElem = document.createElement("div");
  const dateX = parseFloat(document.getElementById("dateX").value);
  const dateY = parseFloat(document.getElementById("dateY").value);
  
  const textX = parseFloat(document.getElementById("textX").value);
  const textY = parseFloat(document.getElementById("textY").value); 

  const qrX = parseFloat(document.getElementById("qrX").value);
  const qrY = parseFloat(document.getElementById("qrY").value);
  const barcodeX = parseFloat(document.getElementById("barcodeX").value);
  const barcodeY = parseFloat(document.getElementById("barcodeY").value);


  // รับค่าจาก input
  const labelWidth = parseFloat(document.getElementById("labelWidth").value);
  const labelHeight = parseFloat(document.getElementById("labelHeight").value);
  const qrSize = parseInt(document.getElementById("qrSize").value);
  const barcodeWidth = parseFloat(document.getElementById("barcodeWidth").value);
  const barcodeHeight = parseInt(document.getElementById("barcodeHeight").value);
  const textSize = parseInt(document.getElementById("textSize").value);
  const nametextSize = parseInt(document.getElementById("nametextSize").value);
  const destextSize = parseInt(document.getElementById("destextSize").value);
  const datetextSize = parseInt(document.getElementById("datetextSize").value);
  
  const input = document.getElementById("qrInput").value.trim();
  const lines = input.split("\n").filter(line => line.trim() !== "");
  const container = document.getElementById("qrContainer");

  
lines.forEach((text, index) => {
  const box = document.createElement("div");
  box.className = "qr-box";
  box.style.width = labelWidth + "mm";
  box.style.height = labelHeight + "mm";
  box.style.position = "relative"; // ตำแหน่งพื้นฐานของ label


  const rowDiv = document.createElement("div");
  rowDiv.style.display = "flex";
  rowDiv.style.justifyContent = "center";
  rowDiv.style.alignItems = "stretch";
  rowDiv.style.gap = "10px";

  const barcodeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  barcodeSvg.id = `barcode-${index}`;
  barcodeSvg.setAttribute("jsbarcode-format", "CODE128");
  barcodeSvg.setAttribute("jsbarcode-displayvalue", "false");
  barcodeSvg.setAttribute("width", qrSize);
  barcodeSvg.setAttribute("height", barcodeHeight);

  const barcodeRotation = parseInt(document.getElementById("barcodeRotation").value);

  const barcodeWrapper = document.createElement("div");
  barcodeWrapper.style.transform = `rotate(${barcodeRotation}deg)`;
  barcodeWrapper.style.display = "inline-block";

  barcodeWrapper.style.display = "inline-block";
  barcodeWrapper.appendChild(barcodeSvg);

  const qrDiv = document.createElement("div");
  qrDiv.id = `qr-${index}`;
  qrDiv.style.position = "absolute";
  qrDiv.style.left = qrX + "mm";
  qrDiv.style.top = qrY + "mm";
  qrDiv.style.width = qrSize + "mm";
  qrDiv.style.height = qrSize + "mm";
  

  barcodeWrapper.style.position = "absolute";
  barcodeWrapper.style.left = barcodeX + "mm";
  barcodeWrapper.style.top = barcodeY + "mm";


  if (document.getElementById("showBarcode").checked) {
  rowDiv.appendChild(barcodeWrapper);
  }
  if (document.getElementById("showQRCode").checked) {
    rowDiv.appendChild(qrDiv);
  }
  box.appendChild(rowDiv);
  container.appendChild(box);

  // QR code
  new QRCode(qrDiv, {
    text: text,
    width: qrSize,
    height: qrSize
  });


  if (document.getElementById("showText").checked) {
    const qrLabel = document.createElement("div");
    qrLabel.textContent = text;
    qrLabel.style.position = "absolute";
    qrLabel.style.left = textX + "mm";
    qrLabel.style.top = textY + "mm";
    qrLabel.style.fontSize = textSize + "px";
    qrLabel.style.textAlign = "center";
    qrLabel.style.width = qrSize + "mm";
    qrLabel.style.whiteSpace = "nowrap";
    box.appendChild(qrLabel);
  }

  // Barcode
  JsBarcode(barcodeSvg, text, {
    format: "CODE128",
    displayValue: false,
    width: barcodeWidth,
    height: barcodeHeight,
    margin: 0
  });

  if (nameText.trim() !== "") {
    const nameTextElem = document.createElement("div");
    nameTextElem.textContent = nameText;
    nameTextElem.style.fontSize = nametextSize + "px";
    nameTextElem.style.marginTop = "5px";
    qrDiv.appendChild(nameTextElem);
    nameTextElem.style.position = "absolute"; // ให้ใช้ตำแหน่งแบบอิสระ
    nameTextElem.style.left = nameTextX + "mm"; // ตำแหน่งจากซ้าย
    nameTextElem.style.top = nameTextY + "mm";  // ตำแหน่งจากบน
    }
    
  if (desText.trim() !== "") {
      const desTextElem = document.createElement("div");
      desTextElem.textContent = desText;
      desTextElem.style.fontSize = destextSize + "px";
      desTextElem.style.marginTop = "5px";
      qrDiv.appendChild(desTextElem);
      desTextElem.style.position = "absolute"; // ให้ใช้ตำแหน่งแบบอิสระ
      desTextElem.style.left = desTextX + "mm"; // ตำแหน่งจากซ้าย
      desTextElem.style.top = desTextY + "mm";  // ตำแหน่งจากบน
      }

  if (date.trim() !== "") {
      const dateElem = document.createElement("div");
      dateElem.textContent = date;
      dateElem.style.fontSize = datetextSize + "px";
      dateElem.style.marginTop = "5px";
      qrDiv.appendChild(dateElem);
      dateElem.style.position = "absolute"; // ให้ใช้ตำแหน่งแบบอิสระ
      dateElem.style.left = dateX + "mm"; // ตำแหน่งจากซ้าย
      dateElem.style.top = dateY + "mm";  // ตำแหน่งจากบน
      }


 });
}


function downloadAllCodes() {
  const qrBoxes = document.querySelectorAll(".qr-box");
  const zip = new JSZip();
  const promises = [];

qrBoxes.forEach((box, index) => {
  const promise = html2canvas(box, {
    backgroundColor: "#fff", // เพื่อให้พื้นหลังเป็นสีขาว
    scale: 2 // ความละเอียดสูงขึ้น
  }).then(canvas => {
    return new Promise(resolve => {
      canvas.toBlob(blob => {
        zip.file(`label_${index + 1}.png`, blob);
        resolve();
      }, "image/png");
    });
  });

  promises.push(promise);
});

Promise.all(promises).then(() => {
  zip.generateAsync({ type: "blob" }).then(content => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "Labels.zip";
    link.click();
  });
});
}
// Download PDF
async function generatePDFA4() {
const { jsPDF } = window.jspdf;
const qrBoxes = document.querySelectorAll(".qr-box");

const pdf = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: "a4" // หรือใช้ name เช่น [210, 297] สำหรับ a4
});

const labelWidth = 87;
const labelHeight = 70;

let x = 10; // margin ซ้าย
let y = 10; // margin บน
const gapX = 10;
const gapY = 10;

for (let i = 0; i < qrBoxes.length; i++) {
  const canvas = await html2canvas(qrBoxes[i], {
    scale: 2,
    backgroundColor: "#ffffff"
  });

  const imgData = canvas.toDataURL("image/png");

  pdf.addImage(imgData, "PNG", x, y, labelWidth, labelHeight);

  // คำนวณตำแหน่งต่อไป (2 label ต่อแถว * 1 + gapX > 210)
  if (x + labelWidth * 2 + gapX > 210) {
    x = 10;
    y += labelHeight + gapY;
  } else {
    x += labelWidth + gapX;
  }

  // ขึ้นหน้าใหม่ถ้าเกินความสูง A4 > 297
  if (y + labelHeight > 297) {
    pdf.addPage();
    x = 10;
    y = 10;
  }
}

pdf.save("labels.pdf");
}
// Download PDF 87x70
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const qrBoxes = document.querySelectorAll(".qr-box");

  const labelWidth = 87;  // mm
  const labelHeight = 70; // mm

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [labelHeight, labelWidth] // NOTE: ความสูงมาก่อนเมื่อ landscape
  });

  for (let i = 0; i < qrBoxes.length; i++) {
    if (i > 0) pdf.addPage();

    const canvas = await html2canvas(qrBoxes[i], {
      scale: 2,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");

    pdf.addImage(imgData, "PNG", 0, 0, labelWidth, labelHeight);
  }

  pdf.save("labels.pdf");
}
  function importFromExcel() {
  const fileInput = document.getElementById('excelFile');
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select an Excel file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // อ่านแค่ชีทแรก
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const codes = jsonData.flat().filter(cell => typeof cell === 'string' || typeof cell === 'number');
    document.getElementById('qrInput').value = codes.join('\n');
  };

  reader.readAsArrayBuffer(file);
}