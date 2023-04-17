import React from "react";
import { useState } from "react";
import axios from "axios";
import { object, string, number, date, InferType } from "yup";
import * as Yup from "yup";
import "./Form.css";

export default function Form() {
  const initialData = {
    isim: "",
    soyisim: "",
    email: "",
    sifre: "",
    terms: "",
  };
  const [kullanici, setKullanici] = useState(initialData);
  const [kullanicilar, setKullanicilar] = useState([]);

  function handleOnChange(event) {
    const { name, value, checked } = event.target;

    if (name === "terms") {
      setKullanici({ ...kullanici, [name]: checked });
    } else {
      setKullanici({ ...kullanici, [name]: value });
    }
  }

  //console.log(event)

  function resetForm() {
    setKullanici(initialData);
  }

  function submitHandler(e) {
    e.preventDefault();

    // Validate form data using Yup schema
    formSchema
      .validate(kullanici)
      .then(function(validatedData) {
        // Validation successful, make API request
        axios
          .post("https://reqres.in/api/users", validatedData)
          .then(function(response) {
            setKullanicilar([...kullanicilar, response.data]);
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(errors) {
        // Validation failed, handle errors
        console.log(errors);
      });
  }

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email address.")
      .required("Must include email address."),
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Passwords must be at least 6 characters long."),
    terms: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
    // required isn't required for checkboxes.
  });

  console.log(kullanici);
  return (
    <div className="box">
      <div className="image-container">
        <img src="https://fastly.picsum.photos/id/366/4000/3000.jpg?hmac=zphhHOH9ofToN2jNHd8z-nc98NrBd8y2okWXEXetLDg"></img>
      </div>
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <div>
            <div>
              <h2>Create an account</h2>
              <p>Let's get started with your 30 day free trail.</p>
            </div>
            <label htmlFor="isim">İsim:</label>
            <input
              onChange={handleOnChange}
              type="text"
              id="isim"
              name="isim"
              value={kullanici.isim}
              placeholder="Name"
            />
            <label htmlFor="lname">Soyisim:</label>
            <input
              onChange={handleOnChange}
              type="text"
              id="soyisim"
              name="soyisim"
              value={kullanici.soyisim}
              placeholder="Surname"
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
              placeholder="Email"
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
              placeholder="Password"
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
            <input type="submit" />
          </span>
        </form>
        <button onClick={resetForm}>Formu sıfırla</button>

        {kullanicilar.map((member, i) => (
          <ul key={i}>
            {" "}
            <li>
              {member.isim} {member.soyisim} {member.email} {member.sifre}{" "}
              {member.terms}
            </li>{" "}
          </ul>
        ))}
      </div>
    </div>
  );
}
