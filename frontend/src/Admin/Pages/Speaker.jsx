// import React, { useState, useEffect } from "react";

// // Modal component
// const SpeakerModal = ({ isOpen, onClose, onSubmit, speaker, isEdit }) => {
//   const [name, setName] = useState(speaker ? speaker.name : "");
//   const [description, setDescription] = useState(
//     speaker ? speaker.description : ""
//   );
//   const [imageFile, setImageFile] = useState(null);
//   const [IMG, setIMG] = useState(speaker ? speaker.image : "");
//   const [submitBTN, setSubmitBTN] = useState("enabled");

//   const handleImageChange = (e) => {
//     setIMG(URL.createObjectURL(e.target.files[0])); // Show Image
//     setImageFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (name === "" || description === "" || (isEdit && !imageFile && !IMG)) {
//       alert("Fill the form first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     if (imageFile) formData.append("imageFile", imageFile);

//     try {
//       setSubmitBTN("disabled");
//       let response;
//       if (isEdit) {
//         response = await fetch(
//           `http://localhost:5000/speakers/${speaker._id}`,
//           {
//             method: "PUT",
//             body: formData,
//             headers: {
//               // Content-Type is automatically set by FormData
//             },
//           }
//         );
//       } else {
//         response = await fetch("http://localhost:5000/speakers", {
//           method: "POST",
//           body: formData,
//           headers: {
//             // Content-Type is automatically set by FormData
//           },
//         });
//       }

//       if (response.ok) {
//         onSubmit(); // Callback after submit
//         onClose(); // Close the modal
//         setSubmitBTN("enabled");
//         setIMG("");
//         setName("");
//         setDescription("");
//       } else {
//         console.log(await response.json());
//       }
//     } catch (error) {
//       console.log("Error: " + error.message);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal show" style={{ display: "block" }}>
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">
//               {isEdit ? "Edit Speaker" : "Add Speaker"}
//             </h5>
//             <button type="button" className="close" onClick={onClose}>
//               <span>&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <form id="speakerForm" onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter speaker name"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                   className="form-control"
//                   id="description"
//                   rows="4"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Enter speaker description"
//                 />
//               </div>
//               <div className="row mb-3 mt-2">
//                 <div className="col-8">
//                   <div className="form-group">
//                     <label htmlFor="imageFile">Image</label>
//                     <input
//                       type="file"
//                       className="form-control"
//                       name="imageFile"
//                       onChange={handleImageChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-4">
//                   {IMG ? (
//                     <img
//                       style={{ maxWidth: "120px" }}
//                       alt="Speaker"
//                       className="img-thumbnail"
//                       src={IMG}
//                     />
//                   ) : (
//                     <div
//                       style={{
//                         backgroundColor: "#98939378",
//                         width: "100px",
//                         height: "100px",
//                         color: "grey",
//                         fontSize: "13px",
//                       }}
//                       className="px-3 py-4 text-center"
//                     >
//                       No Image selected
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn" onClick={onClose}>
//               Close
//             </button>
//             <button
//               disabled={submitBTN === "disabled"}
//               type="submit"
//               className="btn btn-primary"
//               form="speakerForm"
//             >
//               {submitBTN === "disabled"
//                 ? "Submitting ..."
//                 : isEdit
//                 ? "Update Speaker"
//                 : "Add Speaker"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Speaker = () => {
//   const [speakers, setSpeakers] = useState([]); // Always initialized as an empty array
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedSpeaker, setSelectedSpeaker] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state

//   useEffect(() => {
//     fetchSpeakers();
//   }, []);

//   // Fetch speakers from the API
//   const fetchSpeakers = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/speakers");
//       const data = await response.json();

//       if (Array.isArray(data)) {
//         setSpeakers(data);
//       } else {
//         console.log("API response is not an array", data);
//         setSpeakers([]);
//       }
//     } catch (error) {
//       console.log("Error fetching speakers:", error);
//       setSpeakers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openModal = (speaker = null) => {
//     setSelectedSpeaker(speaker);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedSpeaker(null);
//   };

//   const handleSubmit = () => {
//     fetchSpeakers(); // Refresh the speakers list
//   };

//   const deleteSpeaker = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/speakers/${id}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         fetchSpeakers(); // Refresh the list
//         alert("Speaker deleted successfully");
//       } else {
//         console.log(await response.json());
//         alert("Error deleting speaker");
//       }
//     } catch (error) {
//       console.log("Error deleting speaker:", error);
//       alert("Error deleting speaker");
//     }
//   };

//   return (
//     <div>
//       <h2>Speakers</h2>
//       <button className="btn btn-primary" onClick={() => openModal()}>
//         Add Speaker
//       </button>
//       {loading ? (
//         <p>Loading speakers...</p>
//       ) : (
//         <div className="row">
//           {speakers.map((speaker) => (
//             <div className="col-md-4" key={speaker._id}>
//               <div className="card">
//                 <img
//                   src={speaker.image}
//                   className="card-img-top"
//                   alt="Speaker"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{speaker.name}</h5>
//                   <p className="card-text">{speaker.description}</p>
//                   <button
//                     className="btn btn-warning"
//                     onClick={() => openModal(speaker)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => deleteSpeaker(speaker._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <SpeakerModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSubmit={handleSubmit}
//         speaker={selectedSpeaker}
//         isEdit={!!selectedSpeaker}
//       />
//     </div>
//   );
// };

// export default Speaker;
