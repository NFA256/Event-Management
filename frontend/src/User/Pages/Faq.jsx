import React, { useState, useEffect } from "react";

const Faq= () => {
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // Fetch FAQ data from API
    fetch("http://localhost:5000/faq")
      .then((response) => response.json())
      .then((data) => {console.log("Fetched FAQ data:", data); setFaqs(data)})
      .catch((error) => console.error("Error fetching FAQ data:", error));
  }, []);

  const toggleFAQ = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "24px", color: "#333" }}>Frequently Asked Questions</h1>
      <div style={{ margin: "20px 0", width: "100%", maxWidth: "600px" }}>
        <input
          type="text"
          placeholder="Search question here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {filteredFAQs.map((faq) => (
          <div
            key={faq.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
            }}
          >
            <div
              onClick={() => toggleFAQ(faq.id)}
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f1f1f1",
                cursor: "pointer",
                fontWeight: "bold",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span>{faq.question}</span>
              <span>{expanded === faq.id ? "-" : "+"}</span>
            </div>
            {expanded === faq.id && (
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
  );
};

export default Faq;
