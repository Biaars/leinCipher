import React, { useState } from "react";
import "./style.css";

function LeinCipher() {
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const leinEncrypt = () => {
    let encryptedText = "";
    let keyIndex = 0;
    const sanitizedPlaintext = plaintext.toUpperCase();
    const sanitizedKey = key.toUpperCase();

    for (const element of sanitizedPlaintext) {
      const char = element;
      let shift;
      if (char.match(/[A-Z]/)) {
        shift = sanitizedKey.charCodeAt(keyIndex) - 65;
      } else if (char.match(/[a-z]/)) {
        shift = sanitizedKey.charCodeAt(keyIndex) - 97;
      } else {
        encryptedText += char;
        continue;
      }
      const encryptedChar = String.fromCharCode(
        ((char.charCodeAt(0) - 65 + shift) % 26) + 65
      );
      encryptedText += encryptedChar;
      keyIndex = (keyIndex + 1) % sanitizedKey.length;
    }
    setEncryptedText(encryptedText);
  };

  const leinDecrypt = () => {
    let decryptedText = "";
    let keyIndex = 0;
    const sanitizedCiphertext = encryptedText.toUpperCase();
    const sanitizedKey = key.toUpperCase();

    for (const element of sanitizedCiphertext) {
      const char = element;
      let shift;
      if (char.match(/[A-Z]/)) {
        shift = sanitizedKey.charCodeAt(keyIndex) - 65;
      } else if (char.match(/[a-z]/)) {
        shift = sanitizedKey.charCodeAt(keyIndex) - 97;
      } else {
        decryptedText += char;
        continue;
      }
      const decryptedChar = String.fromCharCode(
        ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65
      );
      decryptedText += decryptedChar;
      keyIndex = (keyIndex + 1) % sanitizedKey.length;
    }
    setDecryptedText(decryptedText);
  };

  return (
    <div className="container">
      <h2 className="title">Sifreleme Sistemi Uygulaması</h2>
      <div className="input-container">
        <label className="label">
          {" "}
          Metin:
          <input
            className="input"
            type="text"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
          />
        </label>
        <label className="label">
          {" "}
          Anahtar:
          <input
            className="input"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </label>
      </div>
      <div className="button-container">
        <button className="button" onClick={leinEncrypt}>
          Şifrele
        </button>
        <button className="button" onClick={leinDecrypt}>
          Çöz
        </button>
      </div>
      <div className="result-container">
        <label className="result-label">Şifreli Metin: {encryptedText}</label>
        <label className="result-label">Çözülen Metin: {decryptedText}</label>
      </div>
    </div>
  );
}

export default LeinCipher;
