// import React from "react";

// const EventPlanner = () => {
//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <h1 style={styles.mainHeading}>Transforming Occasions Into Great Memories</h1>
//         <p className="section-tittle section-tittle2 mb-50">
//           We specialize in turning ordinary occasions into extraordinary moments that stay in your heart forever. We infuse every celebration with magic.
//         </p>
//         <div style={styles.buttonContainer}>
//           <button   className="btn  mx-2">Book Your Event</button>
//         </div>
//       </header>

//       <section style={styles.eventGrid}>
//         <div className="event-card">
//           <div className="image-container">
//             <img src="https://via.placeholder.com/300" alt="Serene Soundscape Soiree" className="event-image" />
//             <div className="date-overlay">March 25, 2024</div>
//           </div>
//           <h3 className="event-title">Serene Soundscape Soiree</h3>
//         </div>
//         <div className="event-card">
//           <div className="image-container">
//             <img src="https://via.placeholder.com/300" alt="FutureTech Expo Hub" className="event-image" />
//             <div className="date-overlay">April 10, 2024</div>
//           </div>
//           <h3 className="event-title">FutureTech Expo Hub</h3>
//         </div>
//         <div className="event-card">
//           <div className="image-container">
//             <img src="https://via.placeholder.com/300" alt="Nature's Palette Showcase" className="event-image" />
//             <div className="date-overlay">May 15, 2024</div>
//           </div>
//           <h3 className="event-title">Nature's Palette Showcase</h3>
//         </div>
//         <div className="event-card">
//           <div className="image-container">
//             <img src="https://via.placeholder.com/300" alt="World Flavors Adventure" className="event-image" />
//             <div className="date-overlay">June 5, 2024</div>
//           </div>
//           <h3 className="event-title">World Flavors Adventure</h3>
//         </div>
//       </section>

//       <style>{`
//         .event-card {
//           border: 1px solid #ddd;
//           border-radius: 10px;
//           padding: 10px;
//           text-align: center;
//           background-color: #f9f9f9;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           cursor: pointer;
//         }

//         .event-card:hover {
//           transform: scale(1.05);
//           box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
//         }

//         .image-container {
//           position: relative;
//         }

//         .event-image {
//           width: 100%;
//           height: auto;
//           border-radius: 10px 10px 0 0;
//         }

//         .date-overlay {
//           position: absolute;
//           bottom: 10px;
//           left: 50%;
//           transform: translateX(-50%);
//           background-color:  rgba(66, 64, 64, 0.7);
//           padding: 5px 10px;
//           border-radius: 5px;
//           font-size: 14px;
//           font-weight: bold;
//           color: #333;
//           box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
//         }

//         .event-title {
//           font-size: 18px;
//           font-weight: bold;
//           margin: 10px 0 0;
//           transition: color 0.3s ease;
//         }

//         .event-card:hover .event-title {
//           color: #007BFF;
//         }

//         .secondary-button {
//           background-color: white;
//           color: #007BFF;
//           border: 2px solid #007BFF;
//           padding: 10px 20px;
//           font-size: 16px;
//           cursor: pointer;
//           border-radius: 5px;
//           transition: color 0.3s ease, background-color 0.3s ease;
//         }

//         .secondary-button:hover {
//           background-color: #007BFF;
//           color: white;
//         }
//       `}</style>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     fontFamily: "Arial, sans-serif",
//     textAlign: "center",
//     padding: "20px",
//     maxWidth: "1200px",
//     margin: "0 auto",
//   },
//   header: {
//     marginBottom: "40px",
//   },

//   eventGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "20px",
//   },
// };

// export default EventPlanner;
