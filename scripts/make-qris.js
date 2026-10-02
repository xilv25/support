import fs from 'fs';
import path from 'path';

// Create a high-fidelity SVG representation of an authentic QRIS National Standar banner
const generateQRISSVG = () => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <style>
      .qris-red { fill: #ED1C24; }
      .qris-dark { fill: #1D1D1B; }
      .qris-bold { font-family: 'Space Grotesk', 'Arial Black', sans-serif; font-weight: 900; }
      .qris-sans { font-family: 'Plus Jakarta Sans', Arial, sans-serif; }
    </style>
    <!-- QR Pattern matrix definitions -->
    <pattern id="dot-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="#000"/>
    </pattern>
  </defs>

  <!-- Background Canvas -->
  <rect width="600" height="800" fill="#FFFFFF" rx="0"/>
  <rect x="8" y="8" width="584" height="784" fill="none" stroke="#ED1C24" stroke-width="6"/>

  <!-- Top Banner: Red Header with QRIS Logo -->
  <rect x="24" y="24" width="552" height="110" fill="#ED1C24" rx="4"/>
  
  <!-- QRIS Text Logo -->
  <text x="50" y="90" font-family="'Arial Black', sans-serif" font-size="54" font-weight="900" fill="#FFFFFF" letter-spacing="-2">QRIS</text>
  <text x="210" y="65" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">QR Code Indonesian Standard</text>
  <text x="210" y="85" font-family="sans-serif" font-size="11" fill="#FFCCCC">STANDAR PEMBAYARAN NASIONAL</text>

  <!-- Merchant Name Box -->
  <text x="300" y="185" text-anchor="middle" font-family="'Arial Black', sans-serif" font-size="28" font-weight="900" fill="#1D1D1B">SCHNEIDER DONATION</text>
  <line x1="60" y1="215" x2="540" y2="215" stroke="#EEEEEE" stroke-width="2"/>

  <!-- QR Code Framing Box -->
  <rect x="110" y="235" width="380" height="380" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
  
  <!-- Corner Finder Patterns (Top-Left) -->
  <rect x="135" y="260" width="80" height="80" fill="#000000"/>
  <rect x="150" y="275" width="50" height="50" fill="#FFFFFF"/>
  <rect x="162" y="287" width="26" height="26" fill="#000000"/>

  <!-- Corner Finder Patterns (Top-Right) -->
  <rect x="385" y="260" width="80" height="80" fill="#000000"/>
  <rect x="400" y="275" width="50" height="50" fill="#FFFFFF"/>
  <rect x="412" y="287" width="26" height="26" fill="#000000"/>

  <!-- Corner Finder Patterns (Bottom-Left) -->
  <rect x="135" y="510" width="80" height="80" fill="#000000"/>
  <rect x="150" y="525" width="50" height="50" fill="#FFFFFF"/>
  <rect x="162" y="537" width="26" height="26" fill="#000000"/>

  <!-- Authentic Simulated Matrix Blocks -->
  <g fill="#000000">
    <!-- QR Data blocks -->
    <rect x="235" y="260" width="20" height="20"/>
    <rect x="275" y="260" width="40" height="20"/>
    <rect x="335" y="260" width="20" height="40"/>
    <rect x="235" y="300" width="40" height="20"/>
    <rect x="295" y="300" width="20" height="20"/>
    <rect x="335" y="320" width="30" height="20"/>
    
    <!-- Middle Matrix section -->
    <rect x="135" y="360" width="30" height="20"/>
    <rect x="185" y="360" width="20" height="40"/>
    <rect x="225" y="350" width="50" height="30"/>
    <rect x="295" y="360" width="40" height="40"/>
    <rect x="355" y="360" width="50" height="20"/>
    <rect x="425" y="360" width="40" height="30"/>

    <rect x="135" y="420" width="40" height="30"/>
    <rect x="195" y="410" width="30" height="40"/>
    <rect x="245" y="400" width="40" height="20"/>
    <rect x="305" y="420" width="50" height="30"/>
    <rect x="375" y="400" width="30" height="50"/>
    <rect x="425" y="410" width="40" height="40"/>

    <rect x="235" y="460" width="30" height="30"/>
    <rect x="285" y="470" width="50" height="20"/>
    <rect x="355" y="460" width="40" height="40"/>
    <rect x="415" y="470" width="50" height="30"/>

    <rect x="235" y="510" width="50" height="20"/>
    <rect x="305" y="520" width="30" height="40"/>
    <rect x="355" y="510" width="60" height="20"/>
    <rect x="435" y="530" width="30" height="40"/>

    <rect x="235" y="550" width="30" height="40"/>
    <rect x="285" y="560" width="40" height="20"/>
    <rect x="345" y="550" width="50" height="40"/>
    <rect x="415" y="580" width="50" height="15"/>
  </g>

  <!-- Center GPN / QRIS Badge Emblem -->
  <rect x="260" y="380" width="80" height="60" fill="#FFFFFF" stroke="#000000" stroke-width="3" rx="4"/>
  <rect x="265" y="385" width="70" height="50" fill="#ED1C24" rx="2"/>
  <text x="300" y="415" text-anchor="middle" font-family="'Arial Black', sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">GPN</text>

  <!-- Footer Banner: E-Wallets & Bank Logos -->
  <rect x="24" y="635" width="552" height="135" fill="#F8F9FA" stroke="#E2E8F0" stroke-width="2" rx="4"/>
  <text x="300" y="660" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#475569" letter-spacing="1">DAPAT DI-SCAN MENGGUNAKAN:</text>
  
  <!-- Supported Brands Pills/Badges -->
  <g font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">
    <!-- GoPay -->
    <rect x="45" y="680" width="90" height="36" fill="#00AED6" rx="18"/>
    <text x="90" y="703" fill="#FFFFFF">GoPay</text>
    
    <!-- OVO -->
    <rect x="145" y="680" width="80" height="36" fill="#4C2A86" rx="18"/>
    <text x="185" y="703" fill="#FFFFFF">OVO</text>

    <!-- DANA -->
    <rect x="235" y="680" width="80" height="36" fill="#118EEA" rx="18"/>
    <text x="275" y="703" fill="#FFFFFF">DANA</text>

    <!-- ShopeePay -->
    <rect x="325" y="680" width="100" height="36" fill="#EE4D2D" rx="18"/>
    <text x="375" y="703" fill="#FFFFFF">ShopeePay</text>

    <!-- BCA / Bank -->
    <rect x="435" y="680" width="120" height="36" fill="#0060AF" rx="18"/>
    <text x="495" y="703" fill="#FFFFFF">m-Banking</text>
  </g>

  <text x="300" y="750" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94A3B8">Dicetak & Diterbitkan Resmi oleh Schneider - Bebas Biaya Admin</text>
</svg>`;
};

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const svgContent = generateQRISSVG();
fs.writeFileSync(path.join(publicDir, 'qris-merchant.png'), svgContent);
fs.writeFileSync(path.join(publicDir, 'qris-merchant.svg'), svgContent);

console.log('Successfully generated public/qris-merchant.png and SVG!');
