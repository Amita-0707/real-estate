import React from 'react';

const About = () => {
  return (
    <div className="about-us-container">
      <style jsx>{`
        /* --- GLOBAL & BASE STYLES (Light Theme) --- */
        .about-us-container {
          background-color: #F8F9FA; /* Very light background */
          color: #212529; /* Dark text for high readability */
          font-family: 'Poppins', sans-serif;
          padding: 80px 20px 60px 20px;
          line-height: 1.7;
          text-align: center;
          min-height: 100vh;
        }

        /* --- HEADER (Title Section) --- */
        .about-header {
          padding-bottom: 50px;
          margin-bottom: 20px;
          position: relative;
        }
        
        /* Subtle separator line under the title section */
        .about-header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            max-width: 900px;
            height: 1px;
            background: #E9ECEF; /* Light gray separator */
        }

        .about-header h1 {
          font-size: 3.5em;
          font-weight: 700;
          color: #212529; /* Main title is dark for contrast */
          margin-bottom: 20px;
          display: inline-block;
        }

        .about-header h1::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -20px;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background-color: #FFC107; /* Gold accent underline */
          border-radius: 2px;
        }

        /* --- SECTION BOXES (The main content cards) --- */
        .about-mission, .about-expertise, .about-contact {
          max-width: 1000px;
          margin: 0 auto 80px auto;
          text-align: left;
          padding: 60px;
          
          /* Pure white card on light gray background */
          background-color: #FFFFFF; 
          
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* Light, professional shadow */
          border: 1px solid #E9ECEF; /* Subtle border */
        }

        h2 {
          font-size: 2.5em;
          color: #FFC107; /* Gold Accent for headings */
          margin-bottom: 35px;
          font-weight: 600;
          text-align: center;
        }

        p {
          font-size: 1.15em;
          color: #495057; /* Darker gray for softer body text */
          margin-bottom: 25px;
          font-weight: 400;
          line-height: 1.8;
        }
        
        p strong {
            color: #212529; /* Black for emphasis */
            font-weight: 600;
        }


        /* --- EXPERTISE LIST --- */
        ul {
          list-style: none;
          padding: 0;
          margin: 30px 0;
        }

        ul li {
          background-color: #F0F2F5; /* Very light gray for list items */
          margin-bottom: 18px;
          padding: 20px 30px;
          border-left: 6px solid #FFC107; /* Gold accent border */
          border-radius: 10px;
          color: #495057;
          font-size: 1.05em;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          transition: background-color 0.3s;
        }
        
        ul li:hover {
            background-color: #E9ECEF; /* Subtle hover effect */
        }

        ul li strong {
          color: #343A40;
          font-weight: 700;
        }

        hr {
          border: none;
          border-top: 1px solid #E9ECEF;
          margin: 80px auto;
          width: 60%;
        }

        /* --- CONTACT BLOCK --- */
        .contact-info-block {
          background-color: #F0F2F5; /* Light gray for distinction */
          padding: 35px;
          border-radius: 10px;
          margin-top: 30px;
          text-align: center;
        }

        .contact-info-block h3 {
          color: #FFC107;
          font-size: 1.8em;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .contact-info-block p {
          color: #495057;
          font-size: 1.15em;
          margin-bottom: 12px;
        }

        .contact-info-block a {
          color: #007BFF; /* Standard professional link blue */
          text-decoration: none;
          font-size: 1.1em;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .contact-info-block a:hover {
          color: #0056b3;
          text-decoration: underline;
        }

        /* --- FOOTER --- */
        .about-footer {
          padding-top: 50px;
          border-top: 1px solid #E9ECEF;
          color: #6C757D;
          font-size: 0.9em;
        }

        /* --- Responsive Adjustments --- */
        @media (max-width: 992px) {
          .about-mission, .about-expertise, .about-contact {
            padding: 50px 30px;
          }
        }
        @media (max-width: 768px) {
          .about-header h1 {
            font-size: 2.5em;
          }
          h2 {
            font-size: 2em;
          }
          .about-mission, .about-expertise, .about-contact {
            padding: 30px 20px;
          }
        }
      `}</style>
      <header className="about-header">
        <h1>About Shivansh Properties</h1>
      </header>

      <section className="about-mission">
        <h2>Our Foundation: Building Dreams on Blessings</h2>
        <p>
          At **Shivansh Properties**, we believe that every home and investment should start with trust and auspicious beginnings. Drawing inspiration from our ethos, **"build your dreams on the foundation of blessings,"** we are dedicated to providing ethical, transparent, and high-quality real estate services.
        </p>
        <p>
          We are more than just property dealers; we are partners in your journey toward achieving your dreams, whether it's finding the perfect family home or making a sound investment.
        </p>
      </section>

      <hr />

      <section className="about-expertise">
        <h2>Expertise and Commitment</h2>
        <ul>
          <li>
            <strong>Local Insight:</strong> Deeply rooted in the **Khamgaon, Buldhana** region, we offer unparalleled knowledge of the local real estate market, ensuring you get the best value and location.
          </li>
          <li>
            <strong>Client-Centric Approach:</strong> Your aspirations drive our services. We prioritize clear communication, transparency, and tailored solutions to meet your unique property needs.
          </li>
          <li>
            <strong>Diverse Portfolio:</strong> Specializing in residential, commercial, and land transactions, we guide you through every step of the buying, selling, or leasing process with professionalism.
          </li>
        </ul>
      </section>

      <hr />

      <section className="about-contact">
        <h2>Get In Touch</h2>
        <p>
          Ready to lay the foundation of your future? Contact us today to discuss your property goals.
        </p>
        <div className="contact-info-block">
          <h3>Office Location:</h3>
          <p>
            1st Floor, Raghav Sankul, DP - road,<br />
            Khamgaon, Buldhana, MH 444303
          </p>
          <h3>Call Us:</h3>
          <p>
            <a href="tel:+91866838993">+91-866838993</a><br />
            <a href="tel:+919766127389">+91-9766127389</a>
          </p>
        </div>
      </section>

      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} Shivansh Properties. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default About;