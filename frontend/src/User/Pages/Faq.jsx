import React, { useState, useEffect } from "react";

const Faq = () => {
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/faq")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched FAQ data:", data);
        setFaqs(data);
      })
      .catch((error) => console.error("Error fetching FAQ data:", error));
  }, []);

  const toggleFAQ = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  // Limit the number of FAQs to the last 6 records
  const lastSixFaqs = faqs.slice(-6);

  const filteredFAQs = lastSixFaqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="home-blog-area"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "35px 15px",
        minHeight: "100vh",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-4 ">
          <div className="section-tittle text-center">
            <h2>FAQ's</h2>
            <p>
              Frequently Asked Questions play a crucial role in enhancing user
              experience by providing quick, easily accessible answers to common
              inquiries.
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Search question here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "9px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box",
            transition: "border 0.3s ease",
          }}
        />
      </div>
      <div className="container col-5 mt-5 mb-5">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          {filteredFAQs.map((faq) => (
            <div
              key={faq._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
              }}
            >
              <div
                onClick={() => toggleFAQ(faq._id)}
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#218fb1ee",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "white",
                  borderBottom: "1px solid #ddd",
                  transition: "background-color 0.3s ease",
                }}
              >
                <span>{faq.question}</span>
                <span>{expanded === faq._id ? "-" : "+"}</span>
              </div>
              {expanded === faq._id && (
                <div
                  style={{
                    padding: "20px",
                    color: "#555",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
