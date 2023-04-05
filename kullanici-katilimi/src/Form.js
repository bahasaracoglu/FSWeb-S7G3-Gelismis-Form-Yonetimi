import React from "react";
import { useState } from "react";

export default function Form() {
  const initialData = {
    isim: "",
    soyisim: "",
    email: "",
    sifre: "",
    terms: "",
  };
  const [kullanici, setKullanici] = useState(initialData);

  function handleOnChange(event) {
    const { name, value, checked } = event.target;

    if (name === "terms") {
      setKullanici({ ...kullanici, [name]: checked });
    } else {
      setKullanici({ ...kullanici, [name]: value });
    }
  }

  function resetForm() {
    setKullanici(initialData);
  }

  console.log(kullanici);
  return (
    <div>
      <form action="/action_page.php">
        <div>
          <label htmlFor="isim">İsim:</label>
          <input
            onChange={handleOnChange}
            type="text"
            id="isim"
            name="isim"
            value={kullanici.isim}
          />
          <label htmlFor="lname">Soyisim:</label>
          <input
            onChange={handleOnChange}
            type="text"
            id="soyisim"
            name="soyisim"
            value={kullanici.soyisim}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleOnChange}
            type="text"
            id="email"
            name="email"
            value={kullanici.email}
          />
        </div>
        <div>
          <label htmlFor="pwd">Şifre:</label>
          <input
            onChange={handleOnChange}
            type="password"
            id="pwd"
            name="sifre"
            value={kullanici.sifre}
          />
        </div>
        <input
          checked={kullanici.terms}
          onChange={handleOnChange}
          type="checkbox"
          id="terms"
          name="terms"
          value="okundu"
        />
        <span>
          <label htmlFor="terms"> Kullanım Şartları (Terms of Service)</label>
        </span>
        <span>
          <button type="submit">Gönder</button>
        </span>
      </form>
      <button onClick={resetForm}>Formu sıfırla</button>
    </div>
  );
}
